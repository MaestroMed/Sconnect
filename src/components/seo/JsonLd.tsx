import { getCspNonce } from "@/lib/csp";

interface JsonLdProps {
  /** Schema.org payload — single object or array of objects. */
  data: object | object[];
}

/**
 * Renders one or more <script type="application/ld+json"> tags, each
 * carrying the per-request CSP nonce produced by middleware.ts. Server
 * component only — relies on next/headers via {@link getCspNonce}.
 *
 * Use this from every RSC that needs to publish Schema.org markup. For
 * trees that originate from a client component (avis page, the service
 * page template), the parent RSC computes the schemas, renders <JsonLd>
 * for them, and only delegates the interactive UI to the client child.
 */
export default async function JsonLd({ data }: JsonLdProps) {
  const nonce = await getCspNonce();
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          nonce={nonce ?? undefined}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
