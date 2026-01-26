import { NextRequest, NextResponse } from 'next/server';
import { sendInterventionEmail } from '@/lib/email';
import { z } from 'zod';

// Schema de validation pour intervention urgente
const interventionSchema = z.object({
  civilite: z.enum(['M.', 'Mme', 'Mlle']),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  codePostal: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  ville: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  typeBatiment: z.string(),
  typeIntervention: z.string(),
  description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
  disponibilite: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse et valide les données
    const body = await request.json();
    const validatedData = interventionSchema.parse(body);

    // Vérifie que Resend est configuré
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configurée');
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 500 }
      );
    }

    // Envoie l'email (avec priorité haute pour urgence)
    const result = await sendInterventionEmail(validatedData);

    if (!result.success) {
      console.error('Erreur envoi email intervention:', result.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande" },
        { status: 500 }
      );
    }

    // Log l'urgence pour suivi
    console.log(`🚨 INTERVENTION URGENTE - ${validatedData.typeIntervention} à ${validatedData.ville} - Contact: ${validatedData.telephone}`);

    return NextResponse.json({
      success: true,
      message: 'Demande d\'intervention envoyée avec succès',
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
