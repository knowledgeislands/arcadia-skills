---
id: KI-HARNESS-GOV-026
title: Allow declared owned-file variation
area: GOV
theme: governance-consistency
horizon: now
status: done
blocks: [KI-HARNESS-OPS-004]
blocked-by: []
baseline-ref: 35647f7de1cd48dc086f7fbd4904e005c86bfb9d
---

## Goal

Keep wholly owned configuration canonical while protecting a repository from a destructive conform action when it has an evidenced exception. A declared exception must remain visibly non-conforming and prompt alignment to the standard; it must not become a second canonical template.

## Context

`ki-authoring` owns `.editorconfig` and `.rumdl.toml` wholly under SHAPE-16. The premise is stated in the skill: neither file has legitimate per-repository content, so CONFORM scaffolds either when missing and transactionally overwrites a regular file on drift, and AUDIT hash-compares each against the house template.

`kit-legal` disproves the premise. Its `.rumdl.toml` retains evidenced local settings for intentional transcript annotations and the known unsafe `MD075` table autofix. The repository mirrors source evidence, so a routine configuration overwrite must not remove that protective setting.

`ki repo audit --skill ki-authoring` already reports that repository's `.rumdl.toml` as drifted. The remedy the finding names is `ki repo conform --skill ki-authoring`, which would overwrite the file and remove the disables. The hazard is therefore not hypothetical and not idle: the audit actively directs a maintainer toward the destructive action, and the file's protective content is invisible to the contract.

The same repository also enables `MD005` and `MD056`, which the house template disables, because its documents were fixed rather than its configuration. That is a divergence in the opposite direction and equally undeclared — a repository ahead of the template rather than behind it.

## Boundary

This item owns the ownership contract for wholly owned files: how a repository declares an exceptional safety boundary, how AUDIT distinguishes a declared exception from ordinary drift, and what CONFORM does when one is declared. It covers `ki-authoring`'s two owned files and any other skill that owns a file wholly under the same premise.

It does not decide any individual repository's rule set. Whether Kit Legal's current settings remain justified is that repository's judgement, already recorded in its own configuration; this item makes the safety boundary expressible rather than adjudicating it.

It does not change the default. A repository that declares nothing keeps today's behaviour exactly: hash comparison against the template, and transactional overwrite on drift. An exception is opt-in, must state its reason, remains a WARN with an explicit recommendation to return to the template, and suppresses only the destructive write for its named file. It is not a conformed variant, a PASS result, or a general-purpose per-repository configuration layer.

## Current state

`OWN-1` compares each owned file against its template by hash and reports drift as a WARN. `OWN-2` removes retired files. `CONFORM` prepares early transactional writes for owned files, refusing unsafe file types and declining to write through a symlink.

`.ki-config.toml` already carries a bare table for each declared skill, so an exception declaration has an obvious home and needs no new file. `ki-repo` owns that configuration contract.

The registered estate has twenty-five repositories. The exception mechanism has one declared consumer: Kit Legal's `.rumdl.toml`.

## Locked decisions

- The declaration lives only in the owning skill's table, as a TOML subtable: `[skills.ki-authoring.owned_file_exceptions]`. Its keys are exact currently owned filenames and its values are non-empty reasons; for example, `".rumdl.toml" = "Preserves verbatim correspondence…"`.
- A declared drift is still a `WARN`, naming the file, its reason, and the expectation to return to the house template. It is not a PASS, a second template, or a rule-delta schema.
- A declaration for a canonical file is also a `WARN`, instructing the repository to remove the now-stale declaration. A declaration never suppresses scaffolding of a missing file or safety handling of an unsafe path.
- CONFORM skips only a regular, drifted file with a valid declared exception. It does not replace, merge, or otherwise interpret the file's content; all other owned-file states keep the existing behaviour.

## Execution plan

1. Extend the Authoring owned-file context to validate `owned_file_exceptions` from its own resolved configuration: recognise only currently owned filenames with non-empty reason strings, and retain the declaration alongside each file's evidence.
2. Make `OWN-1` distinguish declared drift, stale declarations, malformed declarations, and ordinary drift. Preserve the existing WARN level and default remediation for every undeclared or invalid case.
3. Change OWN-1 CONFORM preparation so only a valid declared exception on a regular drifted file suppresses its synchronisation write. Add focused context and catalogue tests for audit messages, unknown keys, stale declarations, unsafe or missing files, and proposed writes.
4. Document the narrowly scoped configuration shape in `ki-authoring` and the shared configuration contract, then regenerate the Authoring rubric publication.
5. Add Kit Legal's `.rumdl.toml` exception with its evidence-preservation reason. Inspect the dry-run proposal; run the targeted conform only after a clean preflight. If preflight is not clean, record the safe stop and prove the dry run excludes `.rumdl.toml`.
6. Run focused tests, generated-rubric parity, the relevant Harness audits and gates, then audit the registered estate's Authoring declarations. Record the baseline, commits, verification, and remaining warnings in the review packet.

