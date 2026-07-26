# CLI-004 rubric-contract handover — gate met

**Origin:** `knowledgeislands/tools-ki` CLI-004 tranche T1.

**Recipient:** `knowledgeislands/ki-agentic-harness` FND-004 (Codex). This repository owns adoption, priority, and execution of the conversion.

## What is delivered and where

The tools-owned governed-rubric runtime is on `tools-ki` `main` (through commit `d780107`). The authoritative contract is `tools-ki/src/core/rubric.ts`: each rubric-bearing skill provides `scripts/rubric/index.ts`, default-exporting a `SkillRubricDefinition` with `contract: 1`. Bun imports the TypeScript as it stands — no compile, transpile, or bundle step. Context builders are read-only; repairs declare serialisable `RepairWrite` proposals; the host owns the one transaction and derives `FIXED` from its post-publication re-audit. Reporter, progress, and rubric.md rendering are host-owned: `ki skill rubric <name>` is the drift gate, `ki skill rubric <name> --write` regenerates `references/rubric.md` through a dev-linked payload.

## Conversion recipe (per skill, first slice `ki-handoffs`)

1. Reshape `scripts/rubric/` so `index.ts` default-exports the contract-1 definition (families → items; phases `PREPARE`/`INSPECT`/`PRIMARY`/`DERIVED`/`NORMALISE`; judgment items as data with prompts; repairs returning `{ writes: [{ path, content }] }` — never writing).
2. Delete the skill's `govern.ts`, `publish.ts`, and `scripts/vendored/ki-skills/` copies; the generic engine now lives in `tools-ki` (`runtime.ts`, `runtime-loader.ts`, `rubric-render.ts`).
3. Regenerate `references/rubric.md` with `ki skill rubric <skill> --write` from the dev-linked checkout, and adopt the read-only `ki skill rubric <skill>` drift check in this repository's gate.
4. Verify with `ki repo audit` / `ki repo conform --dry-run` against this repository; the current `does not provide a native rubric definition` error clears per converted skill.

## Environment

Use the locally built `ki` from the `tools-ki` checkout at `main` (no release or tag exists yet, per CLI-004's scope) with `ki dev on <this checkout>` linking the payload.

## Waking dependencies

`tools-ki` T1.5 (proof against the canonical payload) and T1.6 (surface alignment) unblock when `ki-handoffs` speaks contract 1. Non-blocking in both directions otherwise; acceptance evidence for the runtime is already committed in `tools-ki` (`src/tests/cli/repo.test.ts`, `transaction.test.ts`, `skill-rubric.test.ts`).
