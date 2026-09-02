# Mode EDUCATE — scaffold a new site

_On-demand procedure for ki-repo-website-content's EDUCATE mode. Scaffolding creates application source and therefore remains deliberate authoring rather than a hosted rubric repair._

1. **Establish the repository and toolchain layers.** Use `ki-repo` for the repository shell and `ki-engineering` for the Bun workspace and TypeScript toolchain.
2. **Create the `workspaces/site/` workspace.** Start with `workspaces/site/eleventy.config.ts`, `workspaces/site/package.json`, `workspaces/site/tsconfig.json`, and the `workspaces/site/src/` layout from [the standard](standards-eleventy-site.md). Keep output at `workspaces/site/dist/`.
3. **Author the four invariants from day one.** Use config-less Tailwind 4, emit portable relative links, run TypeScript natively, and compile Tailwind inside the Eleventy lifecycle. Adapt the concrete shapes in [the exemplars](exemplars.md) to the site's content, palette, and navigation.
4. **Declare governance.** Add keyless `[skills.ki-repo-website]` and `[skills.ki-repo-website-content]` tables to `.ki.toml` and ignore `workspaces/site/dist/`.
5. **Verify before handoff.** Run `ki repo audit --repo <repo> --skill ki-engineering`, the website core audit, the content audit, and the site's build. If Cloudflare will serve the output, use `ki-repo-website-cloudflare` separately for that layer.
