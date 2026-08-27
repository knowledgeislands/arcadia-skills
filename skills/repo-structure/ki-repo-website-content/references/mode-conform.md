# Mode CONFORM — bring a site up to standard

**Precondition:** Run [Mode AUDIT](mode-audit.md) first so the change starts from a known gap list.

_On-demand procedure for `ki-repo-website-content`'s CONFORM mode. The host publishes only bounded `.ki-config.toml` proposals; `ki-repo` centrally composes `.gitignore`, while source scaffolding, builds, deployments, and other external work remain explicit._

1. **Apply the safe hosted repair.** Run `ki repo conform --repo <repo> --skill ki-repo-website-content`. `ki-repo` owns adding the keyless `[skills.ki-repo-website-content]` declaration and composes the declared `ki-repo-website` `dist/` block once for the complete repository operation. Malformed or symlinked configuration and unsafe paths remain report-only.
2. **Repair source and configuration gaps deliberately.** Use [the standard](standards-eleventy-site.md) and [the exemplars](exemplars.md) for Eleventy configuration, the Tailwind token pair, layouts, partials, content model, and script family. The hosted conform transaction does not scaffold or rewrite application code.
3. **Conform adjacent layers separately.** Run `ki-engineering` for common toolchain findings and `ki-authoring` for Markdown/TOML style. Run `ki-repo-website-cloudflare` only when the repository owns that deployment layer.
4. **Verify explicitly.** Re-run the website audit, build the site through its declared script, inspect representative generated links, and run any applicable hosting audit. Deployment remains an operator action and is never performed by this skill's hosted conform transaction.

Reciprocal off-ramps name the skill that leads back into the site-build layer:

- **The Bun mandate, aggregate/scoped audit wiring, direct code-tool execution, `tsconfig`/`biome`, and type-checking** → `ki-engineering`. This skill owns the _site-build_ delta on top of that common layer; it references it, never restates it.
- **Markdown and TOML** → `ki-authoring`.
- **A single interactive React/Vite application** → `ki-repo-website-app`.
- **`wrangler.jsonc`, Workers Static Assets, deployment and domains** → `ki-repo-website-cloudflare`.
- **Repository APIs and GitHub configuration** → `ki-repo`.
