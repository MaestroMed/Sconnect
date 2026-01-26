import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Scale, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales | S'Connect",
  description: "Mentions légales de S'Connect - Informations légales et réglementaires de l'entreprise.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
              Mentions Légales
            </h1>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Éditeur du site */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-dark-900 m-0">Éditeur du site</h2>
              </div>
              <div className="bg-dark-50 p-6 rounded-xl">
                <p className="mb-2"><strong>Raison sociale :</strong> S'Connect</p>
                <p className="mb-2"><strong>Forme juridique :</strong> [À COMPLÉTER - SARL, SAS, etc.]</p>
                <p className="mb-2"><strong>Capital social :</strong> [À COMPLÉTER]</p>
                <p className="mb-2"><strong>SIRET :</strong> [À COMPLÉTER]</p>
                <p className="mb-2"><strong>TVA intracommunautaire :</strong> [À COMPLÉTER]</p>
                <p className="mb-2"><strong>RCS :</strong> [À COMPLÉTER]</p>
                <p className="mb-2"><strong>Siège social :</strong> [À COMPLÉTER - Adresse complète]</p>
                <p className="mb-2"><strong>Téléphone :</strong> <a href="tel:+33100000000" className="text-primary-600 hover:text-primary-700">01 XX XX XX XX</a></p>
                <p className="mb-0"><strong>Email :</strong> <a href="mailto:contact@sconnectfrance.fr" className="text-primary-600 hover:text-primary-700">contact@sconnectfrance.fr</a></p>
              </div>
            </div>

            {/* Directeur de publication */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Directeur de la publication</h2>
              <p><strong>Nom :</strong> [À COMPLÉTER]</p>
              <p><strong>Fonction :</strong> [À COMPLÉTER - Gérant, Président, etc.]</p>
            </div>

            {/* Hébergement */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Hébergement du site</h2>
              <div className="bg-dark-50 p-6 rounded-xl">
                <p className="mb-2"><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p className="mb-2"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                <p className="mb-0"><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">vercel.com</a></p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-dark-900 m-0">Propriété intellectuelle</h2>
              </div>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de publication.
              </p>
            </div>

            {/* Données personnelles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Protection des données personnelles</h2>
              <p>
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD),
                vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@sconnectfrance.fr" className="text-primary-600 hover:text-primary-700">contact@sconnectfrance.fr</a>
              </p>
              <p>
                Pour plus d'informations, consultez notre <Link href="/politique-confidentialite" className="text-primary-600 hover:text-primary-700 font-semibold">politique de confidentialité</Link>.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite.
                Pour plus d'informations sur les cookies et leur gestion, consultez notre <Link href="/cookies" className="text-primary-600 hover:text-primary-700 font-semibold">politique cookies</Link>.
              </p>
            </div>

            {/* Responsabilité */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Limitation de responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour,
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p>
                S'Connect ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur,
                lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises,
                soit de l'apparition d'un bug ou d'une incompatibilité.
              </p>
            </div>

            {/* Crédits */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Crédits</h2>
              <p className="mb-2"><strong>Conception et développement :</strong> [À COMPLÉTER]</p>
              <p className="mb-0"><strong>Crédits photos :</strong> [À COMPLÉTER si applicable]</p>
            </div>

            {/* Date MAJ */}
            <div className="text-sm text-dark-500 border-t border-dark-200 pt-6 mt-12">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
