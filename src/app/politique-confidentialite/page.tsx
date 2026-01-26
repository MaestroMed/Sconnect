import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | S'Connect",
  description: "Politique de confidentialité et protection des données personnelles de S'Connect - Conformité RGPD.",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
              Politique de Confidentialité
            </h1>
          </div>
          <p className="text-xl text-dark-300">
            Protection de vos données personnelles - Conformité RGPD
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-xl mb-12">
              <p className="m-0">
                S'Connect accorde une grande importance à la protection de vos données personnelles.
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
            </div>

            {/* Responsable */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-dark-900 m-0">Responsable du traitement</h2>
              </div>
              <p><strong>S'Connect</strong></p>
              <p>Email : <a href="mailto:contact@sconnectfrance.fr" className="text-primary-600 hover:text-primary-700">contact@sconnectfrance.fr</a></p>
            </div>

            {/* Données collectées */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Données personnelles collectées</h2>
              <p>Nous collectons uniquement les données nécessaires :</p>
              <ul>
                <li><strong>Identité :</strong> civilité, nom, prénom</li>
                <li><strong>Contact :</strong> adresse email, numéro de téléphone, adresse postale</li>
                <li><strong>Projet :</strong> type de bâtiment, services demandés, description du projet</li>
                <li><strong>Navigation :</strong> cookies analytics (avec consentement)</li>
              </ul>
            </div>

            {/* Finalités */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Finalités du traitement</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul>
                <li>Traiter vos demandes de devis et d'intervention</li>
                <li>Vous contacter pour organiser les interventions</li>
                <li>Améliorer nos services</li>
                <li>Établir des statistiques de fréquentation (anonymisées)</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </div>

            {/* Base légale */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Base légale</h2>
              <p>Le traitement de vos données repose sur :</p>
              <ul>
                <li><strong>L'exécution d'un contrat :</strong> traitement de vos demandes de devis/intervention</li>
                <li><strong>Votre consentement :</strong> cookies analytics et marketing</li>
                <li><strong>Notre intérêt légitime :</strong> amélioration de nos services</li>
              </ul>
            </div>

            {/* Destinataires */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Destinataires des données</h2>
              <p>Vos données sont accessibles uniquement à :</p>
              <ul>
                <li>Notre équipe interne (techniciens, commerciaux)</li>
                <li>Nos prestataires techniques (hébergement, emailing) sous strict accord de confidentialité</li>
              </ul>
              <p><strong>Nous ne vendons jamais vos données à des tiers.</strong></p>
            </div>

            {/* Durée de conservation */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Durée de conservation</h2>
              <ul>
                <li><strong>Demandes de devis/contact :</strong> 3 ans à compter de votre dernier contact</li>
                <li><strong>Contrats/factures :</strong> 10 ans (obligation légale)</li>
                <li><strong>Cookies analytics :</strong> 13 mois maximum</li>
              </ul>
            </div>

            {/* Vos droits */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-dark-900 m-0">Vos droits</h2>
              </div>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul>
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données ("droit à l'oubli")</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
              </ul>
              <p>
                <strong>Pour exercer vos droits :</strong> <a href="mailto:contact@sconnectfrance.fr" className="text-primary-600 hover:text-primary-700">contact@sconnectfrance.fr</a>
              </p>
              <p>
                Vous disposez également du droit d'introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">www.cnil.fr</a>
              </p>
            </div>

            {/* Sécurité */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-dark-900 m-0">Sécurité des données</h2>
              </div>
              <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
              <ul>
                <li>Chiffrement des données en transit (HTTPS/SSL)</li>
                <li>Hébergement sécurisé certifié</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Sauvegardes régulières</li>
                <li>Formation de notre personnel à la protection des données</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Cookies et traceurs</h2>
              <p>
                Pour en savoir plus sur les cookies utilisés sur ce site, consultez notre <Link href="/cookies" className="text-primary-600 hover:text-primary-700 font-semibold">politique cookies</Link>.
              </p>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Modifications de la politique</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
              </p>
            </div>

            <div className="text-sm text-dark-500 border-t border-dark-200 pt-6 mt-12">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
