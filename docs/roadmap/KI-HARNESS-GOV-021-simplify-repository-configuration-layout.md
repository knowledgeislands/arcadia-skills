---
id: KI-HARNESS-GOV-021
title: Simplify repository configuration layout
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Replace the fully-qualified `.ki-config.toml` skill-declaration key with a repository-level harness list and bare-name `[skills.<name>]` tables, so a single-harness repository names its harness once instead of once per skill.

## Context

The current contract requires every skill declaration to be a quoted `["<harness-id>:<skill-name>"]` table. In a typical repository the prefix `knowledgeislands/ki-agentic-harness:` repeats sixteen times and consumes roughly a third of the file; the Harness's own configuration repeats it more often still. Nested configuration compounds the cost, because `["knowledgeislands/ki-agentic-harness:ki-roadmap".themes]` spends fifty-six characters to name roadmap themes in the quoted-key and dotted-key combination that is the least familiar corner of TOML syntax. A qualified identity contains a colon and a slash, neither of which TOML permits in a bare key, so every declaration must be quoted even though the specification advises bare keys except where quoting is necessary.

The format also conflates declaring a skill with configuring it, so an intentionally empty table cannot be distinguished from an abandoned stub, and there is no structural separation between a skill table and a repository-level setting belonging to no skill. `ki-trades` demonstrates the failure concretely: in several repositories it carries no root table at all and is declared only implicitly by its `.exports_to` and `.imports_from` sub-tables, so deleting those sub-tables would silently undeclare the skill rather than leave it declared and unconfigured.

The revised layout declares harness resolution once in a `[repo]` table holding `harnesses` as a list, names skills under `[skills.<name>]` resolved against that list, and reaches nested configuration as `[skills.ki-roadmap.themes]`. A skill drawn from a harness outside the declared list keeps a fully-qualified quoted key, so the exceptional case stays visibly exceptional. Resolving a bare name against the declared list must bind exactly one provider, report that no declared harness provides the skill when there is none, and require explicit qualification when more than one does. Resolution uses the declared list rather than whichever harnesses happen to be installed, so a version-controlled file means the same thing on every machine.

The same repetition appears inside the trade route declaration, which keys routes first by direction and then by kind, naming a partner repository once for every kind and direction it participates in. Keying routes by partner instead names each partner once and carries its kinds as arrays, makes the whole relationship with one repository readable on a single line, lets TOML's own prohibition on defining a key twice reject a duplicated partner in place of the hand-written uniqueness and lexical-ordering check applied to each list separately, and removes the explicit empty array a direction needs when it carries no kinds.

## Boundary

This item owns the contract text, the rubric criteria, and the migration of every existing `.ki-config.toml` in the estate. It does not change the host parser, skill resolution, capability status reporting, or the declare/undeclare paths in `tools-ki`; that implementation lands as a separate item in that repository. It does not introduce a compatibility shim, dual-path parser, or transition period: an unmigrated file already fails loudly because a bare table name is rejected as unqualified, which makes a single clean cutover safe. It does not change which skills any repository declares, nor the meaning of any skill's own configuration keys.

## Current state

`ki-repo` defines the `.ki-config.toml` contract in terms of the fully-qualified quoted key, and `ki-trades` documents its routes as `exports_to` and `imports_from` sub-tables of that key. Twenty-four `.ki-config.toml` files exist across the estate: fifteen under `knowledgeislands`, and nine outside it in `kit-hnr`, `kit-legal`, `kit-pkb`, `kit-midnight.ninja`, `er-research`, `kit-techmedix`, `vallearmonia-principal`, `vallearmonia-website`, and the chezmoi repository. Every one of them uses the current form and must be rewritten in the same pass.

Two shape questions the source trade explicitly hands to this repository are still open: whether routes key on the canonical HTTPS URL or on the `owner/name` form that trade records already use, and whether a route uses an inline table now and converts to a nested header if it ever gains a per-partner property, or adopts the longer header immediately.

## Steps

