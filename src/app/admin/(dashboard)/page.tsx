import { getSiteConfig, getRealizations, getTestimonials, getBrands, getServices } from "@/lib/data-service";
import { 
  Zap, 
  Image, 
  MessageSquare, 
  Award, 
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const config = getSiteConfig();
  const realizations = getRealizations();
  const testimonials = getTestimonials();
  const brands = getBrands();
  const services = getServices();

  const totalServices = services.categories.reduce(
    (sum, cat) => sum + cat.services.length,
    0
  );

  const stats = [
    {
      label: "Réalisations",
      value: realizations.realizations.length,
      icon: Image,
      color: "bg-primary-500",
      href: "/admin/realizations",
    },
    {
      label: "Témoignages",
      value: testimonials.testimonials.length,
      icon: MessageSquare,
      color: "bg-accent-500",
      href: "/admin/testimonials",
    },
    {
      label: "Marques partenaires",
      value: brands.brands.length,
      icon: Award,
      color: "bg-green-500",
      href: "/admin/brands",
    },
    {
      label: "Services",
      value: totalServices,
      icon: Zap,
      color: "bg-purple-500",
      href: "/admin/services",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Tableau de bord</h1>
        <p className="text-dark-500">Bienvenue dans l&apos;administration de S Connect France</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-500">{stat.label}</p>
                <p className="text-3xl font-bold text-dark-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Site Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-900">
              Informations du site
            </h2>
            <Link
              href="/admin/site-config"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Modifier
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-dark-600">
              <Phone className="w-5 h-5 text-primary-500" />
              <span>{config.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-dark-600">
              <Mail className="w-5 h-5 text-primary-500" />
              <span>{config.email}</span>
            </div>
            <div className="flex items-center gap-3 text-dark-600">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span>
                {config.address.street}, {config.address.postalCode}{" "}
                {config.address.city}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">
            Statistiques affichées
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-dark-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-900">
                {config.stats.interventionsPerYear}+
              </p>
              <p className="text-xs text-dark-500">Interventions/an</p>
            </div>
            <div className="text-center p-4 bg-dark-50 rounded-lg">
              <Users className="w-6 h-6 text-accent-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-900">
                {config.stats.yearsExperience}
              </p>
              <p className="text-xs text-dark-500">Années d&apos;exp.</p>
            </div>
            <div className="text-center p-4 bg-dark-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-dark-900">
                {config.stats.satisfactionRate}%
              </p>
              <p className="text-xs text-dark-500">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-900">
              Derniers témoignages
            </h2>
            <Link
              href="/admin/testimonials"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {testimonials.testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="p-3 bg-dark-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-dark-900">{t.name}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-dark-600 line-clamp-2">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-900">
              Catégories de services
            </h2>
            <Link
              href="/admin/services"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Gérer
            </Link>
          </div>
          <div className="space-y-3">
            {services.categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 bg-dark-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    cat.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                    cat.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-dark-900">{cat.name}</span>
                </div>
                <span className="text-sm text-dark-500">
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




