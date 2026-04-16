"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface DesktopNavProps {
  navigation: NavItem[];
  services: ServiceItem[];
}

export default function DesktopNav({ navigation, services }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root delayDuration={100} className="relative">
      <NavigationMenu.List className="flex items-center gap-1">
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
                      "px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-block",
                      isActive
                        ? "text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-500/10"
                        : "text-foreground hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-300 dark:hover:bg-primary-500/10",
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.name}>
              <NavigationMenu.Trigger
                className={cn(
                  "group flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-500/10"
                    : "text-foreground hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-300 dark:hover:bg-primary-500/10",
                )}
              >
                {item.name}
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content
                className={cn(
                  "absolute left-0 top-full mt-2 z-50",
                  "data-[motion=from-start]:animate-fade-in-up data-[motion=from-end]:animate-fade-in-up",
                  "data-[state=open]:animate-fade-in data-[state=closed]:opacity-0",
                )}
              >
                <div className="bg-surface-elevated/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-dark-900/15 dark:shadow-black/50 border border-border p-4 w-[360px]">
                  <div className="space-y-1">
                    {services.map((service) => (
                      <NavigationMenu.Link key={service.href} asChild>
                        <Link
                          href={service.href}
                          className="block p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <div className="font-semibold text-foreground group-hover/item:text-primary-600 dark:group-hover/item:text-primary-300 transition-colors">
                            {service.name}
                          </div>
                          <div className="text-sm text-foreground-muted">
                            {service.description}
                          </div>
                        </Link>
                      </NavigationMenu.Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <NavigationMenu.Link asChild>
                      <Link
                        href={item.href}
                        className="flex items-center justify-center gap-2 text-primary-600 dark:text-primary-300 font-semibold hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:underline"
                      >
                        Tous nos services
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Link>
                    </NavigationMenu.Link>
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
