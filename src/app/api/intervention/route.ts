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

    const submission = await createSubmission({
      type: 'intervention',
      payload: validatedData as unknown as Record<string, unknown>,
      contact_name: `${validatedData.prenom} ${validatedData.nom}`.trim(),
      contact_email: validatedData.email,
      contact_phone: validatedData.telephone,
    });

    let emailOk = true;
    if (process.env.RESEND_API_KEY) {
      const result = await sendInterventionEmail(validatedData);
      if (!result.success) {
        emailOk = false;
        console.error('Erreur envoi email intervention:', result.error);
      }
    } else {
      emailOk = false;
      console.warn('RESEND_API_KEY non configurée — intervention persistée sans email');
    }

    // Log l'urgence pour suivi
    console.log(`🚨 INTERVENTION URGENTE - ${validatedData.typeIntervention} à ${validatedData.ville} - Contact: ${validatedData.telephone}`);

    // Une URGENCE perdue silencieusement est le pire scénario : si ni la
    // persistance ni l'email n'ont abouti, on l'affiche et on pousse l'appel.
    if (!submission && !emailOk) {
      console.error('[intervention] CRITIQUE : urgence ni persistée ni emailée — échec retourné au client');
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
