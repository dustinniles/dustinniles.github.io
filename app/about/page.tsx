export default function AboutPage() {
  return (
    <article className="p-12 max-w-2xl">
      <h1 className="text-3xl font-light text-[var(--foreground)] mb-8">About</h1>

      <section className="mb-8">
        <h2 className="text-xl font-light text-[var(--foreground)] mb-4">Background</h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          I am a creative professional with a passion for visual storytelling and design.
          My background spans photography, videography, and digital design, with a focus on
          capturing authentic moments and crafting meaningful visual experiences.
        </p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Over the years, I&rsquo;ve worked with diverse clients and on personal projects that
          challenge me to grow and innovate in my craft.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-light text-[var(--foreground)] mb-4">Interests</h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Beyond work, I&rsquo;m passionate about cycling, emerging technologies, and volunteering
          in my community. I believe in continuous learning and contributing meaningfully to
          causes I care about.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-light text-[var(--foreground)] mb-4">Timeline</h2>
        <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
          <li className="flex gap-4">
            <time dateTime="2022" className="flex-shrink-0 text-[var(--text-tertiary)]">2022</time>
            <span>Started exploring new creative directions</span>
          </li>
          <li className="flex gap-4">
            <time dateTime="2021" className="flex-shrink-0 text-[var(--text-tertiary)]">2021</time>
            <span>Expanded into videography and digital media</span>
          </li>
          <li className="flex gap-4">
            <time dateTime="2020" className="flex-shrink-0 text-[var(--text-tertiary)]">2020</time>
            <span>Focused on photography and design projects</span>
          </li>
        </ol>
      </section>
    </article>
  );
}
