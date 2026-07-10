import { NextRequest, NextResponse } from 'next/server';
import { sendInterventionEmail } from '@/lib/email';
import { z } from 'zod';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';
import { createSubmission } from '@/lib/data-adapter';
// Schéma partagé + testé par contrat (src/lib/api-schemas.test.ts).
import { interventionSchema } from '@/lib/api-schemas';

export async function POST(request: NextRequest) {
  // Higher limit than devis since this is urgent
  const id = getClientIdentifier(request, '/api/intervention');
  const limit = rateLimit({ identifier: id, limit: 5, windowMs: 10 * 60_000 });
  const limited = rateLimitResponse(limit);
  if (limited) return limited;

  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = interventionSchema.parse(body);
    const { attachments = [], ...lead } = validatedData;

    // Garde-fou taille (cf. route devis) : jamais perdre une urgence à cause
    // d'une photo trop lourde — on transmet sans les pièces si besoin.
    const MAX_ATTACH_BYTES = 3_500_000;
    const totalBytes = attachments.reduce((n, a) => n + a.content.length, 0);
    const safeAttachments = totalBytes <= MAX_ATTACH_BYTES ? attachments : [];
    if (attachments.length && safeAttachments.length === 0) {
      console.warn(`[intervention] pièces jointes ignorées (cumul ${totalBytes} o > ${MAX_ATTACH_BYTES})`);
    }

    const persistedPayload = {
      ...lead,
      attachments: attachments.map((a) => ({ filename: a.filename, contentType: a.contentType })),
    };

    const submission = await createSubmission({
      type: 'intervention',
      payload: persistedPayload as unknown as Record<string, unknown>,
      contact_name: `${lead.prenom} ${lead.nom}`.trim(),
      contact_email: lead.email,
      contact_phone: lead.telephone,
    });

    let emailOk = true;
    if (process.env.RESEND_API_KEY) {
      const result = await sendInterventionEmail({ ...lead, attachments: safeAttachments });
      if (!result.success) {
        emailOk = false;
        console.error('Erreur envoi email intervention:', result.error);
      }
    } else {
      emailOk = false;
      console.warn('RESEND_API_KEY non configurée — intervention persistée sans email');
    }

    // Log l'urgence pour suivi
    console.log(`🚨 INTERVENTION URGENTE - ${lead.typeIntervention} à ${lead.ville} - Contact: ${lead.telephone}`);

    // Une URGENCE perdue silencieusement est le pire scénario : si ni la
    // persistance ni l'email n'ont abouti, on l'affiche et on pousse l'appel.
    if (!submission && !emailOk) {
      console.error('[intervention] CRITIQUE : urgence ni persistée ni emailée —', JSON.stringify(persistedPayload));
      return NextResponse.json(
        {
          success: false,
          error:
            "Votre demande n'a pas pu être transmise. Pour une urgence, appelez-nous immédiatement au 06 52 82 06 85.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Demande d\'intervention envoyée avec succès',
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

    console.error('Erreur API intervention:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Empêche le cache de cette route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
