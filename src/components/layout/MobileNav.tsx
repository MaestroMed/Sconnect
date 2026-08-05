"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { Menu, X, Phone, ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import type { WeeklySchedule } from "@/lib/availability";

interface ServiceItem {
  name: string;
  href: string;
  description: string;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

interface MobileNavProps {
  navigation: NavItem[];
  services: ServiceItem[];
  phone: string;
  schedule?: WeeklySchedule;
}

/**
 * Mobile navigation sheet — uses @radix-ui/react-dialog for
 * focus trap, Escape handling, scroll lock, and proper ARIA.
 */
export default function MobileNav({ navigation, services, phone, schedule }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-dark-950/70 backdrop-blur-sm lg:hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed inset-x-0 top-0 z-50 max-h-[100dvh] overflow-y-auto bg-surface shadow-2xl lg:hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            "duration-300",
          )}
        >
          <Dialog.Title className="sr-only">Navigation principale</Dialog.Title>
          <Dialog.Description className="sr-only">
            Menu de navigation du site S Connect France
          </Dialog.Description>

          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <AvailabilityBadge schedule={schedule} compact />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Fermer le menu"
                className="p-2 rounded-lg hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="container-custom py-4 space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.hasDropdown
                    ? pathname.startsWith(item.href)
                    : pathname === item.href;

              if (item.hasDropdown) {
                return (
                  <Accordion.Root key={item.name} type="single" collapsible>
                    <Accordion.Item value={item.name}>
                      <Accordion.Trigger
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-colors group",
                          isActive
                            ? "text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-500/10"
                            : "text-foreground hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600",
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden="true"
                        />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="ml-4 space-y-1 py-1">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block px-4 py-2 rounded-lg text-foreground-muted hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 transition-colors"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive
                      ? "text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-500/10"
                      : "text-foreground hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-border space-y-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 text-foreground font-semibold"
              >
                <Phone className="w-5 h-5 text-primary-600" />
                {phone}
              </a>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/demande-devis" className="btn-outline text-center">
                  Devis gratuit
                </Link>
                <Link href="/demande-intervention" className="btn-accent text-center">
                  <AlertTriangle className="w-4 h-4" />
                  Urgence
                </Link>
              </div>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