## Stop conditions

Stop and return for a decision if the host cannot provide the owning skill's resolved configuration without parsing another skill table; if a declaration would require a local replacement template, arbitrary rule deltas, or suppression of a missing or unsafe file repair; if kit-legal is not clean before the targeted conform; or if the dry run proposes any write to kit-legal's `.rumdl.toml`.

## Steps

- [x] Define the smallest declaration: a named wholly owned file and a reason explaining the safety or external-contract constraint. Do not model arbitrary rule deltas or a locally canonical replacement template.
- [x] Require the reason string to travel with the declaration, so the exception is reviewable and re-considered rather than surviving as an unexplained repository preference.
- [x] Teach `OWN-1` to report a declared exception as a distinct WARN: show the reason and exact template drift, recommend return to the house template, and continue to report any undeclared difference as ordinary drift.
- [x] Teach CONFORM to skip the named declared file entirely. It must retain the existing protective configuration for subsequent Markdown commands; it must not overwrite it, apply a template delta, or claim the file now conforms.
- [x] Declare Kit Legal's `.rumdl.toml` exception with its evidence-preservation reason. Its preflight is not clean, so the stop condition correctly prevents a targeted conform; the dry run excludes `.rumdl.toml`.
- [x] Run focused tests, generated-rubric parity, relevant Harness gates, and a full registered-estate audit. Record the baseline, commits, and remaining warnings in the review packet.

## Files touched

`skills/governance/ki-authoring/scripts/rubric/items/owned.ts` for the comparison and conform boundary, `contexts/authoring.ts` for the owned-file model, and `SKILL.md` where the wholly-owned premise is stated.

`skills/governance/ki-repo/references/` for the `.ki-config.toml` contract, since the declaration's key belongs to that skill's model rather than this one's.

`kit-legal`'s `.ki-config.toml`, to carry the first declaration.

## Verify

`ki repo audit --skill ki-authoring` reports Kit Legal's declared exception as an explicit WARN with its reason and a recommendation to align. The dry-run proposal excludes `.rumdl.toml`. Kit Legal's preflight remains unclean, so the targeted conform is deliberately not run: the stop condition prevents the destructive action rather than treating a clean report as a safety proof.

An undeclared change to an owned file is still reported as drift, proven by focused context and catalogue tests. The estate audit reports independently on every other repository rather than treating the first declaration as a fleet-wide allowance.

## Dependencies / blocks

Nothing blocks this item. It is sequenced ahead of any further `ki repo conform --skill ki-authoring` run in `kit-legal`, which would remove the disables today.

## Review

Delivered the narrow `owned_file_exceptions` configuration shape and the `OWN-1` / CONFORM behaviour in `9bf329c3`. The declaration validates only named, currently wholly owned files with non-empty reasons; declared drift remains a WARN and CONFORM omits only that otherwise-regular drifted file.

Kit Legal declares `.rumdl.toml = "Preserves intentional evidence annotations and prevents unsafe MD075 autofix corruption."` in commit `60a95f84`. Its audit reports that reason as an actionable exception WARN, and `ki repo conform --skill ki-authoring --dry-run` no longer proposes that file. Its Markdown and repository preflight remains unclean, so no write-mode conform was run.

Focused Authoring tests, generated rubric parity, TypeScript, the harness test suite, and the relevant Harness audits passed during implementation. The 2026-08-09 estate sweep covered all twenty-five registered repositories. It found the expected Kit Legal exception, plus unrelated Markdown debt there and an undeclared `.rumdl.toml` drift warning in Valle Armonia Website. It also exposed a separate, widespread `claude-desktop` runtime-name regression; that estate issue is not an owned-file exception.

## Done

Accepted by the user on 2026-08-10 after review of the delivered boundary, verification, and known estate findings.

## Discussion

### Why not simply add the local settings to the house template

Changing the house template estate-wide would spend coverage everywhere to serve one repository's evidence-preservation constraint. The premise that every repository wants the same Markdown rules is exactly what fails here.

### Why not drop the file from `ki-authoring`'s ownership

Whole-file ownership is what makes the estate's Markdown enforcement uniform. The problem is that the contract offered only two operational responses — overwrite or leave a dangerous drift — where a third is needed: protect the named file while keeping its departure visibly exceptional.

### Why not make a declared variation pass

A PASS would make each repository's preference as authoritative as the shared standard, encouraging local templates to accumulate without a strong reason to remove them. The declaration instead prevents destructive automation but preserves the standard's expectation: the exception stays visible, carries its reason, and is reviewed as work to eliminate when the constraint changes.

### Why the reason belongs in the declaration

A disable exists because of a specific constraint, and an unexamined one outlives its cause. `ki-authoring` REFRESH already re-tests each disabled rule against a recorded reproduction. A declaration without a stated reason would reintroduce the problem that mechanism exists to prevent.
