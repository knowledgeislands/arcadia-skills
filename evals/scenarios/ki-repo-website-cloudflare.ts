/**
 * Eval scenarios for the `ki-repo-website-cloudflare` skill — the deploy/serve
 * delta for the one site Worker.
 *
 * Design note: a capable model knows wrangler generically, so testing that shows "no
 * difference". These scenarios target house-ARBITRARY specifics a baseline cannot derive:
 * the Workers-Static-Assets-not-Pages decision, the `assets`-vs-`main` site/companion
 * distinction, and the exact `dist/` seam.
 */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-repo-website-cloudflare',
    id: 'host-not-pages',
    prompt:
      'How do we deploy a static site to Cloudflare under the Knowledge Islands house standard — which Cloudflare product, which deploy command, and which command must never be used?',
    assertions: [
      { name: 'Workers Static Assets', re: /workers[^.\n]{0,20}static assets|static assets/i },
      { name: 'not Pages', re: /not pages|never[^.\n]{0,20}pages|pages[^.\n]{0,20}not.*target/i },
      { name: 'never wrangler pages deploy', re: /wrangler pages deploy/i }
    ],
    rubric:
      'House decision: serve the site with **Cloudflare Workers Static Assets**, not Pages as the deployment target for new projects. Deploy with `wrangler deploy` and never `wrangler pages deploy`.'
  },
  {
    skill: 'ki-repo-website-cloudflare',
    id: 'host-seam-and-companion',
    prompt:
      'In our site `wrangler.jsonc`, what does `assets.directory` point at, and how do we tell the in-scope site Worker apart from a companion Worker (a bot or ingress receiver) that lives in the same repo?',
    assertions: [
      { name: 'assets.directory points at dist/', re: /assets\.directory|\.\.?\/dist|dist\//i },
      { name: 'site Worker has assets and no main', re: /assets[^.\n]{0,30}(no|without)[^.\n]{0,8}main|no `?main`?/i },
      {
        name: 'companion routes to cloudflare/wrangler',
        re: /cloudflare[^.\n]{0,8}\/?[^.\n]{0,8}wrangler|generic (cloudflare|wrangler)/i
      }
    ],
    rubric:
      'House model: `assets.directory` points at the exact local `dist/` produced through `ki-repo-website`. The static site carries `assets` and no `main`; no `main` is what guarantees no server-side Worker code executes. A main/no-assets companion belongs to the generic Cloudflare/Wrangler skills.'
  },
  {
    skill: 'ki-repo-website-cloudflare',
    id: 'host-config-keys',
    prompt:
      'Beyond the `assets` block, what must our site `wrangler.jsonc` carry, what gets gitignored for hosting, and is a custom domain mandatory?',
    assertions: [
      { name: 'name + compatibility_date', re: /compatibility_date/i },
      { name: 'observability enabled', re: /observability/i },
      { name: 'gitignore dist and .wrangler', re: /\.wrangler/i },
      {
        name: 'custom domain is optional',
        re: /custom[- ]domain[^.\n]{0,30}(optional|not (?:mandatory|required))|workers\.dev/i
      }
    ],
    rubric:
      'House shape: the site `wrangler.jsonc` carries `name`, a `compatibility_date`, the `assets` block, and `observability.enabled: true`. Custom-domain `routes` are optional; when present they use `custom_domain: true` for the intended hosts. For hosting, **`dist/` and `.wrangler/` are gitignored**. A correct answer names `compatibility_date`, `observability` enabled, and `.wrangler/` (plus `dist/`) gitignored without requiring a custom domain.'
  }
]
