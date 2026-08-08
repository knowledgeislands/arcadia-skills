---
id: KI-HARNESS-GOV-021
title: Simplify repository configuration layout
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 729cfb8772d06e44b88d8c221950f5fd2fd2a774
---

## Goal

Replace the fully-qualified `.ki-config.toml` skill-declaration key with a repository-level harness list and bare-name `[skills.<name>]` tables, so a single-harness repository names its harness once instead of once per skill.

## Context

The current contract requires every skill declaration to be a quoted `["<harness-id>:<skill-name>"]` table. In a typical repository the prefix `knowledgeislands/ki-agentic-harness:` repeats sixteen times and consumes roughly a third of the file; the Harness's own configuration repeats it more often still. Nested configuration compounds the cost, because `["knowledgeislands/ki-agentic-harness:ki-roadmap".themes]` spends fifty-six characters to name roadmap themes in the quoted-key and dotted-key combination that is the least familiar corner of TOML syntax. A qualified identity contains a colon and a slash, neither of which TOML permits in a bare key, so every declaration must be quoted even though the specification advises bare keys except where quoting is necessary.

The format also conflates declaring a skill with configuring it, so an intentionally empty table cannot be distinguished from an abandoned stub, and there is no structural separation between a skill table and a repository-level setting belonging to no skill. `ki-trades` demonstrates the failure concretely: in several repositories it carries no root table at all and is declared only implicitly by its `.exports_to` and `.imports_from` sub-tables, so deleting those sub-tables would silently undeclare the skill rather than leave it declared and unconfigured.

The revised layout declares harness resolution once in a `[repo]` table holding `harnesses` as a list, names skills under `[skills.<name>]` resolved against that list, and reaches nested configuration as `[skills.ki-roadmap.themes]`. A skill drawn from a harness outside the declared list keeps a fully-qualified quoted key, so the exceptional case stays visibly exceptional. Resolving a bare name against the declared list must bind exactly one provider, report that no declared harness provides the skill when there is none, and require explicit qualification when more than one does. Resolution uses the declared list rather than whichever harnesses happen to be installed, so a version-controlled file means the same thing on every machine.

The same repetition appears inside the trade route declaration, which keys routes first by direction and then by kind, naming a partner repository once for every kind and direction it participates in. Keying routes by partner instead names each partner once and carries its kinds as arrays, makes the whole relationship with one repository readable on a single line, lets TOML's own prohibition on defining a key twice reject a duplicated partner in place of the hand-written uniqueness and lexical-ordering check applied to each list separately, and removes the explicit empty array a direction needs when it carries no kinds.

## Boundary

This item owns the contract text, the rubric criteria, and the migration of every existing `.ki-config.toml` in the estate. It does not change the host parser, skill resolution, capability status reporting, or the declare/undeclare paths in `tools-ki`; that implementation lands as a separate item in that repository. It does not introduce a compatibility shim, dual-path parser, or transition period. The cutover is nonetheless ordered rather than arbitrary, because the two directions fail differently and only one of them is safe. An unmigrated file under the new parser fails loudly, as a bare table name is rejected as unqualified. A migrated file under the old parser does not: `looksLikeSkill` accepts a key only when it begins `ki-` or contains a colon, so `repo` and `skills` match neither and every declaration is silently dropped — verified as `0 skills selected`, `FAIL=0`, exit `0`, a green audit that checked nothing. The host parser must therefore land before any `.ki-config.toml` is migrated, and a repository must never be left migrated against an older executable. It does not change which skills any repository declares, nor the meaning of any skill's own configuration keys.

## Current state

`ki-repo` defines the `.ki-config.toml` contract in terms of the fully-qualified quoted key, and `ki-trades` documents its routes as `exports_to` and `imports_from` sub-tables of that key. Twenty-four `.ki-config.toml` files exist across the estate: fifteen under `knowledgeislands`, and nine outside it in `kit-hnr`, `kit-legal`, `kit-pkb`, `kit-midnight.ninja`, `er-research`, `kit-techmedix`, `vallearmonia-principal`, `vallearmonia-website`, and the chezmoi repository. Every one of them uses the current form and must be rewritten in the same pass.

The two shape questions the source trade explicitly handed to this repository are settled under Discussion: routes key on `owner/name`, and a route is an inline table.

The harness half is delivered. The contract, the trade route shape, the rubric criteria and their regenerated publications, every rubric context's lookup, seventy-six guidance documents, and this repository's own `.ki-config.toml` are all on the new layout, and `ki repo audit` reports `PASS=21 WARN=0 FAIL=0` against it under the landed parser.

`KI-TOOL-CLI-025` landed in `tools-ki` while this was in progress, which reordered the work rather than blocking it: the parser began rejecting the old shape mid-change, so this repository's migration became required to commit at all rather than a step to schedule. What remains is the other twenty-three repositories, each of which now fails loudly under `ki` until it is migrated.

Three lookups turned out to be regex literals rather than the indexed constants the survey found — `declaredTables` in `ki-repo`, `declaredSkillNames` in `ki-engineering`, and the `ki-harness` marker probe. Each matched the qualified spelling textually, and each failed by reporting nothing rather than by erroring, which is the same quiet-miss class this contract exists to remove.

