import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-repo-website',
    id: 'website-purpose-composition',
    prompt: 'How should a Knowledge Islands repository compose the website skills for a documentation site, a React dashboard, and Cloudflare hosting?',
    assertions: [
      { name: 'neutral core', re: /ki-repo-website[^-]|neutral|core/i },
      { name: 'content xor app', re: /content[^.\n]{0,30}(app|react)|app[^.\n]{0,30}content/i },
      { name: 'hosting independent', re: /cloudflare[^.\n]{0,30}(independent|orthogonal|either)|hosting[^.\n]{0,30}(independent|orthogonal)/i }
    ],
    rubric: 'A website selects the neutral `ki-repo-website` core and exactly one purpose-specific implementation: content for Markdown/data page collections or app for one interactive React/Vite application. Cloudflare hosting is orthogonal and composes with either.'
  }
]
