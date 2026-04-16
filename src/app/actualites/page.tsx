import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import SectionTitle from "@/components/ui/SectionTitle";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "Actualités & conseils",
  description:
    "Tous nos articles sur l'électricité, le contrôle d'accès, la serrurerie et la métallerie : normes, guides, retours d'expérience.",
  path: "/actualites",
  category: "Actualités",
});

export default function ActualitesPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="bg-surface-muted">
      <section className="container-custom pt-12 pb-6">
        <Breadcrumbs items={[{ label: "Actualités" }]} />
      </section>

      <section className="container-custom pb-8">
        <SectionTitle
          badge="Blog"
          title="Actualités & conseils"
          subtitle="Nos équipes partagent leur expertise : normes électriques, serrurerie, contrôle d'accès et retours de chantier."
        />

        {posts.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-foreground-muted">Aucun article publié pour le moment.</p>
          </div>
        ) : (
          <>
            {featured && (
              <Reveal>
                <Link
                  href={`/actualites/${featured.slug}`}
                  className="group block mb-12 overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-gradient-to-br from-primary-600 via-electric-500 to-primary-700 overflow-hidden">
                      {featured.frontmatter.cover ? (
                        <Image
                          src={featured.frontmatter.cover}
                          alt={featured.frontmatter.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-6xl font-black text-white/20">
                            {featured.frontmatter.category}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="badge bg-white/90 backdrop-blur text-primary-700 font-semibold">
                          À la une
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      {featured.frontmatter.category && (
                        <span className="badge-primary mb-3 w-fit">
                          {featured.frontmatter.category}
                        </span>
                      )}
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                        {featured.frontmatter.title}
                      </h2>
                      <p className="text-foreground-muted leading-relaxed mb-6">
                        {featured.frontmatter.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted mb-6">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featured.frontmatter.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {featured.readingTime.text}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-300 font-semibold">
                        Lire l&apos;article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <Link
                    href={`/actualites/${post.slug}`}
                    className="card-hover group block h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-electric-50 dark:from-primary-500/10 dark:to-electric-500/10">
                      {post.frontmatter.cover ? (
                        <Image
                          src={post.frontmatter.cover}
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <span className="font-display text-4xl font-bold text-primary-600/30 dark:text-primary-400/30 text-center">
                            {post.frontmatter.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {post.frontmatter.category && (
                        <span className="badge-primary mb-3">
                          {post.frontmatter.category}
                        </span>
                      )}
                      <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.frontmatter.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-foreground-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.frontmatter.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readingTime.text}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
