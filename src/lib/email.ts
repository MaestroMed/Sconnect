import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactEmail from "@/emails/ContactEmail";
import DevisRequestEmail from "@/emails/DevisRequestEmail";
import DevisConfirmationEmail from "@/emails/DevisConfirmationEmail";
import InterventionEmail from "@/emails/InterventionEmail";
import InterventionConfirmationEmail from "@/emails/InterventionConfirmationEmail";

// Convention canonique : RESEND_FROM_EMAIL / RESEND_TO_EMAIL (alignée sur
// les templates .env.example et le flux forgot-password). Les anciens noms
// EMAIL_FROM / ADMIN_EMAIL restent acceptés en repli pour ne pas casser un
// env existant. NB : le domaine de RESEND_FROM_EMAIL doit être vérifié dans
// Resend, sinon TOUS les envois échouent.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || "contact@sconnectfrance.fr";
const ADMIN_EMAIL =
  process.env.RESEND_TO_EMAIL || process.env.ADMIN_EMAIL || "contact@sconnectfrance.fr";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not configured. Add it to your environment variables.",
    );
  }
  _resend = new Resend(key);
  return _resend;
}

/** Pièce jointe transmise à Resend (contenu en base64, sans préfixe data:). */
export interface EmailAttachment {
  filename: string;
  content: string; // base64
  contentType?: string;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const data = await getResend().emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      ...(options.attachments && options.attachments.length > 0
        ? {
            attachments: options.attachments.map((a) => ({
              filename: a.filename,
              content: a.content,
              ...(a.contentType ? { contentType: a.contentType } : {}),
            })),
          }
        : {}),
    });
    return { success: true, data };
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { success: false, error };
  }
}

export async function sendContactEmail(data: {
  nom: string;
  email: string;
  objet: string;
  message: string;
}) {
  const html = await render(ContactEmail(data));
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Site Web] ${data.objet}`,
    html,
    replyTo: data.email,
  });
}

export async function sendDevisEmail(data: {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  typeBatiment: string;
  services: string[];
  delai: string;
  description: string;
  budget?: string;
  attachments?: EmailAttachment[];
}) {
  const phoneEmergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY;

  const adminHtml = await render(DevisRequestEmail(data));
  // Les pièces jointes (photos, plans) ne partent qu'à l'artisan, pas dans
  // l'e-mail de confirmation client.
  const adminResult = await sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Devis] Nouvelle demande - ${data.services.join(", ")}`,
    html: adminHtml,
    replyTo: data.email,
    attachments: data.attachments,
  });

  const confirmHtml = await render(
    DevisConfirmationEmail({
      prenom: data.prenom,
      services: data.services,
      phoneEmergency,
    }),
  );
  await sendEmail({
    to: data.email,
    subject: "Confirmation de votre demande de devis - S Connect France",
    html: confirmHtml,
  });

  return adminResult;
}

export async function sendInterventionEmail(data: {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  typeBatiment: string;
  typeIntervention: string;
  description: string;
  disponibilite: string;
  attachments?: EmailAttachment[];
}) {
  const phoneEmergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY;

  const adminHtml = await render(InterventionEmail(data));
  const adminResult = await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🚨 URGENT - Intervention ${data.typeIntervention} à ${data.ville}`,
    html: adminHtml,
    replyTo: data.email,
    attachments: data.attachments,
  });

  const confirmHtml = await render(
    InterventionConfirmationEmail({
      prenom: data.prenom,
      phoneEmergency,
    }),
  );
  await sendEmail({
    to: data.email,
    subject: "Votre demande d'intervention urgente - S Connect France",
    html: confirmHtml,
  });

  return adminResult;
}