- [ ] Settle the two open shape questions — route key form and inline versus nested route table — and record the decision and its reasoning under Discussion.
- [ ] Rewrite the `.ki-config.toml` contract in `ki-repo` to specify `[repo].harnesses`, bare `[skills.<name>]` declarations, nested `[skills.<name>.<sub>]` configuration, and quoted `[skills."<harness-id>:<name>"]` only for a provider outside the declared list.
- [ ] State the resolution rule in the contract: a bare name binds exactly one declared provider, no provider is an error, more than one provider requires explicit qualification, and resolution consults the declared list rather than installed harnesses.
- [ ] Rewrite the `ki-trades` route declaration in its standard to the partner-keyed `[skills.ki-trades.routes]` shape with `export` and `import` kind arrays, and remove the now-redundant hand-written uniqueness and lexical-ordering requirement that TOML's duplicate-key prohibition supersedes.
- [ ] Update the `ki-repo` and `ki-trades` rubric criteria and their generated publications to check the new shape, and delete every criterion that asserts the qualified-key form.
- [ ] Update every example, snippet, and cross-reference in the skill catalogue and repository documentation that shows a qualified declaration key.
- [ ] Migrate all twenty-four `.ki-config.toml` files in the estate to the new layout, giving each implicitly-declared skill an explicit root table.
- [ ] Raise the corresponding host implementation item in `tools-ki` and confirm its sequencing against this repository's migration.

## Files touched

- `skills/keystone/ki-repo/` — the `.ki-config.toml` contract text, its rubric criteria, and generated publication.
- `skills/governance/ki-trades/` — the route declaration shape in `references/standards-trades.md`, its rubric criteria, and generated publication.
- Every other skill or document in this repository that reproduces a qualified declaration key in an example.
- `.ki-config.toml` in this repository and in the twenty-three other repositories named under Current state.

## Verify

- `ki repo audit --skill ki-repo` and `ki repo audit --skill ki-trades` pass clean in this repository against the migrated file.
- No tracked file in this repository contains a `["<owner>/<repo>:` table header outside a deliberate example of the out-of-list exception.
- Every migrated `.ki-config.toml` declares each skill it configures with an explicit root table, so no declaration survives only as a side effect of a sub-table.
- Every declared route in a migrated file appears exactly once per partner, and no direction carries an explicit empty array.

## Dependencies / blocks

The host parser, skill resolution, capability status reporting, and declare/undeclare implementation land in `tools-ki` as `KI-TOOL-CLI-025`, authored in parallel with this item. That repository owns its own priority, plan, and execution; this item does not block on it, because the contract, rubric, and estate migration are authored here and the two repositories coordinate their cutover explicitly rather than through a blocking dependency.

The consumer cost belongs in that counterpart's assessment rather than here: today a declaration's identity is read literally from the table header, and under a bare-name layout it can only be derived once resolution has bound a provider, so the parsed declaration and the resolved skill become distinct shapes. The parser, skill declaration, and skill undeclaration each become simpler, so the cost concentrates in identity derivation rather than spreading across the consumer.

## Discussion

### Source

This item adopts [TRD-aacc8a12](../../+/_TRADES/knowledgeislands/tools-ki/TRD-aacc8a12.md).

### Why no compatibility period

Per this repository's current-state migration rule, the contract is made correct and every existing footprint is conformed to it in the same pass. The cutover is unusually safe here because the failure mode is loud rather than silent: a bare table name is already rejected as unqualified by the current parser, so a partially-migrated estate cannot quietly misbehave.

### Declaring a skill separately from configuring it

TOML creates a super-table implicitly, so `[skills.ki-roadmap]` before `[skills.ki-roadmap.themes]` is optional. Stating it explicitly is a convention this contract adopts anyway, because it is precisely what makes a declaration independent of whether the skill happens to carry configuration — the distinction the current `ki-trades` implicit declaration loses.

### Open shape questions

Trade records identify a repository as `owner/name` while route declarations use a canonical HTTPS URL, so keying routes by repository forces a choice between matching the record form and keeping the host inside the key. Separately, an inline table suits a route that carries only its kinds, but the specification intends an inline table to occupy a single line and discourages breaking one across lines in favour of a standard table, so a route that later gained a per-partner property would have to convert to a nested table header whose key is a full URL. Both are decided in the first Step rather than assumed here.
