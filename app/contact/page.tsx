export default function ContactPage() {
  return (
    <article className="p-12 max-w-2xl">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-8">Get in Touch</h1>

      <p className="text-sm text-[var(--text-secondary)] mb-6">
        I&rsquo;d love to hear from you. Whether you have a project in mind, want to collaborate,
        or simply want to say hello, feel free to reach out.
      </p>

      <a
        href="mailto:dustin@dustinniles.com"
        aria-label="Email Dustin Niles"
        className="inline-block text-sm font-light text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors px-1"
      >
        dustin@dustinniles.com
      </a>
    </article>
  );
}
