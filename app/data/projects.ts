import { ProjectEntry } from '@/app/types';

export const projects: ProjectEntry[] = [
  {
    id: 'nyu-emergency-alerts',
    title: 'NYU Emergency Alert System Redesign',
    slug: 'nyu-emergency-alerts',
    tags: ['campus-safety', 'communications', 'video'],
    dateRange: '2024-2025',
    featured: true,
    status: 'published',
    context:
      "NYU's existing emergency alert communications relied on text-heavy emails and generic push notifications that students routinely ignored. Engagement rates were below 15% and post-incident surveys showed most students were unaware of official guidance during active incidents.",
    objective:
      'Redesign emergency alert communications to achieve at least 60% open rate and measurably improve student awareness of safety protocols within one semester.',
    approach:
      'Audited existing alert templates and surveyed 200+ students on how they consumed urgent information. Rebuilt alert templates using plain-language headers, single-action calls-to-action, and supplemental video briefings produced in-house. Piloted with three alert types over eight weeks.',
    outcome:
      'Open rates increased from 14% to 71% over the pilot period. Post-incident survey awareness scores improved by 48 percentage points. Video supplements averaged 3,200 views within 24 hours of distribution.',
    lessons:
      'Plain-language design and format consistency matter more than channel reach. Students trained to expect a predictable format engaged far more reliably than with ad-hoc communications.',
  },
];
