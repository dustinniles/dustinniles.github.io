export default function ContactPage() {
  return (
    <article className="p-12 max-w-2xl">
      <h1 className="text-3xl font-light text-gray-900 mb-8">Get in Touch</h1>

      <p className="text-sm text-gray-600 mb-6">
        I&rsquo;d love to hear from you. Whether you have a project in mind, want to collaborate,
        or simply want to say hello, feel free to reach out.
      </p>

      <a
        href="mailto:dustin@dustinniles.com"
        aria-label="Email Dustin Niles"
        className="inline-block text-sm font-light text-gray-900 hover:text-gray-600 transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:outline-none px-1"
      >
        dustin@dustinniles.com
      </a>
    </article>
  );
}
