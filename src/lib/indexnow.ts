/**
 * IndexNow client — instant indexing protocol from Microsoft Bing + Yandex.
 *
 * Status (May 2026):
 * - ✅ Bing, Yandex, Naver, Seznam — accept IndexNow pings
 * - ❌ Google does NOT accept IndexNow; still relies on the sitemap +
 *   crawl. We ping Google's sitemap endpoint separately.
 *
 * How it works:
 *   1. Generate (or load) a key (UUID-like, 8-128 hex chars).
 *   2. Host the key file at `https://sconnectfrance.fr/<key>.txt` with
 *      the same key as content.
 *   3. POST changed URLs to https://api.indexnow.org/IndexNow
 *
 * The key file is `public/<key>.txt` (already present at
 * `public/13f8c0a4e7b34f2b9c5e6a8d1f7c2e90.txt`). Override via env
 * `INDEXNOW_KEY` if needed.
 */

const DEFAULT_KEY = "13f8c0a4e7b34f2b9c5e6a8d1f7c2e90";
const HOST = "sconnectfrance.fr";
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const GOOGLE_PING = "https://www.google.com/ping?sitemap=";
const BING_PING = "https://www.bing.com/ping?sitemap=";

interface PingResult {
  engine: string;
  ok: boolean;
  status?: number;
  error?: string;
}

/**
 * Submit one or many URLs to IndexNow. Returns per-engine results.
 * IndexNow API: POST { host, key, keyLocation, urlList[] }.
 *
 * Note: Google ignored. For Google notification we ping its sitemap
 * endpoint with the full sitemap URL — Google then re-crawls and picks
 * up the new entries via lastmod.
 */
export async function submitToIndexNow(urls: string[]): Promise<PingResult[]> {
  const results: PingResult[] = [];
  if (!urls.length) return results;

  const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
  const host = process.env.NEXT_PUBLIC_SITE_HOST || HOST;
  const keyLocation = `https://${host}/${key}.txt`;

  // 1) IndexNow (Bing + Yandex + Naver + Seznam in one call)
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
    });
    results.push({ engine: "indexnow", ok: res.ok, status: res.status });
  } catch (e) {
    results.push({
      engine: "indexnow",
      ok: false,
      error: e instanceof Error ? e.message : "unknown",
    });
  }

  // 2) Google sitemap ping (legacy but still effective)
  const sitemapUrl = `https://${host}/sitemap.xml`;
  try {
    const res = await fetch(`${GOOGLE_PING}${encodeURIComponent(sitemapUrl)}`);
    results.push({ engine: "google-sitemap", ok: res.ok, status: res.status });
  } catch (e) {
    results.push({
      engine: "google-sitemap",
      ok: false,
      error: e instanceof Error ? e.message : "unknown",
    });
  }

  // 3) Bing sitemap ping (belt + suspenders)
  try {
    const res = await fetch(`${BING_PING}${encodeURIComponent(sitemapUrl)}`);
    results.push({ engine: "bing-sitemap", ok: res.ok, status: res.status });
  } catch (e) {
    results.push({
      engine: "bing-sitemap",
      ok: false,
      error: e instanceof Error ? e.message : "unknown",
    });
  }

  return results;
}
