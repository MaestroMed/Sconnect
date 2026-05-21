"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, ArrowRight, Zap, KeyRound, Lock, Wrench, Calculator, BookOpen, FileBarChart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  name: string;
  href: string;
  description: string;
  color?: string;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

interface DesktopNavProps {
  navigation: NavItem[];
  services: ServiceItem[];
}

// Icon mapping for service items so the mega-menu has visual signal.
const SERVICE_ICONS: Record<string, typeof Zap> = {
  Électricité: Zap,
  "Contrôle d'accès": KeyRound,
  Serrurerie: Lock,
  Métallerie: Wrench,
};

// Curated quick-access "weapons" featured in the Services mega-menu —
// they're high-intent SEO landings and direct conversion points.
const QUICK_ACCESS: { label: string; href: string; icon: typeof Calculator; desc: string }[] = [
  {
    label: "Calculateur relamping",
    href: "/calculateur-relamping",
    icon: Calculator,
    desc: "Estimez ROI + économies en 30 s",
  },
  {
    label: "Études de cas",
    href: "/etudes-de-cas",
    icon: FileBarChart,
    desc: "3 chantiers documentés chiffrés",
  },
  {
    label: "Lexique éclairage",
    href: "/lexique-eclairage",
    icon: BookOpen,
    desc: "50 termes pro à connaître",
  },
];

export default function DesktopNav({ navigation, services }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root delayDuration={120} skipDelayDuration={300} className="relative">
      <NavigationMenu.List className="flex items-center gap-0.5">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.hasDropdown
                ? pathname.startsWith(item.href)
                : pathname === item.href;

          if (!item.hasDropdown) {
            return (
              <NavigationMenu.Item key={item.name}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center",
                      isActive
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-foreground hover:text-primary-600 dark:hover:text-primary-300",
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <span
                        className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-electric-500"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.name}>
              <NavigationMenu.Trigger
                className={cn(
                  "group relative flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "text-primary-700 dark:text-primary-300"
                    : "text-foreground hover:text-primary-600 dark:hover:text-primary-300",
                )}
              >
                {item.name}
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
                {isActive && (
                  <span
                    className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-electric-500"
                    aria-hidden="true"
                  />
                )}
              </NavigationMenu.Trigger>

              {/* MEGA MENU — visuels + quick access */}
              <NavigationMenu.Content
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50",
                  "data-[motion=from-start]:animate-fade-in-up data-[motion=from-end]:animate-fade-in-up",
                  "data-[state=open]:animate-fade-in data-[state=closed]:opacity-0",
                )}
              >
                <div className="bg-surface-elevated/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-dark-900/20 dark:shadow-black/60 border border-border overflow-hidden w-[920px] max-w-[calc(100vw-2rem)]">
                  <div className="grid grid-cols-[1.4fr_1fr]">
                    {/* Left — 4 service cards avec icons */}
                    <div className="p-5 grid grid-cols-2 gap-2">
                      {services.map((service) => {
                        const Icon = SERVICE_ICONS[service.name] ?? Zap;
                        return (
                          <NavigationMenu.Link key={service.href} asChild>
                            <Link
                              href={service.href}
                              className="group/item flex flex-col gap-2 p-4 rounded-xl bg-surface hover:bg-primary-50 dark:hover:bg-primary-500/10 border border-transparent hover:border-primary-200 dark:hover:border-primary-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center shadow-md shadow-primary-500/25 group-hover/item:scale-110 transition-transform">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-display font-semibold text-foreground group-hover/item:text-primary-700 dark:group-hover/item:text-primary-300 transition-colors flex items-center gap-1.5">
                                  {service.name}
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                </div>
                                <div className="text-xs text-foreground-muted leading-relaxed mt-0.5">
                                  {service.description}
                                </div>
                              </div>
                            </Link>
                          </NavigationMenu.Link>
                        );
                      })}
                    </div>

                    {/* Right — Featured + Quick access */}
                    <div className="bg-gradient-to-br from-primary-50 to-electric-50/30 dark:from-primary-950/50 dark:to-electric-950/30 p-5 border-l border-border space-y-4">
                      {/* Featured pillar */}
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/services/electricite/relamping"
                          className="block group/featured relative aspect-[16/9] rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Image
                            src="/images/hero/relamping-lightbulb.webp"
                            alt=""
                            fill
                            sizes="320px"
                            className="object-cover transition-transform duration-500 group-hover/featured:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/40 to-transparent" />
                          <div className="absolute inset-x-3 bottom-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent-500/95 text-dark-900 px-2 py-0.5 text-[10px] font-bold mb-1.5">
                              ★ Notre expertise pillar
                            </span>
                            <div className="font-display font-bold text-white text-sm leading-tight">
                              Relamping LED tertiaire
                            </div>
                            <div className="text-white/80 text-[11px] mt-0.5">
                              Audit gratuit · ROI 3,5 ans · DEET 2030
                            </div>
                          </div>
                        </Link>
                      </NavigationMenu.Link>

                      {/* Quick access — SEO weapons */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted px-2">
                          Accès rapide
                        </p>
                        {QUICK_ACCESS.map((q) => {
                          const Icon = q.icon;
                          return (
                            <NavigationMenu.Link key={q.href} asChild>
                              <Link
                                href={q.href}
                                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-white/5 transition-colors group/qa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <Icon className="w-4 h-4 text-primary-600 dark:text-primary-300 shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-foreground group-hover/qa:text-primary-700 dark:group-hover/qa:text-primary-300 transition-colors leading-tight">
                                    {q.label}
                                  </div>
                                  <div className="text-[10px] text-foreground-muted leading-tight">
                                    {q.desc}
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenu.Link>
                          );
                        })}
                      </div>

                      {/* All services link */}
                      <NavigationMenu.Link asChild>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            Toutes les villes IDF + tous les services
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      {/* Viewport positioner */}
      <div className="absolute left-0 top-full flex justify-center perspective-[2000px]">
        <NavigationMenu.Viewport className="relative mt-0 w-full" />
      </div>
    </NavigationMenu.Root>
  );
}
