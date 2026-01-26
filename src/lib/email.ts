/**
 * Service d'envoi d'email avec Resend
 * Production-ready email service
 */

import { Resend } from 'resend';

// Initialize Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

// Email de l'entreprise (à configurer)
const FROM_EMAIL = process.env.EMAIL_FROM || 'contact@sconnectfrance.fr';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@sconnectfrance.fr';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Envoie un email via Resend
 */
export async function sendEmail(options: SendEmailOptions) {
  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}

/**
 * Envoie un email de contact
 */
export async function sendContactEmail(data: {
  nom: string;
  email: string;
  objet: string;
  message: string;
}) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
          .value { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau message de contact</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nom :</div>
              <div class="value">${data.nom}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Objet :</div>
              <div class="value">${data.objet}</div>
            </div>
            <div class="field">
              <div class="label">Message :</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>Message reçu via le formulaire de contact de sconnectfrance.fr</p>
            <p>Répondre à : <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Site Web] ${data.objet}`,
    html: htmlContent,
    replyTo: data.email,
  });
}

/**
 * Envoie un email de demande de devis
 */
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
}) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #1e3a8a; margin-bottom: 15px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #475569; display: inline-block; width: 150px; }
          .value { display: inline-block; }
          .services { background: white; padding: 15px; border-radius: 6px; margin-top: 10px; }
          .service-item { padding: 8px; margin: 5px 0; background: #e0f2fe; border-radius: 4px; display: inline-block; margin-right: 10px; }
          .priority { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Nouvelle demande de devis</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">👤 Informations client</div>
              <div class="field">
                <span class="label">Nom complet :</span>
                <span class="value">${data.civilite} ${data.prenom} ${data.nom}</span>
              </div>
              <div class="field">
                <span class="label">Email :</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
              </div>
              <div class="field">
                <span class="label">Téléphone :</span>
                <span class="value"><a href="tel:${data.telephone}">${data.telephone}</a></span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">📍 Adresse de l'intervention</div>
              <div class="field">
                <span class="value">${data.adresse}<br>${data.codePostal} ${data.ville}</span>
              </div>
              <div class="field">
                <span class="label">Type de bâtiment :</span>
                <span class="value">${data.typeBatiment}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">🔧 Détails de la demande</div>
              <div class="field">
                <span class="label">Services demandés :</span>
              </div>
              <div class="services">
                ${data.services.map(s => `<span class="service-item">✓ ${s}</span>`).join('')}
              </div>
              <div class="field" style="margin-top: 15px;">
                <span class="label">Délai souhaité :</span>
                <span class="value">${data.delai}</span>
              </div>
              ${data.budget ? `
              <div class="field">
                <span class="label">Budget estimé :</span>
                <span class="value">${data.budget}</span>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <div class="section-title">📝 Description du projet</div>
              <div class="value">${data.description.replace(/\n/g, '<br>')}</div>
            </div>

            ${data.delai === 'Urgent (moins de 48h)' ? `
            <div class="priority">
              <strong>⚠️ DEMANDE URGENTE</strong><br>
              Le client souhaite une intervention dans les 48 heures.
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Demande reçue via le formulaire de devis de sconnectfrance.fr</p>
            <p>Contacter le client : <a href="mailto:${data.email}">${data.email}</a> ou <a href="tel:${data.telephone}">${data.telephone}</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Email à l'admin
  const adminResult = await sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Devis] Nouvelle demande - ${data.services.join(', ')}`,
    html: htmlContent,
    replyTo: data.email,
  });

  // Email de confirmation au client
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .message { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .cta { text-align: center; margin: 30px 0; }
          .button { display: inline-block; padding: 15px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Votre demande a bien été reçue</h1>
          </div>
          <div class="content">
            <div class="message">
              <p>Bonjour ${data.prenom},</p>
              <p>Nous avons bien reçu votre demande de devis pour :</p>
              <ul>
                ${data.services.map(s => `<li><strong>${s}</strong></li>`).join('')}
              </ul>
              <p>Notre équipe va étudier votre projet et vous contactera dans les plus brefs délais pour établir un devis personnalisé.</p>
            </div>
            <div class="cta">
              <p><strong>Besoin d'une intervention urgente ?</strong></p>
              <a href="tel:${process.env.NEXT_PUBLIC_PHONE_EMERGENCY || '06XXXXXXXX'}" class="button">📞 Appeler maintenant</a>
            </div>
          </div>
          <div class="footer">
            <p>S'Connect - Électricité, Contrôle d'Accès & Serrurerie</p>
            <p>En Île-de-France | Intervention 24h/24</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: data.email,
    subject: "Confirmation de votre demande de devis - S'Connect",
    html: confirmationHtml,
  });

  return adminResult;
}

