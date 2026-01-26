import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique Cookies | S'Connect",
  description: "Politique d'utilisation des cookies sur le site S'Connect - Gestion et paramétrage des cookies.",
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
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
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
              Politique Cookies
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-xl mb-12">
              <p className="m-0">
                Cette politique vous informe sur l'utilisation des cookies sur notre site et comment les gérer.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette)
                lors de la visite d'un site web. Il permet de conserver des informations relatives à votre navigation.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Cookies utilisés sur ce site</h2>
              
              <h3 className="text-xl font-bold text-dark-900 mb-3 mt-6">1. Cookies strictement nécessaires</h3>
              <p>Ces cookies sont indispensables au fonctionnement du site et ne peuvent être désactivés.</p>
              <div className="bg-dark-50 p-4 rounded-lg mb-4">
                <ul className="m-0">
                  <li><strong>Cookie de session</strong> : maintien de votre session de navigation</li>
                  <li><strong>Cookie de consentement</strong> : enregistrement de vos préférences cookies</li>
                  <li><strong>Cookie de sécurité</strong> : protection contre les attaques CSRF</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-dark-900 mb-3 mt-6">2. Cookies analytics (avec consentement)</h3>
              <p>Ces cookies nous permettent de mesurer l'audience du site et d'améliorer son contenu.</p>
              <div className="bg-dark-50 p-4 rounded-lg mb-4">
                <ul className="m-0">
                  <li><strong>Google Analytics</strong> : statistiques de fréquentation anonymisées</li>
                  <li><strong>Durée de conservation</strong> : 13 mois maximum</li>
                  <li><strong>Données collectées</strong> : pages visitées, durée de visite, provenance</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-dark-900 mb-3 mt-6">3. Cookies marketing (avec consentement)</h3>
              <p>Ces cookies sont utilisés pour afficher des publicités pertinentes.</p>
              <div className="bg-dark-50 p-4 rounded-lg mb-4">
                <ul className="m-0">
                  <li><strong>Google Ads</strong> : remarketing et suivi des conversions</li>
                  <li><strong>Facebook Pixel</strong> : optimisation des campagnes publicitaires</li>
                  <li><strong>Durée de conservation</strong> : 90 jours maximum</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Gérer vos cookies</h2>
              
              <h3 className="text-xl font-bold text-dark-900 mb-3 mt-6">Via notre bandeau de consentement</h3>
              <p>
                Lors de votre première visite, un bandeau vous permet de choisir les cookies que vous acceptez.
                Vous pouvez modifier vos choix à tout moment en cliquant sur le lien en bas de page.
              </p>

              <h3 className="text-xl font-bold text-dark-900 mb-3 mt-6">Via votre navigateur</h3>
              <p>Vous pouvez également configurer votre navigateur pour refuser les cookies :</p>
              <ul>
                <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                <li><strong>Edge :</strong> Paramètres → Confidentialité → Cookies</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Conséquences du refus des cookies</h2>
              <p>
                Le refus des cookies analytics n'affecte pas votre navigation.
                Cependant, cela nous empêche d'améliorer l'expérience utilisateur du site.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Liens utiles</h2>
              <ul>
                <li><a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">CNIL - Cookies et traceurs</a></li>
                <li><a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Google Analytics - Protection des données</a></li>
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Module de désactivation Google Analytics</a></li>
              </ul>
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
