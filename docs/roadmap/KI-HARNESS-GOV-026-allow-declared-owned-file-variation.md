---
id: KI-HARNESS-GOV-026
title: Allow declared owned-file variation
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let a repository declare a justified departure from a wholly owned configuration file, so CONFORM stops silently overwriting a setting the repository needs and AUDIT can tell a declared variation from drift.

## Context

`ki-authoring` owns `.editorconfig` and `.rumdl.toml` wholly under SHAPE-16. The premise is stated in the skill: neither file has legitimate per-repository content, so CONFORM scaffolds either when missing and transactionally overwrites a regular file on drift, and AUDIT hash-compares each against the house template.

`kit-legal` disproves the premise. It disables `MD029` and `MD030` because both rules edit the characters of quoted correspondence: a sender who restarted an ordered list at `2.`, or wrote `8.Does` with no space after the marker, wrote exactly that, and the repository mirrors messages verbatim against source transcripts held outside it. Both rules are fully autofixable, so the disables are the only thing standing between a routine `--fix` and rewritten evidence.

`ki repo audit --skill ki-authoring` already reports that repository's `.rumdl.toml` as drifted. The remedy the finding names is `ki repo conform --skill ki-authoring`, which would overwrite the file and remove the disables. The hazard is therefore not hypothetical and not idle: the audit actively directs a maintainer toward the destructive action, and the file's protective content is invisible to the contract.

The same repository also enables `MD005` and `MD056`, which the house template disables, because its documents were fixed rather than its configuration. That is a divergence in the opposite direction and equally undeclared — a repository ahead of the template rather than behind it.

## Boundary

This item owns the ownership contract for wholly owned files: how a repository declares a variation, how AUDIT distinguishes a declared variation from drift, and what CONFORM does when one is declared. It covers `ki-authoring`'s two owned files and any other skill that owns a file wholly under the same premise.

It does not decide any individual repository's rule set. Whether `kit-legal` is right to disable `MD029` and `MD030` is that repository's judgement, already recorded in its own configuration; this item makes the judgement expressible rather than adjudicating it.

It does not change the default. A repository that declares nothing keeps today's behaviour exactly: hash comparison against the template, and transactional overwrite on drift. Variation is opt-in and must be justified in the declaration, so the common case stays strict.

## Current state

`OWN-1` compares each owned file against its template by hash and reports drift as a WARN. `OWN-2` removes retired files. `CONFORM` prepares early transactional writes for owned files, refusing unsafe file types and declining to write through a symlink.

`.ki-config.toml` already carries per-skill tables under fully-qualified `<harness-id>:<skill-name>` keys, so a declaration has an obvious home and needs no new file.

Twenty-two repositories carry `.rumdl.toml`. Twenty-one match the house template. One does not, and its divergence is the case above.

## Steps

- [ ] Decide the declaration's shape: whether a repository declares specific rules it adds to or removes from the template's `disable` list, or declares the whole file as locally owned with a stated reason.
- [ ] Prefer the narrower form if it is workable — a declared delta keeps AUDIT able to check everything else against the template, where whole-file ownership gives up all of it.
- [ ] Require a reason string in the declaration, so the justification travels with the repository rather than living only in a commit message.
- [ ] Teach `OWN-1` to apply the declared delta to the template before comparing, reporting undeclared difference as drift and declared difference as PASS.
- [ ] Teach CONFORM to write the template with the declared delta applied, so conforming a declared repository is safe rather than destructive.
- [ ] Declare `kit-legal`'s `MD028`, `MD029` and `MD030` disables and its `MD005` and `MD056` enables, and confirm its audit passes without weakening the check elsewhere.
- [ ] Re-run `ki repo audit --skill ki-authoring` across the estate and confirm the other twenty-one repositories are unaffected.

## Files touched

`skills/governance/ki-authoring/scripts/rubric/items/owned.ts` for the comparison, `contexts/authoring.ts` for applying a delta to the template, and `SKILL.md` where the wholly-owned premise is stated.

`skills/governance/ki-repo/references/` for the `.ki-config.toml` contract, since the declaration's key belongs to that skill's model rather than this one's.

`kit-legal`'s `.ki-config.toml`, to carry the first declaration.

## Verify

`ki repo audit --skill ki-authoring` passes in `kit-legal` with its disables intact, and `ki repo conform --skill ki-authoring` there leaves them in place rather than removing them. This is the test that matters: conforming the repository must not be the thing that destroys the protection.

An undeclared change to an owned file is still reported as drift, proven by making one and seeing it fail.

The other twenty-one repositories are unchanged, confirmed by audit rather than assumed from the diff.

## Dependencies / blocks

Nothing blocks this item. It is sequenced ahead of any further `ki repo conform --skill ki-authoring` run in `kit-legal`, which would remove the disables today.

## Discussion

### Why not simply add the rules to the house template

Disabling `MD029` and `MD030` estate-wide would spend real coverage everywhere to serve one repository's constraint. Both rules catch genuine list defects in authored notes. The premise that every repository wants the same Markdown rules is exactly what fails here.

### Why not drop the file from `ki-authoring`'s ownership

Whole-file ownership is what makes the estate's Markdown enforcement uniform, and it works for twenty-one of twenty-two repositories. The problem is that the contract offers only two states — identical or drifted — where a third is needed.

### Why the reason belongs in the declaration

A disable exists because of a specific constraint, and an unexamined one outlives its cause. `ki-authoring` REFRESH already re-tests each disabled rule against a recorded reproduction. A declaration without a stated reason would reintroduce the problem that mechanism exists to prevent.
