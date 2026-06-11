import { NextRequest, NextResponse } from 'next/server';
import { sendDevisEmail } from '@/lib/email';
import { z } from 'zod';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';
import { createSubmission } from '@/lib/data-adapter';

// Schema de validation (réutilise le schema existant)
const devisSchema = z.object({
  civilite: z.enum(['M.', 'Mme', 'Mlle']),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  codePostal: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  ville: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  typeBatiment: z.string(),
  services: z.array(z.string()).min(1, 'Sélectionnez au moins un service'),
  delai: z.string(),
  description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
  budget: z.string().optional(),
});

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
