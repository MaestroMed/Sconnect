import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MDXComponents from "@/components/blog/MDXComponents";
import NewsletterForm from "@/components/marketing/NewsletterForm";
import ShareButtons from "@/components/blog/ShareButtons";

// Article hero cover. Articles rarely ship a bespoke `cover` in frontmatter,
// so we fall back to a relevant photo picked from the existing image library
// by category keyword — zero new assets, zero MDX edits, every article gets a
// photographic hero instead of a flat gradient. The gradient scrim on top
// keeps the white headline fully readable.
const CATEGORY_COVER: Array<[RegExp, string]> = [
  [/serrur|blindage|porte|a2p/i, "/images/services/serrurerie-ouverture.webp"],
  [/contrôle|controle|accès|acces|interphon|vidéophon|badge|digicode/i, "/images/services/acces-interphone.webp"],
  [/métall|metall|portail|garde-corps|structure/i, "/images/services/metallerie-portail.webp"],
  [/irve|borne|recharge|advenir|véhicule|vehicule/i, "/images/services/electricite-installation.webp"],
  [/dépann|depann|urgence|disjoncteur|tableau|panne|norme|nf c 15/i, "/images/services/electricite-depannage.webp"],
  [/relamp|éclairage|eclairage|led|dali|gtb|cee|décret|decret|deet|luminaire|ugr|irc|flicker|circadien|ia |audit|capex|leasing|rfp|operat|marché|marche/i, "/images/relamping/luxmeter-audit.webp"],
];

function coverForArticle(cover?: string, category?: string): string {
  if (cover) return cover;
  const hay = category ?? "";
  for (const [re, img] of CATEGORY_COVER) {
    if (re.test(hay)) return img;
  }
  return "/images/hero/hero-cinema-paris.webp";
}

// Only the slugs returned by generateStaticParams exist. Any other slug
// (drafts, typos, deleted articles) returns Next's built-in 404 WITHOUT
// rendering the component — the bulletproof quality-gate. New articles go
// live on the next build/deploy (standard for a static content site).
export const dynamicParams = false;

export async function generateStaticParams() {
  // Only prerender PUBLISHED articles. Draft scaffolds (draft: true) must
  // never be built or served — they would (a) break the build if their MDX
  // is malformed and (b) violate the editorial quality-gate by going live
  // before human editorialisation. getAllPosts() already filters drafts.
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
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
  // 404 on unknown slugs AND on drafts — drafts must never be publicly
  // reachable (editorial quality-gate + some scaffolds have malformed MDX).
  // To proofread a draft, flip `draft: false` locally. `draft` is coerced
  // because frontmatter can yield a boolean or the string "true".
  const isDraft = post?.frontmatter.draft === true || String(post?.frontmatter.draft) === "true";
  if (!post || isDraft) notFound();

  const related = await getRelatedPosts(slug, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

  // Author can be a real person (Mehdi) or fallback to the org. When we
  // recognise a known person we link to their author page → boosts E-E-A-T.
  const authorString = post.frontmatter.author || "S Connect France";
  const isMehdi = authorString.toLowerCase().includes("mehdi");
  const authorSchema = isMehdi
    ? {
        "@type": "Person",
        "@id": `${siteUrl}/auteur/mehdi-belkacem#person`,
        name: "Mehdi Belkacem",
        url: `${siteUrl}/auteur/mehdi-belkacem`,
      }
    : { "@type": "Organization", name: authorString };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "S Connect France",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    datePublished: post.frontmatter.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteUrl}/actualites/${slug}`,
    image: post.frontmatter.cover
      ? `${siteUrl}${post.frontmatter.cover}`
      : `${siteUrl}/api/og?title=${encodeURIComponent(post.frontmatter.title)}&type=article&category=${encodeURIComponent(post.frontmatter.category || "")}`,
  };

  // Optional HowTo schema → only when the post frontmatter declares a
  // procedural sequence. Google can surface it as a rich "How to" snippet
  // (numbered steps) on the SERP.
  const howToSchema = post.frontmatter.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.frontmatter.howTo.name ?? post.frontmatter.title,
        description: post.frontmatter.excerpt,
        ...(post.frontmatter.howTo.totalTime
          ? { totalTime: post.frontmatter.howTo.totalTime }
          : {}),
        ...(post.frontmatter.cover ? { image: `${siteUrl}${post.frontmatter.cover}` } : {}),
        step: post.frontmatter.howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return (
    <article className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {/* Hero — photographic cover (category fallback) under a brand gradient scrim */}
      <header className="relative overflow-hidden bg-dark-950 text-white">
        <Image
          src={coverForArticle(post.frontmatter.cover, post.frontmatter.category)}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/85 to-electric-600/80" />
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
              {isMehdi ? (
                <Link
                  href="/auteur/mehdi-belkacem"
                  className="flex items-center gap-2 hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  <User className="h-4 w-4" />
                  {post.frontmatter.author}
                </Link>
              ) : (
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.frontmatter.author}
                </span>
              )}
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

          <div className="mt-8 pt-6 border-t border-border">
            <ShareButtons
              title={post.frontmatter.title}
              url={`${siteUrl}/actualites/${slug}`}
              excerpt={post.frontmatter.excerpt}
            />
          </div>

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

          <div className="mt-12">
            <NewsletterForm variant="card" source="blog" />
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
