import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/actualites/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      ${post.frontmatter.category ? `<category><![CDATA[${post.frontmatter.category}]]></category>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>S Connect France — Actualités &amp; conseils</title>
    <link>${siteUrl}/actualites</link>
    <description>Actualités, guides et conseils en électricité, contrôle d'accès, serrurerie et métallerie.</description>
    <language>fr-FR</language>
    <atom:link href="${siteUrl}/actualites/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
