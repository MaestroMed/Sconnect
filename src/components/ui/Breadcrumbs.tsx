import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  light?: boolean;
}

/**
 * Visual breadcrumbs trail. Emits Schema.org BreadcrumbList JSON-LD
 * for SEO. Always prefixed by a home icon link.
 */
export default function Breadcrumbs({ items, className, light = false }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
  const allItems: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav
        aria-label="Fil d'Ariane"
        className={cn(
          "flex items-center gap-1.5 text-sm",
          light ? "text-white/70" : "text-foreground-muted",
          className,
        )}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded px-1 transition-colors",
                      light
                        ? "hover:text-white"
                        : "hover:text-primary-600 dark:hover:text-primary-300",
                    )}
                  >
                    {isHome && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 px-1",
                      isLast && (light ? "text-white font-medium" : "text-foreground font-medium"),
                    )}
                  >
                    {isHome && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
