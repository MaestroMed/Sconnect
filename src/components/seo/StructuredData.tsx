/**
 * Composant pour injecter des données structurées Schema.org
 * Utilisation: <StructuredData data={schemaObject} />
 */

interface StructuredDataProps {
  data: object | object[];
}

export default function StructuredData({ data }: StructuredDataProps) {
  // Si c'est un tableau, créer plusieurs scripts
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
      </>
    );
  }

  // Si c'est un seul objet
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
