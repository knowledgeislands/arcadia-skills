# Mode EDUCATE — scaffold a content site

_On-demand procedure for `ki-repo-website-content`'s EDUCATE mode. It scaffolds the application source deliberately; hosted conform does not._

1. **Establish the repository shell.** Apply `ki-repo` and `ki-engineering` first so the repository has its governed root package, Bun workspace support, TypeScript checking, and canonical configuration.
2. **Select and create the site application workspace.** Conventionally set `site-root = "apps/site"` under `[skills.ki-repo-website]`, then start with `apps/site/eleventy.config.ts`, `apps/site/package.json`, `apps/site/tsconfig.json`, and the `apps/site/src/` layout from [the standard](standards-eleventy-site.md). Keep output at `apps/site/dist/`. Use another safe repository-relative root only when the repository has an explicit reason; subsequent steps resolve `<site-root>` from the core table.
3. **Apply the content stack.** Add config-less Tailwind 4, the TypeScript and JSON5 data extensions, the portable URL transform, the Nunjucks layout/partial structure, and the script family illustrated by [the exemplars](exemplars.md). Adapt tokens, content, navigation, and metadata to the site's purpose.
4. **Declare governance.** Add `[skills.ki-repo-website]` with its `site-root` selection and a keyless `[skills.ki-repo-website-content]` table to `.ki.toml`; ignore `<site-root>/dist/`.
5. **Verify before handoff.** Run the `ki-engineering`, website-core, and website-content audits, then run the site's build. If Cloudflare will serve the output, apply `ki-repo-website-cloudflare` as a separate layer.
