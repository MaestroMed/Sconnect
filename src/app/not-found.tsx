"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-dark-50 to-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Animation */}
            <div className="relative mb-8">
              <span className="font-display font-bold text-[150px] md:text-[200px] text-dark-100 leading-none">
                404
              </span>
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-electric-500 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/30">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl text-dark-900 mb-4">
              Page introuvable
            </h1>
            <p className="text-lg text-dark-600 mb-8 max-w-md mx-auto">
              Oups ! La page que vous recherchez semble avoir été débranchée. 
              Vérifiez l&apos;URL ou retournez à l&apos;accueil.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                <Home className="w-5 h-5" />
                Retour à l&apos;accueil
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline"
              >
                <ArrowLeft className="w-5 h-5" />
                Page précédente
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg shadow-dark-900/5 border border-dark-100">
              <h2 className="font-display font-bold text-lg text-dark-900 mb-4">
                Vous cherchez peut-être :
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Nos services", href: "/services" },
                  { label: "Demander un devis", href: "/demande-devis" },
                  { label: "Nous contacter", href: "/contact" },
                  { label: "Nos réalisations", href: "/realisations" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 bg-dark-50 hover:bg-primary-50 text-dark-700 hover:text-primary-600 rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

