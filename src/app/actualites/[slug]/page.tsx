import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MDXComponents from "@/components/blog/MDXComponents";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Article introuvable", path: `/actualites/${slug}` });
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    path: `/actualites/${slug}`,
    type: "article",
    category: post.frontmatter.category,
    publishedAt: post.frontmatter.date,
    updatedAt: post.updatedAt,
    image: post.frontmatter.cover,
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    author: { "@type": "Organization", name: post.frontmatter.author || "S'Connect" },
    publisher: {
      "@type": "Organization",
      name: "S'Connect",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    datePublished: post.frontmatter.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteUrl}/actualites/${slug}`,
    image: post.frontmatter.cover
      ? `${siteUrl}${post.frontmatter.cover}`
      : `${siteUrl}/api/og?title=${encodeURIComponent(post.frontmatter.title)}&type=article&category=${encodeURIComponent(post.frontmatter.category || "")}`,
  };

  return (
    <article className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-electric-600 text-white">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 py-12 md:py-20">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Actualités", href: "/actualites" },
                { label: post.frontmatter.title },
              ]}
              light
            />
          </div>

          <div className="max-w-3xl">
            {post.frontmatter.category && (
              <span className="inline-block badge bg-white/15 backdrop-blur text-white border border-white/20 mb-5">
                {post.frontmatter.category}
              </span>
            )}
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-balance leading-tight mb-5">
              {post.frontmatter.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              {post.frontmatter.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/85">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.frontmatter.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime.text}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container-custom py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {post.frontmatter.cover && (
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-2xl -mt-24 border-8 border-surface">
              <Image
                src={post.frontmatter.cover}
                alt={post.frontmatter.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          )}

          <div className="prose-article">
            <MDXRemote
              source={post.content}
              components={MDXComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-foreground-muted mr-2">Tags :</span>
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className="badge-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-300 font-semibold hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Toutes les actualités
            </Link>
            <Link href="/demande-devis" className="btn-primary btn-sm">
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-surface-muted py-16">
          <div className="container-custom">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/actualites/${r.slug}`}
                  className="card-hover group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-electric-50 dark:from-primary-500/10 dark:to-electric-500/10">
                    {r.frontmatter.cover && (
                      <Image
                        src={r.frontmatter.cover}
                        alt={r.frontmatter.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                      {r.frontmatter.title}
                    </h3>
                    <p className="text-sm text-foreground-muted line-clamp-2">
                      {r.frontmatter.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
