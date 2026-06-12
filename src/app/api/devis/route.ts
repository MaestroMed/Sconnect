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

    const submission = await createSubmission({
      type: 'devis',
      payload: validatedData as unknown as Record<string, unknown>,
      contact_name: `${validatedData.prenom} ${validatedData.nom}`.trim(),
      contact_email: validatedData.email,
      contact_phone: validatedData.telephone,
    });

    let emailOk = true;
    if (process.env.RESEND_API_KEY) {
      const result = await sendDevisEmail(validatedData);
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
      console.error('[devis] CRITIQUE : lead ni persisté ni emailé — échec retourné au client');
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
