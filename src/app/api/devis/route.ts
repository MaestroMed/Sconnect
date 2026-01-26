import { NextRequest, NextResponse } from 'next/server';
import { sendDevisEmail } from '@/lib/email';
import { z } from 'zod';

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
  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = devisSchema.parse(body);

    // Vérifie que Resend est configuré
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configurée');
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 500 }
      );
    }

    // Envoie l'email
    const result = await sendDevisEmail(validatedData);

    if (!result.success) {
      console.error('Erreur envoi email devis:', result.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Demande de devis envoyée avec succès',
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
