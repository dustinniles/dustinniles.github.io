// JsonLd renders structured data for SEO. Data MUST only originate from
// app/data/ TypeScript files — never from user input or external sources.
// dangerouslySetInnerHTML is required by Next.js for <script> tags.
// XSS risk is zero here: all data is static, type-checked, and build-time.
interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