## Steps

- [x] Settle the two open shape questions — route key form and inline versus nested route table — and record the decision and its reasoning under Discussion.
- [x] Rewrite the `.ki-config.toml` contract in `ki-repo` to specify `[repo].harnesses`, bare `[skills.<name>]` declarations, nested `[skills.<name>.<sub>]` configuration, and quoted `[skills."<harness-id>:<name>"]` only for a provider outside the declared list.
- [x] State the resolution rule in the contract: a bare name binds exactly one declared provider, no provider is an error, more than one provider requires explicit qualification, and resolution consults the declared list rather than installed harnesses.
- [x] Rewrite the `ki-trades` route declaration in its standard to the partner-keyed `[skills.ki-trades.routes]` shape with `export` and `import` kind arrays, and remove the now-redundant hand-written uniqueness and lexical-ordering requirement that TOML's duplicate-key prohibition supersedes.
- [x] Update the `ki-repo` and `ki-trades` rubric criteria and their generated publications to check the new shape, and delete every criterion that asserts the qualified-key form.
- [x] Decide how a rubric context locates its configuration, and record the choice under Discussion. Sixteen contexts today re-parse `.ki-config.toml` themselves and index it by a hard-coded qualified constant, several also reading another skill's table — `ki-trades` reads `ki-repo`'s to obtain the repository identity. Settled: each context indexes `skills.<name>` directly.
- [x] Apply that decision to all sixteen contexts, including their cross-skill reads, so no skill hard-codes a harness identity to find configuration.
- [x] Update every example, snippet, and cross-reference in the skill catalogue and repository documentation that shows a qualified declaration key.
- [x] Migrate this repository's own `.ki-config.toml`, giving each implicitly-declared skill an explicit root table and naming each trade partner once.
- [ ] Migrate the remaining twenty-three `.ki-config.toml` files in the estate. Each fails loudly under the landed parser until it is, so this is recoverable rather than silent, but every one of those repositories is unusable through `ki` meanwhile.
- [x] Raise the corresponding host implementation item in `tools-ki` and confirm its sequencing against this repository's migration.

## Files touched

- `skills/keystone/ki-repo/` — the `.ki-config.toml` contract text, its rubric criteria, and generated publication.
- `skills/governance/ki-trades/` — the route declaration shape in `references/standards-trades.md`, its rubric criteria, and generated publication.
- `skills/*/*/scripts/rubric/contexts/` in sixteen skills — `ki-checkpoints`, `ki-decision-records`, `ki-engineering`, `ki-homebrew-tap`, `ki-housekeeping`, `ki-kb`, `ki-kb-live-artifacts`, `ki-kb-streams`, `ki-mcp`, `ki-plugins`, `ki-repo`, `ki-roadmap`, `ki-specifications`, `ki-trades`, `ki-website`, and `ki-website-cloudflare` — each of which hard-codes its own qualified table name as a string constant and uses it to locate its configuration at runtime. These are executable lookups, not examples, and every one stops resolving the moment the key shape changes.
- Every other skill or document in this repository that reproduces a qualified declaration key in an example.
- `.ki-config.toml` in this repository and in the twenty-three other repositories named under Current state.

## Verify

- `ki repo audit --skill ki-repo` and `ki repo audit --skill ki-trades` pass clean in this repository against the migrated file.
- No tracked file in this repository contains a `["<owner>/<repo>:` table header outside a deliberate example of the out-of-list exception.
- Every migrated `.ki-config.toml` declares each skill it configures with an explicit root table, so no declaration survives only as a side effect of a sub-table.
- Every declared route in a migrated file appears exactly once per partner, and no direction carries an explicit empty array.

## Dependencies / blocks

The host parser, skill resolution, capability status reporting, and declare/undeclare implementation land in `tools-ki` as `KI-TOOL-CLI-025`, authored in parallel with this item. That repository owns its own priority, plan, and execution; this item does not block on it, because the contract, rubric, and estate migration are authored here and the two repositories coordinate their cutover explicitly rather than through a blocking dependency.

The plan is approved and this item is `ready`, but two things are deliberately still open inside it and should not be mistaken for oversights at implementation time.

The first is an ordering gate rather than a blocking dependency, and it is operational: the estate migration step must not run until `KI-TOOL-CLI-025` has landed and the machine's installed `ki` parses the new layout. Confirm that directly before migrating any file, because the failure mode in this direction is silent — a migrated file under an older executable selects nothing and reports a green audit. Every other step here is safe to take before the parser exists, because contract text, rubric criteria, and context lookups are all local and none of them changes a file the current parser reads.

The second was the sixth step's context-lookup decision, now settled under Discussion.

The consumer cost belongs in that counterpart's assessment rather than here: today a declaration's identity is read literally from the table header, and under a bare-name layout it can only be derived once resolution has bound a provider, so the parsed declaration and the resolved skill become distinct shapes. The parser, skill declaration, and skill undeclaration each become simpler, so the cost concentrates in identity derivation rather than spreading across the consumer.

## Discussion