/**
 * Envoie un email de demande d'intervention urgente
 */
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
}) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .urgent-banner { background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 6px; margin-bottom: 20px; text-align: center; }
          .urgent-banner h2 { color: #dc2626; margin: 0; font-size: 24px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #1e3a8a; margin-bottom: 15px; border-bottom: 2px solid #dc2626; padding-bottom: 5px; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #475569; display: inline-block; width: 150px; }
          .value { display: inline-block; }
          .contact-box { background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; border-radius: 6px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 INTERVENTION URGENTE DEMANDÉE</h1>
          </div>
          <div class="content">
            <div class="urgent-banner">
              <h2>⚠️ URGENT - INTERVENTION REQUISE</h2>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Une intervention urgente a été demandée</p>
            </div>

            <div class="section">
              <div class="section-title">👤 Informations client</div>
              <div class="field">
                <span class="label">Nom complet :</span>
                <span class="value">${data.civilite} ${data.prenom} ${data.nom}</span>
              </div>
              <div class="field">
                <span class="label">Email :</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
              </div>
              <div class="field">
                <span class="label">Téléphone :</span>
                <span class="value"><a href="tel:${data.telephone}" style="font-size: 18px; font-weight: bold; color: #dc2626;">${data.telephone}</a></span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">📍 Lieu de l'intervention</div>
              <div class="field">
                <span class="value">${data.adresse}<br>${data.codePostal} ${data.ville}</span>
              </div>
              <div class="field">
                <span class="label">Type de bâtiment :</span>
                <span class="value">${data.typeBatiment}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">🔧 Détails de l'urgence</div>
              <div class="field">
                <span class="label">Type d'intervention :</span>
                <span class="value"><strong style="color: #dc2626;">${data.typeIntervention}</strong></span>
              </div>
              <div class="field">
                <span class="label">Disponibilité client :</span>
                <span class="value">${data.disponibilite}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">📝 Description du problème</div>
              <div class="value">${data.description.replace(/\n/g, '<br>')}</div>
            </div>

            <div class="contact-box">
              <strong>📞 CONTACTER IMMÉDIATEMENT LE CLIENT :</strong><br>
              Téléphone : <a href="tel:${data.telephone}" style="font-size: 18px; font-weight: bold;">${data.telephone}</a><br>
              Email : <a href="mailto:${data.email}">${data.email}</a>
            </div>
          </div>
          <div class="footer">
            <p><strong>Demande d'intervention urgente reçue via sconnectfrance.fr</strong></p>
            <p>Action requise : Contacter le client dans les plus brefs délais</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Email à l'admin (URGENT)
  const adminResult = await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🚨 URGENT - Intervention ${data.typeIntervention} à ${data.ville}`,
    html: htmlContent,
    replyTo: data.email,
  });

  // Email de confirmation au client
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .message { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .urgency { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0; }
          .contact { background: #dcfce7; padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0; }
          .phone { font-size: 24px; font-weight: bold; color: #16a34a; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 Demande d'intervention reçue</h1>
          </div>
          <div class="content">
            <div class="message">
              <p>Bonjour ${data.prenom},</p>
              <p>Nous avons bien reçu votre demande d'<strong>intervention urgente</strong>.</p>
              <p>Notre équipe va vous contacter dans les plus brefs délais pour organiser l'intervention.</p>
            </div>

            <div class="urgency">
              <strong>⚡ Situation vraiment urgente ?</strong><br>
              N'hésitez pas à nous appeler directement pour une intervention immédiate.
            </div>

            <div class="contact">
              <p><strong>Numéro d'urgence 24h/24 :</strong></p>
              <p class="phone">📞 ${process.env.NEXT_PUBLIC_PHONE_EMERGENCY || '06 XX XX XX XX'}</p>
            </div>
          </div>
          <div class="footer">
            <p>S'Connect - Intervention d'urgence 24h/24</p>
            <p>En Île-de-France</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: data.email,
    subject: "Votre demande d'intervention urgente - S'Connect",
    html: confirmationHtml,
  });

  return adminResult;
}
