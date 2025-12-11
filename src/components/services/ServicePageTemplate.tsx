"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  CheckCircle2,
  MapPin,
  HelpCircle,
  Zap,
  FileCheck,
  AlertTriangle,
  Wifi,
  Settings,
} from "lucide-react";

// Mapping des icônes par nom
const iconMap = {
  zap: Zap,
  fileCheck: FileCheck,
  alertTriangle: AlertTriangle,
  wifi: Wifi,
  settings: Settings,
  video: Zap,
  creditCard: Zap,
  camera: Zap,
  doorOpen: Zap,
  keyRound: Zap,
  shield: Zap,
  lock: Zap,
};

type IconName = keyof typeof iconMap;

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: IconName;
  prestations: {
    title: string;
    items: string[];
  }[];
  faqs: FAQ[];
  zones?: string[];
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  iconName,
  prestations,
  faqs,
  zones = ["Clichy", "Levallois-Perret", "Neuilly-sur-Seine", "Asnières", "Paris", "La Défense", "Hauts-de-Seine", "Île-de-France"],
}: ServicePageTemplateProps) {
  const Icon = iconMap[iconName];
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-300 font-medium mb-6">
                {subtitle}
              </p>
              <p className="text-lg text-dark-300 leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-100 text-primary-700">
              Nos Prestations
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-dark-900">
              Ce que nous proposons
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="font-display font-bold text-xl text-dark-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-dark-600">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-100 text-primary-700">
              FAQ
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-dark-900">
              Questions fréquentes
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-dark-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-dark-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="py-16 bg-white border-t border-dark-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card p-8 bg-gradient-to-br from-primary-50 to-electric-50 border-primary-100"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-1">
                  Zone d&apos;intervention
                </h3>
                <p className="text-dark-600">
                  Nous intervenons rapidement sur les secteurs suivants :
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone) => (
                <span
                  key={zone}
                  className="px-4 py-2 bg-white rounded-full text-dark-700 font-medium shadow-sm"
                >
                  {zone}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Contactez-nous pour un devis gratuit et personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demande-intervention"
                className="btn bg-accent-500 text-dark-900 hover:bg-accent-400 btn-lg"
              >
                Intervention urgente
              </Link>
              <a
                href="tel:+33100000000"
                className="btn bg-white/10 text-white hover:bg-white/20 btn-lg border border-white/20"
              >
                <Phone className="w-5 h-5" />
                01 XX XX XX XX
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

