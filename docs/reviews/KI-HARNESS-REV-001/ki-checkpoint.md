# `ki-checkpoint` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised
- **Identity:** position 21 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-checkpoint` independently owns the closed active/retired record contract under `+/_CHECKPOINTS/`; `ki-repo` owns the generic `+/` structure but does not interpret this specialist area. Its explicit-authority, portable reconstruction boundary is valuable when a fresh agent or runtime cannot safely access a vendor session. Current runtimes also provide native resume and compaction, so the checkpoint should remain an opt-in portable artifact rather than ceremony for ordinary continuation.

The six-section schema and strict lifecycle are predictable, but there is no sample corpus, reconstruction trial, assisted-versus-baseline result, or evidence that all fields outperform a smaller task-and-next-step record.

## Mechanical trace and limits

The catalogue maps publication, configuration, structure, record, lifecycle, and boundary families. The hosted audit and publication check pass, but this repository deliberately has no active checkpoint area, so that result is structural and not-applicable evidence rather than proof of successful resumption.

The inspector has useful safety properties: it rejects symlinks, non-regular or nested files, wrong state/location, timestamp inversions, duplicate identities, active/retired collisions, and closed-schema violations. CONFORM does not author checkpoint content, and UPDATE/RETIRE require explicit authority.

Material gaps remain:

- The non-trivial inspector has no focused tests or eval scenarios.
- “Substantive content” means non-empty text, not concise, current, or reconstructable state.
- Transcript/session exclusion uses finite key, filename, and prose heuristics, so it can miss alternate locators or flag benign text.
- RESUME, UPDATE, and RETIRE are agent procedures, not current `ki repo` commands; the host exposes audit, conform, and educate only.

## Source authority

The source record's “Knowledge Islands checkpoint practice” is not a reproducible primary source. Current Codex documentation supports native `/resume` and compaction, which reinforces the need to distinguish portable reconstruction from vendor continuity but does not establish the portable checkpoint contract. The asserted proven house practice needs a local decision, tested exemplar, or other primary record.

## Candidate improvements

1. Add contained lifecycle and negative fixtures for absent scope, unsafe paths, YAML/schema failure, identities, timestamps, active/retired collisions, nested paths, transcript-locator heuristics, host-visible outcomes, and no authored CONFORM writes.
2. State plainly that RESUME, UPDATE, and RETIRE are agent procedures unless a host command is implemented.
3. Replace the unlocatable house-practice citation with a reproducible decision, exemplar, or outcome trial.
4. Test a fresh-agent reconstruction task before expanding the standing schema or automatic runtime integration.

## Carry-forward criteria

Runtime-adapter and Stop-hook reviews must prove no-write behaviour under uncertainty, preserve explicit thread selection and user authority, and use native session semantics only as supporting runtime evidence. Every lifecycle claim must distinguish a readable procedure from host-executable behaviour.

## Local evidence

- `skills/governance/ki-checkpoint/SKILL.md`
- `skills/governance/ki-checkpoint/references/standards-checkpoints.md`
- `skills/governance/ki-checkpoint/references/sources.md`
- `skills/governance/ki-checkpoint/scripts/rubric/contexts/checkpoints.ts`
- `skills/governance/ki-checkpoint/scripts/rubric/items/index.ts`
- `skills/keystone/ki-repo/scripts/rubric/contexts/audit.ts`
- `.ki-config.toml`
- `docs/roadmap/KI-HARNESS-RTP-006-define-stop-checkpoint-hook.md`
