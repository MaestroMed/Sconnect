import { NextRequest, NextResponse } from 'next/server';
import { sendDevisEmail } from '@/lib/email';
import { z } from 'zod';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';
import { createSubmission } from '@/lib/data-adapter';
// Schéma partagé + testé par contrat (src/lib/api-schemas.test.ts) : le
// payload exact du formulaire doit toujours passer cette validation.
import { devisSchema } from '@/lib/api-schemas';

export async function POST(request: NextRequest) {
  const id = getClientIdentifier(request, '/api/devis');
  const limit = rateLimit({ identifier: id, limit: 3, windowMs: 10 * 60_000 });
  const limited = rateLimitResponse(limit);
  if (limited) return limited;

  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = devisSchema.parse(body);
    const { attachments = [], ...lead } = validatedData;

    // Garde-fou : le client borne déjà à ~3 Mo, mais si le cumul base64
    // dépasse la marge de sécurité on transmet le lead SANS les pièces —
    // perdre le lead à cause d'une photo trop lourde serait le pire arbitrage.
    const MAX_ATTACH_BYTES = 3_500_000;
    const totalBytes = attachments.reduce((n, a) => n + a.content.length, 0);
    const safeAttachments = totalBytes <= MAX_ATTACH_BYTES ? attachments : [];
    if (attachments.length && safeAttachments.length === 0) {
      console.warn(`[devis] pièces jointes ignorées (cumul ${totalBytes} o > ${MAX_ATTACH_BYTES})`);
    }

    // Persistance : on ne stocke QUE les métadonnées des pièces (jamais le
    // base64, qui gonflerait la base et les logs).
    const persistedPayload = {
      ...lead,
      attachments: attachments.map((a) => ({ filename: a.filename, contentType: a.contentType })),
    };

    const submission = await createSubmission({
      type: 'devis',
      payload: persistedPayload as unknown as Record<string, unknown>,
      contact_name: `${lead.prenom} ${lead.nom}`.trim(),
      contact_email: lead.email,
      contact_phone: lead.telephone,
    });

    let emailOk = true;
    if (process.env.RESEND_API_KEY) {
      const result = await sendDevisEmail({ ...lead, attachments: safeAttachments });
      if (!result.success) {
        emailOk = false;
        console.error('Erreur envoi email devis:', result.error);
      }
    } else {
      emailOk = false;
      console.warn('RESEND_API_KEY non configurée — devis persisté sans email');
    }

    // Un lead doit avoir AU MOINS un canal (persistance OU email). Si les
    // deux ont échoué, répondre "succès" ferait disparaître le devis sans
    // trace pendant que le visiteur croit avoir été pris en charge.
    if (!submission && !emailOk) {
      // Log de secours : le lead complet (sans base64) reste récupérable dans
      // les logs de la plateforme le temps de réparer le canal e-mail.
      console.error('[devis] CRITIQUE : lead ni persisté ni emailé —', JSON.stringify(persistedPayload));
      return NextResponse.json(
        {
          success: false,
          error:
            "Votre demande n'a pas pu être transmise. Réessayez dans un instant ou appelez-nous directement au 06 52 82 06 85.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Demande de devis envoyée avec succès',
      submissionId: submission?.id ?? null,
      emailDelivered: emailOk,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erreur API devis:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Empêche le cache de cette route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
