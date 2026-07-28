---
code: FND
---

# Foundation tooling roadmap

## Blocking

Actively broken, or blocking the `Next` horizon: takes priority over everything else and must clear before `Next` work proceeds. Empty means nothing is on fire.

## Next

Scoped and ready to start — the immediate queue, picked up before anything in **Soon** or **Future**.

## Soon

Understood and roughly scoped but not yet started — worth doing once the **Next** queue clears, ahead of anything still speculative.

## Waiting for

Worth doing, but presently blocked on an external dependency or decision. Revisit when its named condition changes; do not use this horizon for intentionally paused work.

## Parked

Intentionally paused work with no current attention. Revisit only when its priority or named return trigger changes.

## Future

Speculative or not yet scoped — items marked _(candidate)_ need a scoping pass (or a decision to drop them) before they're actionable.

### Harden external Cowork plugin publication _(candidate)_

Make `ki-binding-claude`'s `build-plugin` publication inspectable before mutation and recoverable across replacement of generated output. Preserve its existing output-root and symlink guards and unrelated scaffold; assess a dry-run and same-directory staged replacement only where compatible with the separate target repository.

### Make Codex MCP rendering recoverable _(candidate)_

Improve `ki-binding-codex`'s native `codex mcp remove` / `add` sequence around partial updates. Preserve its no-write `--check` mode and the Codex CLI's ownership of the live configuration; determine whether preflight, snapshot, or reconciliation can provide recovery without claiming native operations are transactional.

### Codify context-aware delegation policy _(candidate)_

Extend `ki-delegate`'s judgment guidance with an explicit dispatch decision: whether delegated work needs the originating conversation context, whether it needs frontier-level reasoning, and therefore whether to retain it in the main thread, dispatch it with a context fork, or dispatch a fresh lower-cost worker. Require the delegation brief to carry every durable constraint and decision needed by a fresh worker; context forks are a hygiene tool, not a substitute for an adequate brief. Map this policy to the runtime-specific delegation controls only after confirming their portable semantics.

### Document per-skill `.ki-config.toml` ownership _(candidate)_

Document the existing validate-down convention: each skill owns and validates its own table, while shared configuration stays with its owner. Use `ki-authoring.printWidth` as the worked example; do not design a central editor schema without a concrete cross-skill use case.

### Review the Cloudflare agent-setup prompt for the Cloudflare skill _(candidate)_

Review Cloudflare's [agent-setup prompt](https://developers.cloudflare.com/agent-setup/prompt.md) as a tracked source for the Cloudflare skill. Adopt only the parts that improve current, safe Cloudflare work in this harness; retain Knowledge Islands' ownership, conventions, and judgment rather than following the prompt wholesale.

### Standardise Prettier and Biome line width across repositories _(candidate)_

Every KI repository currently ships `.prettierrc.json` with `printWidth: 160` and `biome.json` with `lineWidth: 140`, split by file scope (Biome for TS/JS/JSON, Prettier for Markdown) rather than by a single chosen value. Decide whether the two tools should converge on one width, and if not, record why the split is intentional; update the shared scaffold/templates and every existing repository together rather than leaving the mismatch undocumented.
