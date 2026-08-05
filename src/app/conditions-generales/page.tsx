import type { Metadata } from "next";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales",
  description:
    "Conditions générales de vente et de service de S Connect France : objet, prix, délais, garanties, litiges.",
  path: "/conditions-generales",
});

export default function ConditionsGeneralesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Conditions générales" }]} light />
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
                Conditions générales
              </h1>
              <p className="text-dark-300 text-sm mt-1">
                Dernière mise à jour : à compléter par le client
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl">
          <div className="prose-article space-y-8 text-foreground leading-relaxed">
            <div className="rounded-2xl border border-accent-200 bg-accent-50 p-5 text-sm text-accent-900 dark:border-accent-500/40 dark:bg-accent-500/10 dark:text-accent-200">
              <strong>À compléter :</strong> cette page est un modèle générique
              à faire valider par votre conseil juridique. Adaptez les sections
              ci-dessous à votre activité (prestations réalisées, tarifs,
              délais, garanties, clauses de rétractation pour consommateurs).
            </div>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                1. Objet
              </h2>
              <p>
                Les présentes conditions générales régissent les relations
                contractuelles entre la société S Connect France, ci-après
                dénommée « le Prestataire », et toute personne physique ou
                morale, ci-après dénommée « le Client », qui fait appel à ses
                services d&apos;électricité, de contrôle d&apos;accès, de
                serrurerie ou de métallerie.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                2. Devis et commande
              </h2>
              <p>
                Toute intervention fait l&apos;objet d&apos;un devis gratuit
                préalable. Le devis précise la nature des prestations, le
                matériel fourni, les tarifs applicables, les délais estimés et
                les conditions d&apos;exécution. Le devis est valable 30 jours
                à compter de son émission. La signature du devis ou un
                acompte vaut acceptation des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                3. Prix et modalités de paiement
              </h2>
              <p>
                Les prix sont exprimés en euros, hors taxes et toutes taxes
                comprises. Un acompte peut être demandé à la signature du
                devis. Le solde est exigible à la réception des travaux.
                Les moyens de paiement acceptés sont : virement bancaire,
                chèque, espèces (dans la limite légale) et carte bancaire.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                4. Délais d&apos;intervention
              </h2>
              <p>
                Les délais indiqués dans le devis sont donnés à titre
                indicatif. Pour les interventions d&apos;urgence, le
                Prestataire s&apos;engage à intervenir dans les meilleurs
                délais, sous réserve de la disponibilité de ses équipes et
                des conditions d&apos;accès au site.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                5. Garanties
              </h2>
              <p>
                Les prestations sont couvertes par la garantie décennale
                (travaux de bâtiment), la garantie biennale de bon
                fonctionnement et la garantie contractuelle sur les
                équipements installés. Les conditions détaillées sont
                précisées dans l&apos;attestation d&apos;assurance fournie sur
                demande.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                6. Droit de rétractation (consommateurs)
              </h2>
              <p>
                Conformément à l&apos;article L221-18 du Code de la
                consommation, le Client consommateur dispose d&apos;un délai
                de 14 jours pour exercer son droit de rétractation. Ce droit
                ne s&apos;applique pas aux interventions d&apos;urgence
                expressément demandées par le Client à son domicile.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                7. Responsabilité
              </h2>
              <p>
                La responsabilité du Prestataire ne saurait être engagée en
                cas de dommages résultant d&apos;une mauvaise utilisation du
                Client, d&apos;un défaut d&apos;entretien, d&apos;un vice
                caché préexistant ou d&apos;un cas de force majeure.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                8. Médiation et litiges
              </h2>
              <p>
                En cas de litige, le Client peut recourir gratuitement au
                service de médiation de la consommation. À défaut
                d&apos;accord amiable, les tribunaux français sont seuls
                compétents. Le droit applicable est le droit français.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                9. Contact
              </h2>
              <p>
                Pour toute question relative aux présentes conditions
                générales, vous pouvez nous contacter via notre{" "}
                <Link
                  href="/contact"
                  className="text-primary-600 dark:text-primary-300 font-semibold hover:underline"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
