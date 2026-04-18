"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RealizationCard from "@/components/ui/RealizationCard";

interface Item {
  id: string;
  title: string;
  type: string;
  location: string;
  category: string;
  serviceType?: string;
  image: string;
  imageBefore?: string;
  imageAfter?: string;
}

interface RealizationsFilterableProps {
  items: Item[];
  /** Map raw category slugs (electricite/serrurerie/...) to display labels */
  categoryLabels: Record<string, string>;
}

/**
 * Filterable + animated realizations grid.
 * Filter is driven by the JSON `category` field; falls back to "Tous" view.
 */
export default function RealizationsFilterable({
  items,
  categoryLabels,
}: RealizationsFilterableProps) {
  const [active, setActive] = useState<string>("Tous");

  // Distinct categories present in the dataset
  const filters = useMemo(() => {
    const seen = new Set<string>();
    for (const item of items) seen.add(item.category);
    return ["Tous", ...Array.from(seen)];
  }, [items]);

  const filtered = active === "Tous" ? items : items.filter((i) => i.category === active);

  return (
    <>
      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {filters.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              active === cat
                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                : "bg-surface-muted text-foreground-muted hover:bg-surface-elevated border border-border"
            }`}
          >
            {cat === "Tous" ? cat : categoryLabels[cat] ?? cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <RealizationCard
                id={item.id}
                title={item.title}
                type={item.type}
                location={item.location}
                category={item.serviceType || categoryLabels[item.category] || item.category}
                image={item.image}
                hasCompare={Boolean(item.imageBefore && item.imageAfter && item.imageBefore !== item.imageAfter)}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-foreground-muted py-12"
        >
          Aucune réalisation dans cette catégorie pour le moment.
        </motion.p>
      )}
    </>
  );
}
