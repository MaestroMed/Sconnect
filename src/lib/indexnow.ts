/**
 * IndexNow client — instant indexing protocol from Microsoft Bing + Yandex.
 *
 * Status (May 2026):
 * - ✅ Bing, Yandex, Naver, Seznam — accept IndexNow pings
 * - ❌ Google does NOT accept IndexNow ; son endpoint de ping sitemap
 *   (google.com/ping) est mort depuis 2024 (404). Pour Google : sitemap
 *   à jour + lastmod, c'est tout.
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

  // 2) Bing sitemap ping (belt + suspenders)
  const sitemapUrl = `https://${host}/sitemap.xml`;
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
