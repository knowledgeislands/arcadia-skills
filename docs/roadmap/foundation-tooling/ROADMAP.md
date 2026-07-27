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

### Verify GitHub CI across the repository fleet

After the released CLI and canonical harness are available through the normal installation path, inventory every active Knowledge Islands repository's GitHub Actions workflows and prove that each works in a clean hosted runner. Ensure CI installs the verified released `ki`, detects and rejects a stale shadow executable earlier on `PATH`, establishes the declared harness inventory non-interactively, and runs the repository's declared audit, test, build, and release-adjacent gates with the required permissions, secrets, caches, and platform coverage. Fix repository-owned workflow drift in the receiving repository rather than hiding it in the harness, and keep this fleet acceptance pass independent of any one CLI or release plan. Completion requires a green default-branch workflow for every active repository, with any intentional exclusion recorded and justified.

### Protect generated rubric publications from drift

Make the `ki` CLI the one canonical renderer for every structured skill rubric. A skill's TypeScript catalogue is authoritative; its tracked `references/rubric.md` is derived output. `ki repo audit --skill ki-skills` must treat any difference between the rendered and tracked publication as drift, while `ki repo conform --skill ki-skills --dry-run` reports and real CONFORM regenerates the affected publications for review. Add generic renderer and transaction coverage in `tools-ki`, then reconcile generated-source notices, classifications, citations, and judgment prompts with the `ki-skills` rubric-authoring contract. Do not retain per-skill publication renderers or divergent output shapes.

### Review `ki-bootstrap` for further simplification

After the current boundary refactor settles, review the complete `ki-bootstrap` implementation for residual complexity across user installation, repository bootstrap, shared transport, generation, publication, rubric contexts, and tests. Start with local process launches between bootstrap-owned publisher, synchroniser, HELP, and scaffold modules; replace them only after each has an import-safe entry point and preserves its guarded transaction. Keep external commands and user-install failure isolation where those are real boundaries.

### Establish a top-level script self-description contract _(candidate)_

Define and audit a concise source-level contract for user-facing top-level skill scripts: a plain-language purpose, intended use, mutation or no-write boundary, canonical invocation, and a matching `--help` response. Inventory `govern.ts`, educators, and intentionally public named helpers separately from private modules and generated surfaces; avoid boilerplate that merely repeats a function name or causes generated drift. Decide ownership between `ki-skills` and `ki-engineering`, then add mechanical enforcement only after the script classes and accepted header shape are settled.

### Codify Git workflow and commit conventions _(candidate)_

Choose an owner for repository Git discipline, including Conventional Commit messages, the allowed type and scope vocabulary, safe lock and cleanup behaviour, and consistency with repository-local instructions. Decide whether that owner should be a dedicated `ki-git` skill, including ownership of the shipped stale Git-lock guard rather than leaving it as an ungoverned hook. Add mechanical enforcement only after the standard is settled.

## Waiting for

Worth doing, but presently blocked on an external dependency or decision. Revisit when its named condition changes rather than treating it as dormant local work.

## Future

Speculative or not yet scoped — items marked _(candidate)_ need a scoping pass (or a decision to drop them) before they're actionable.

### Codify context-aware delegation policy _(candidate)_

Extend `ki-delegate`'s judgment guidance with an explicit dispatch decision: whether delegated work needs the originating conversation context, whether it needs frontier-level reasoning, and therefore whether to retain it in the main thread, dispatch it with a context fork, or dispatch a fresh lower-cost worker. Require the delegation brief to carry every durable constraint and decision needed by a fresh worker; context forks are a hygiene tool, not a substitute for an adequate brief. Map this policy to the runtime-specific delegation controls only after confirming their portable semantics.

### Replace local tokenomics engine subprocesses _(candidate)_

Extract a pure evidence and findings API from tokenomics’ local audit and conform engines so its checker can invoke them without launching Bun for adjacent source modules. Preserve the engine’s direct CLI behaviour, JSONL/reporting contracts, and external Git boundary; do not couple this migration to aggregate rendering.

### Document per-skill `.ki-config.toml` ownership _(candidate)_

Document the existing validate-down convention: each skill owns and validates its own table, while shared configuration stays with its owner. Use `ki-authoring.printWidth` as the worked example; do not design a central editor schema without a concrete cross-skill use case.

### Inventory non-critical writers for bounded follow-up _(candidate)_

After the rollout-critical filesystem work closes, inventory remaining report generators and direct conformers by mutation class. Prioritise external, user-space, or destructive writers; leave ordinary local report writers alone unless the inventory identifies a concrete risk. The initial FND-019 review identifies `ki-binding-claude`'s Cowork settings writer, `ki-binding-codex`'s native CLI merge, `ki-housekeeping-claude`'s state writers, and `ki-subagents`' recursive agent-surface writer as the first candidates for dry-run, idempotence, symlink, and atomic-publication evidence. Opaque subprocess writers retain honest exclusions unless a separate isolation design is approved.

### Review the Cloudflare agent-setup prompt for the Cloudflare skill _(candidate)_

Review Cloudflare's [agent-setup prompt](https://developers.cloudflare.com/agent-setup/prompt.md) as a tracked source for the Cloudflare skill. Adopt only the parts that improve current, safe Cloudflare work in this harness; retain Knowledge Islands' ownership, conventions, and judgment rather than following the prompt wholesale.

### Standardise Prettier and Biome line width across repositories _(candidate)_

Every KI repository currently ships `.prettierrc.json` with `printWidth: 160` and `biome.json` with `lineWidth: 140`, split by file scope (Biome for TS/JS/JSON, Prettier for Markdown) rather than by a single chosen value. Decide whether the two tools should converge on one width, and if not, record why the split is intentional; update the shared scaffold/templates and every existing repository together rather than leaving the mismatch undocumented.
