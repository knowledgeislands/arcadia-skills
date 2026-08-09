---
id: KI-HARNESS-GOV-026
title: Allow declared owned-file variation
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 35647f7de1cd48dc086f7fbd4904e005c86bfb9d
---

## Goal

Keep wholly owned configuration canonical while protecting a repository from a destructive conform action when it has an evidenced exception. A declared exception must remain visibly non-conforming and prompt alignment to the standard; it must not become a second canonical template.

## Context

`ki-authoring` owns `.editorconfig` and `.rumdl.toml` wholly under SHAPE-16. The premise is stated in the skill: neither file has legitimate per-repository content, so CONFORM scaffolds either when missing and transactionally overwrites a regular file on drift, and AUDIT hash-compares each against the house template.

`kit-legal` disproves the premise. It disables `MD029` and `MD030` because both rules edit the characters of quoted correspondence: a sender who restarted an ordered list at `2.`, or wrote `8.Does` with no space after the marker, wrote exactly that, and the repository mirrors messages verbatim against source transcripts held outside it. Both rules are fully autofixable, so the disables are the only thing standing between a routine `--fix` and rewritten evidence.

`ki repo audit --skill ki-authoring` already reports that repository's `.rumdl.toml` as drifted. The remedy the finding names is `ki repo conform --skill ki-authoring`, which would overwrite the file and remove the disables. The hazard is therefore not hypothetical and not idle: the audit actively directs a maintainer toward the destructive action, and the file's protective content is invisible to the contract.

The same repository also enables `MD005` and `MD056`, which the house template disables, because its documents were fixed rather than its configuration. That is a divergence in the opposite direction and equally undeclared — a repository ahead of the template rather than behind it.

## Boundary

This item owns the ownership contract for wholly owned files: how a repository declares an exceptional safety boundary, how AUDIT distinguishes a declared exception from ordinary drift, and what CONFORM does when one is declared. It covers `ki-authoring`'s two owned files and any other skill that owns a file wholly under the same premise.

It does not decide any individual repository's rule set. Whether `kit-legal` is right to disable `MD029` and `MD030` is that repository's judgement, already recorded in its own configuration; this item makes the judgement expressible rather than adjudicating it.

It does not change the default. A repository that declares nothing keeps today's behaviour exactly: hash comparison against the template, and transactional overwrite on drift. An exception is opt-in, must state its reason, remains a WARN with an explicit recommendation to return to the template, and suppresses only the destructive write for its named file. It is not a conformed variant, a PASS result, or a general-purpose per-repository configuration layer.

## Current state

`OWN-1` compares each owned file against its template by hash and reports drift as a WARN. `OWN-2` removes retired files. `CONFORM` prepares early transactional writes for owned files, refusing unsafe file types and declining to write through a symlink.

`.ki-config.toml` already carries a bare table for each declared skill, so an exception declaration has an obvious home and needs no new file. `ki-repo` owns that configuration contract.

Twenty-two repositories carry `.rumdl.toml`. Twenty-one match the house template. One does not, and its divergence is the case above.

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
5. Add kit-legal's `.rumdl.toml` exception with its evidence-preservation reason. Inspect the dry-run proposal, then run the targeted conform only after confirming its clean preflight; prove the file and its protective disables remain unchanged.
6. Run focused tests, generated-rubric parity, the relevant Harness audits and gates, then audit the estate's Authoring declarations. Record the baseline, commits, verification, and any remaining warning in the review packet.

## Stop conditions

Stop and return for a decision if the host cannot provide the owning skill's resolved configuration without parsing another skill table; if a declaration would require a local replacement template, arbitrary rule deltas, or suppression of a missing or unsafe file repair; if kit-legal is not clean before the targeted conform; or if the dry run proposes any write to kit-legal's `.rumdl.toml`.

## Steps

- [ ] Define the smallest declaration: a named wholly owned file and a reason explaining the safety or external-contract constraint. Do not model arbitrary rule deltas or a locally canonical replacement template.
- [ ] Require the reason string to travel with the declaration, so the exception is reviewable and re-considered rather than surviving as an unexplained repository preference.
- [ ] Teach `OWN-1` to report a declared exception as a distinct WARN: show the reason and exact template drift, recommend return to the house template, and continue to report any undeclared difference as ordinary drift.
- [ ] Teach CONFORM to skip the named declared file entirely. It must retain the existing protective configuration for subsequent Markdown commands; it must not overwrite it, apply a template delta, or claim the file now conforms.
- [ ] Declare `kit-legal`'s `.rumdl.toml` exception with its evidence-preservation reason, and confirm that its `MD028`, `MD029`, and `MD030` disables survive a `ki repo conform --skill ki-authoring` run.
- [ ] Re-run `ki repo audit --skill ki-authoring` across the estate: the other twenty-one repositories remain canonical, while Kit Legal carries only the explicit, actionable exception warning.

## Files touched

`skills/governance/ki-authoring/scripts/rubric/items/owned.ts` for the comparison and conform boundary, `contexts/authoring.ts` for the owned-file model, and `SKILL.md` where the wholly-owned premise is stated.

`skills/governance/ki-repo/references/` for the `.ki-config.toml` contract, since the declaration's key belongs to that skill's model rather than this one's.

`kit-legal`'s `.ki-config.toml`, to carry the first declaration.

## Verify

`ki repo audit --skill ki-authoring` reports Kit Legal's declared exception as an explicit WARN with its reason and a recommendation to align, while `ki repo conform --skill ki-authoring` there leaves its disables intact rather than removing them. This is the test that matters: conforming the repository must not be the thing that destroys the protection.

An undeclared change to an owned file is still reported as drift, proven by making one and seeing it fail.

The other twenty-one repositories are unchanged, confirmed by audit rather than assumed from the diff.

## Dependencies / blocks

Nothing blocks this item. It is sequenced ahead of any further `ki repo conform --skill ki-authoring` run in `kit-legal`, which would remove the disables today.

## Discussion

### Why not simply add the rules to the house template

Disabling `MD029` and `MD030` estate-wide would spend real coverage everywhere to serve one repository's constraint. Both rules catch genuine list defects in authored notes. The premise that every repository wants the same Markdown rules is exactly what fails here.

### Why not drop the file from `ki-authoring`'s ownership

Whole-file ownership is what makes the estate's Markdown enforcement uniform, and it works for twenty-one of twenty-two repositories. The problem is that the contract offers only two operational responses — overwrite or leave a dangerous drift — where a third is needed: protect the named file while keeping its departure visibly exceptional.

### Why not make a declared variation pass

A PASS would make each repository's preference as authoritative as the shared standard, encouraging local templates to accumulate without a strong reason to remove them. The declaration instead prevents destructive automation but preserves the standard's expectation: the exception stays visible, carries its reason, and is reviewed as work to eliminate when the constraint changes.

### Why the reason belongs in the declaration

A disable exists because of a specific constraint, and an unexamined one outlives its cause. `ki-authoring` REFRESH already re-tests each disabled rule against a recorded reproduction. A declaration without a stated reason would reintroduce the problem that mechanism exists to prevent.