### How a rubric context locates its configuration

Each context indexes `skills.<name>` directly, rather than the host resolving the declared list once and handing each session its own table.

The argument for the host-resolved option was that it removes the harness identity from skill code entirely. It turns out the smaller change removes it just as completely, because the sixteen contexts already re-parse `.ki-config.toml` for themselves — none of them receives its configuration from the host today. So the constant each one holds goes from `'knowledgeislands/ki-agentic-harness:ki-mcp'` to `'ki-mcp'`, and the harness identity is gone from skill code either way. The distinguishing benefit was not distinguishing.

What remains is cost, and it falls the other way. Host-resolved plumbing would have to reach every session, plus a second channel for the cross-skill reads — `ki-trades`, `ki-housekeeping`, `ki-decision-records`, and `ki-roadmap` all read `ki-repo`'s table for the repository identity — and all of it lands in `tools-ki`, widening the counterpart item for a benefit the local change already delivers. Direct indexing is a one-line change per context and keeps skill-side concerns skill-side.

The failure mode argued for host resolution is unchanged by this choice and is answered elsewhere: a context that indexes a key the file no longer uses resolves to nothing silently. That is why `KI-TOOL-CLI-025` makes an unmigrated file a loud parse failure, so the window in which a lookup could silently miss is a window in which `ki` refuses to run at all.

### Why the context lookup is the substantial half

The contract change is small — a key shape and a resolution rule. The cost sits in the sixteen rubric contexts that locate configuration by a hard-coded qualified string, because each is an executable lookup that silently resolves to nothing the moment the key changes: a skill would not fail loudly, it would behave as though it had no configuration at all. That failure mode is the argument for the host-resolved option, which makes the harness identity unreachable from skill code rather than merely unused.

### Source

This item adopts `TRD-aacc8a12`.

### Why no compatibility period

Per this repository's current-state migration rule, the contract is made correct and every existing footprint is conformed to it in the same pass. No compatibility period is not the same as no ordering, and an earlier draft of this section conflated them: it claimed a partially-migrated estate cannot quietly misbehave, on the strength of the unmigrated-file-under-new-parser direction failing loudly. That is only one of the two directions, and the other is the dangerous one. The Boundary records the verified behaviour — a migrated file under the old parser drops every declaration silently and reports a green audit that checked nothing. So the estate can quietly misbehave, in exactly one direction, which is why the parser lands first and why no repository is ever left migrated against an older executable.

### Declaring a skill separately from configuring it

TOML creates a super-table implicitly, so `[skills.ki-roadmap]` before `[skills.ki-roadmap.themes]` is optional. Stating it explicitly is a convention this contract adopts anyway, because it is precisely what makes a declaration independent of whether the skill happens to carry configuration — the distinction the current `ki-trades` implicit declaration loses.

### Settled shape questions

Trade records identify a repository as `owner/name` while route declarations use a canonical HTTPS URL, so keying routes by repository forced a choice between matching the record form and keeping the host inside the key. Separately, an inline table suits a route that carries only its kinds, but the specification intends an inline table to occupy a single line and discourages breaking one across lines in favour of a standard table, so a route that later gained a per-partner property would have to convert to a nested table header. Both are settled here, and they turn out to interlock: the first defuses the objection to the second.

**Routes key on `owner/name`.** This is the form trade records already use, and it is the form the working areas already lay out on disk — an outbound record for this partner lives at `+/_TRADES/knowledgeislands/tools-ki/`, so the key and the path become the same string rather than two spellings of one fact that can drift apart. A host is how a repository is reached, not who it is, and putting it inside an identity key means a partner that moves host acquires a new identity. Nothing new is needed to make this work, because the estate already treats `owner/name` as sufficient identity: a trade record names its `sender` and `receiver` in exactly that form and carries no host at all, so a route key in the same form is resolved by the machinery that already resolves those. A partner that genuinely sits elsewhere keeps a full URL as its key, which is the same exception shape the skill list already uses for a provider outside the declared harnesses — the exceptional case stays visibly exceptional, and it stays exceptional in exactly one way across both parts of the contract.

**Routes are inline tables.** A route carries only its kinds, and naming the whole relationship with one repository on a single line is the stated point of keying by partner; a nested header per partner spends three lines to say what one says. The objection was that a later per-partner property would force conversion to a standard table whose header key is a full URL — but under the decision above that header is `[skills.ki-trades.routes."knowledgeislands/tools-ki"]`, which is ordinary rather than unwieldy. The conversion is also mechanical and local to one partner, and it is the conversion TOML intends rather than a workaround. Choosing the short form now and paying a small, well-signposted cost later is better than paying the long form on every partner forever against a property that may never arrive.

Together these give the route shape below, where TOML's own prohibition on defining a key twice rejects a duplicated partner, and a direction that carries no kinds is simply absent rather than declared empty.

```toml
[repo]
harnesses = ["knowledgeislands/ki-agentic-harness"]

[skills.ki-trades.routes]
"knowledgeislands/tools-ki" = { export = ["work"], import = ["work", "knowledge"] }
"knowledgeislands/ki-specifications" = { import = ["knowledge"] }
```
