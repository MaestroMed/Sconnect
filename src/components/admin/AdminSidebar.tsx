"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap,
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  MessageSquare,
  Award,
  Wrench,
  LogOut,
  Menu,
  X,
  Home,
  Upload,
  ExternalLink,
  PanelLeftClose,
  PanelLeft,
  Newspaper,
  Inbox,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type MenuItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  badge?: string;
  dynamicCount?: "submissions";
};

const menuItems: MenuItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/demandes", label: "Demandes", icon: Inbox, dynamicCount: "submissions" },
  { href: "/admin/homepage", label: "Page d'accueil", icon: Home },
  { href: "/admin/site-config", label: "Configuration", icon: Settings },
  { href: "/admin/media", label: "Médias & Logo", icon: Upload },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/realizations", label: "Réalisations", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/brands", label: "Marques", icon: Award },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
];

const COLLAPSED_KEY = "sconnect_admin_collapsed";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [newSubmissions, setNewSubmissions] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/submissions?status=new&limit=1", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = (await res.json()) as { count: number };
        if (!cancelled) setNewSubmissions(json.count ?? 0);
      } catch {
        /* ignore */
      }
    };
    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      toast.success("Déconnexion réussie");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const isActive = (item: (typeof menuItems)[number]) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={cn("p-6 border-b border-dark-800 flex items-center", collapsed && "p-4")}>
        <Link href="/admin" className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-primary-500 to-electric-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="font-bold text-white block truncate">S Connect</span>
              <span className="text-xs text-dark-400 block truncate">Administration</span>
            </div>
          )}
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item);
            const dynamicBadge =
              item.dynamicCount === "submissions" && newSubmissions && newSubmissions > 0
                ? String(newSubmissions)
                : null;
            const badge = dynamicBadge ?? item.badge;
            return (
              <li key={item.href} className="relative">
                {active && (
                  <motion.span
                    layoutId="admin-nav-active"
                    className="absolute inset-0 rounded-lg bg-primary-600 shadow-lg shadow-primary-500/30"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    active ? "text-white" : "text-dark-300 hover:bg-dark-800 hover:text-white",
                    collapsed && "justify-center",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="truncate">{item.label}</span>
                      {badge && (
                        <span className="ml-auto rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase text-dark-900">
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && dynamicBadge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-dark-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors",
            collapsed && "justify-center",
          )}
          title={collapsed ? "Voir le site" : undefined}
        >
          <ExternalLink className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Voir le site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors",
            collapsed && "justify-center",
          )}
          title={collapsed ? "Déconnexion" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
        <button
          onClick={toggleCollapsed}
          className={cn(
            "hidden lg:flex w-full items-center gap-3 px-3 py-2.5 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors mt-2",
            collapsed && "justify-center",
          )}
          title={collapsed ? "Déplier" : "Replier"}
        >
          {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          {!collapsed && <span>Replier</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark-900 text-white rounded-lg shadow-lg"
        aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 bg-dark-900 flex flex-col transform transition-all duration-300 lg:transform-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
