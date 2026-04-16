import {
  getSiteConfig,
  getRealizations,
  getTestimonials,
  getBrands,
  getServices,
} from "@/lib/data-service";
import { getAllPosts, formatDate } from "@/lib/blog";
import {
  Zap,
  Image as ImageIcon,
  MessageSquare,
  Award,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Users,
  Star,
  Newspaper,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const config = getSiteConfig();
  const realizations = getRealizations();
  const testimonials = getTestimonials();
  const brands = getBrands();
  const services = getServices();
  const posts = getAllPosts();

  const totalServices = services.categories.reduce(
    (sum, cat) => sum + cat.services.length,
    0,
  );

  const stats = [
    {
      label: "Réalisations",
      value: realizations.realizations.length,
      icon: ImageIcon,
      gradient: "from-primary-500 to-electric-500",
      glow: "shadow-primary-500/30",
      href: "/admin/realizations",
    },
    {
      label: "Témoignages",
      value: testimonials.testimonials.length,
      icon: MessageSquare,
      gradient: "from-accent-500 to-accent-600",
      glow: "shadow-accent-500/30",
      href: "/admin/testimonials",
    },
    {
      label: "Marques partenaires",
      value: brands.brands.length,
      icon: Award,
      gradient: "from-green-500 to-emerald-600",
      glow: "shadow-green-500/30",
      href: "/admin/brands",
    },
    {
      label: "Services",
      value: totalServices,
      icon: Zap,
      gradient: "from-purple-500 to-indigo-600",
      glow: "shadow-purple-500/30",
      href: "/admin/services",
    },
    {
      label: "Articles publiés",
      value: posts.length,
      icon: Newspaper,
      gradient: "from-rose-500 to-pink-600",
      glow: "shadow-rose-500/30",
      href: "/admin/actualites",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-300 uppercase tracking-wide mb-1">
            Administration
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Tableau de bord
          </h1>
          <p className="text-foreground-muted mt-1">
            Bienvenue dans l&apos;administration de S Connect France.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-sm"
        >
          Voir le site
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-30 transition-opacity"
              style={{ backgroundImage: `linear-gradient(135deg, ${stat.gradient.replace("from-", "").replace(" to-", " ")})` }}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-3xl font-display font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-11 h-11 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg ${stat.glow}`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="relative mt-4 text-xs text-foreground-muted inline-flex items-center gap-1 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
              Gérer
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Site Info */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-foreground">
              Informations du site
            </h2>
            <Link
              href="/admin/site-config"
              className="text-sm font-semibold text-primary-600 dark:text-primary-300 hover:underline"
            >
              Modifier
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-foreground-muted">
              <Phone className="w-5 h-5 text-primary-500 shrink-0" />
              <span className="truncate">{config.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-foreground-muted">
              <Mail className="w-5 h-5 text-primary-500 shrink-0" />
              <span className="truncate">{config.email}</span>
            </div>
            <div className="flex items-start gap-3 text-foreground-muted">
              <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
              <span>
                {config.address.street}, {config.address.postalCode}{" "}
                {config.address.city}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics displayed on site */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-display font-bold text-foreground mb-4">
            Chiffres affichés sur le site
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-4 bg-surface-muted rounded-xl">
              <TrendingUp className="w-5 h-5 text-primary-500 mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">
                {config.stats.interventionsPerYear}+
              </p>
              <p className="text-[10px] uppercase tracking-wide text-foreground-muted">
                Interv./an
              </p>
            </div>
            <div className="text-center p-4 bg-surface-muted rounded-xl">
              <Users className="w-5 h-5 text-accent-500 mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">
                {config.stats.yearsExperience}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-foreground-muted">
                Années
              </p>
            </div>
            <div className="text-center p-4 bg-surface-muted rounded-xl">
              <Star className="w-5 h-5 text-accent-500 mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">
                {config.stats.satisfactionRate}%
              </p>
              <p className="text-[10px] uppercase tracking-wide text-foreground-muted">
                Satisfait
              </p>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-foreground">
              Derniers articles
            </h2>
            <Link
              href="/actualites"
              target="_blank"
              className="text-sm font-semibold text-primary-600 dark:text-primary-300 hover:underline"
            >
              Voir le blog
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              Aucun article publié pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/actualites/${post.slug}`}
                    target="_blank"
                    className="block p-3 rounded-lg bg-surface-muted hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors"
                  >
                    <p className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                      {post.frontmatter.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-foreground-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(post.frontmatter.date)}
                      </span>
                      {post.frontmatter.category && (
                        <span className="badge-primary text-[10px] py-0">
                          {post.frontmatter.category}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Testimonials */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-foreground">
              Derniers témoignages
            </h2>
            <Link
              href="/admin/testimonials"
              className="text-sm font-semibold text-primary-600 dark:text-primary-300 hover:underline"
            >
              Voir tout
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {testimonials.testimonials.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="p-4 bg-surface-muted rounded-xl border border-border"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-accent-400 fill-accent-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-foreground-muted line-clamp-2">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-foreground">
              Catégories
            </h2>
            <Link
              href="/admin/services"
              className="text-sm font-semibold text-primary-600 dark:text-primary-300 hover:underline"
            >
              Gérer
            </Link>
          </div>
          <div className="space-y-2">
            {services.categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 bg-surface-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      cat.color === "primary"
                        ? "bg-primary-100 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
                        : cat.color === "accent"
                          ? "bg-accent-100 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300"
                          : "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-300"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{cat.name}</span>
                </div>
                <span className="text-xs text-foreground-muted">
                  {cat.services.length} services
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
