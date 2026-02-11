import Link from 'next/link';

export default function ResumePage() {
  return (
    <article className="p-12 max-w-2xl">
      <header>
        <Link href="/work" className="font-light text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">← Work</Link>
        <h1 className="text-3xl font-light text-[var(--foreground)] mt-4 mb-8">Resume</h1>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-light text-[var(--foreground)] mb-4">Experience</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-[var(--text-lg)] font-light text-[var(--foreground)] mb-1">Senior Creative Director</h3>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">2022 – Present</p>
            <p className="text-sm text-[var(--text-secondary)]">Leading creative vision and digital strategy for client projects spanning photography, video, and design.</p>
          </div>
          <div>
            <h3 className="text-[var(--text-lg)] font-light text-[var(--foreground)] mb-1">Photographer &amp; Videographer</h3>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">2020 – 2022</p>
            <p className="text-sm text-[var(--text-secondary)]">Produced high-quality visual content for commercial and editorial clients including corporate branding and event documentation.</p>
          </div>
          <div>
            <h3 className="text-[var(--text-lg)] font-light text-[var(--foreground)] mb-1">Freelance Designer</h3>
            <p className="text-xs text-[var(--text-tertiary)] mb-2">2019 – 2020</p>
            <p className="text-sm text-[var(--text-secondary)]">Designed digital and print materials for small businesses and startups in the tech and creative industries.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-light text-[var(--foreground)] mb-4">Education</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-[var(--text-lg)] font-light text-[var(--foreground)] mb-1">Bachelor of Fine Arts in Photography</h3>
            <p className="text-xs text-[var(--text-tertiary)]">University of [Location] • 2019</p>
          </div>
          <div>
            <h3 className="text-[var(--text-lg)] font-light text-[var(--foreground)] mb-1">Certificate in Digital Design</h3>
            <p className="text-xs text-[var(--text-tertiary)]">Academy of [Institution] • 2018</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-light text-[var(--foreground)] mb-4">Skills</h2>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li>Photography &amp; Cinematography</li>
          <li>Digital Design &amp; Branding</li>
          <li>Video Editing &amp; Post-Production</li>
          <li>Creative Direction</li>
          <li>Adobe Creative Suite (Lightroom, Premiere, After Effects)</li>
          <li>Web Design &amp; Development</li>
        </ul>
      </section>
    </article>
  );
}
