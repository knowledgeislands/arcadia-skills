import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-repo-website-app',
    id: 'website-app-not-eleventy',
    prompt: 'Our site is one interactive React dashboard. Should we add Eleventy, and what build seam does the app standard require?',
    assertions: [
      { name: 'no Eleventy', re: /do not add eleventy|not.*eleventy|decline eleventy/i },
      { name: 'React Vite', re: /react[^.\n]{0,20}vite|vite[^.\n]{0,20}react/i },
      { name: 'dist output', re: /dist\//i }
    ],
    rubric: 'A single interactive SPA selects `ki-repo-website-app`, not the content skill. React/Vite is the current implementation and `vite build` emits the shared `dist/` seam. Adding Eleventy would create a second build system because it does not bundle the React application.'
  }
]
