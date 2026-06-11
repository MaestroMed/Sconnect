import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { z } from 'zod';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';
import { createSubmission } from '@/lib/data-adapter';

// Schema de validation
const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  objet: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
});

export async function POST(request: NextRequest) {
  // Rate limit: 5 requests / 10 min per IP
  const id = getClientIdentifier(request, '/api/contact');
  const limit = rateLimit({ identifier: id, limit: 5, windowMs: 10 * 60_000 });
  const limited = rateLimitResponse(limit);
  if (limited) return limited;

  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Persiste la soumission (Supabase si configuré, no-op sinon)
    const submission = await createSubmission({
      type: 'contact',
      payload: validatedData as unknown as Record<string, unknown>,
      contact_name: validatedData.nom,
      contact_email: validatedData.email,
      contact_phone: null,
    });

    // Envoi email Resend (best-effort — l'échec n'invalide pas la soumission stockée)
    let emailOk = true;
    if (process.env.RESEND_API_KEY) {
      const result = await sendContactEmail(validatedData);
      if (!result.success) {
        emailOk = false;
        console.error('Erreur envoi email contact:', result.error);
      }
    } else {
      emailOk = false;
      console.warn('RESEND_API_KEY non configurée — soumission persistée sans email');
    }

    // Au moins un canal (persistance OU email) doit avoir abouti — sinon le
    // message est perdu et le visiteur ne le saura jamais.
    if (!submission && !emailOk) {
      console.error('[contact] CRITIQUE : message ni persisté ni emailé — échec retourné au client');
      return NextResponse.json(
        {
          success: false,
          error:
            "Votre message n'a pas pu être transmis. Réessayez dans un instant ou appelez-nous au 06 52 82 06 85.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès',
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

    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Empêche le cache de cette route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
