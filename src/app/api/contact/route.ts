import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { z } from 'zod';

// Schema de validation
const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  objet: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Vérifie que Resend est configuré
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configurée');
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 500 }
      );
    }

    // Envoie l'email
    const result = await sendContactEmail(validatedData);

    if (!result.success) {
      console.error('Erreur envoi email:', result.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès',
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
