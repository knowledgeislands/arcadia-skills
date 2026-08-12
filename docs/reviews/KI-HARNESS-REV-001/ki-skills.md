# `ki-skills` effectiveness review

- **Position:** 1 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `62099310fb85f27d119cfb7eb8071743b5533d6b` plus current-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the capability and architecture, correct its source authority and stale evaluation evidence before grading.

## Mechanical conformance

`ki repo audit --skill ki-skills --repo .` passed with `FAIL=0 WARN=0`. The skill has a structured rubric, exact generated publication, shared `rubric` module, focused catalogue/session/portability/public-script/publication tests, and three behavioural scenarios.

Mechanical conformance establishes file and catalogue quality; it does not resolve the effectiveness or source-authority findings below.

## Current-source check

The [Agent Skills documentation index](https://agentskills.io/llms.txt) still lists nine pages, exactly matching the tracked Agent Skills set. The [portable specification](https://agentskills.io/specification) retains the required `name` and `description` fields, the existing limits, experimental `allowed-tools`, progressive disclosure, and the soft body budgets.

Material findings:

1. The portable specification does not define `disallowed-tools`. It is documented by the [Claude Code runtime overlay](https://code.claude.com/docs/en/skills), so [the current standard](../../../skills/keystone/ki-skills/references/standards-agent-skills.md) and `OPT-3` overstate its portable authority.
2. The Claude overlay now documents `background` for `context: fork`. The runtime-field inventory needs either to include it or record a deliberate exclusion.
3. The official [OpenAI skills documentation](https://learn.chatgpt.com/docs/build-skills) is a missing runtime overlay. It documents Codex listing budgets, path exposure, `.agents/skills` discovery, and `agents/openai.yaml`, including `allow_implicit_invocation`. OpenAI News is only a discovery source and does not cover this contract.
4. The OpenAI runtime loads name, description, and path in its initial listing, although implicit matching still depends on the description. The standard's absolute “only signal at selection time” wording is therefore not portable as written; “primary portable selection signal” is the supported claim.
5. The `skills-ref` README now labels the implementation demonstration-only and unsuitable for production. It remains useful validation evidence subordinate to the specification, not a production validator baseline.
6. The Anthropic engineering article was published on 2025-10-16 and updated for the open standard on 2025-12-18; the source record currently conflates the two dates.
7. Several Knowledge Islands claims cite the repository README even though that file does not state them. Their actual local decision or standard owner must replace the unsupported citation.
8. The source table is more recent than its `## Last review` prose. A future applied refresh must make the record internally coherent.

Community and discovery sources remain supporting evidence only. No newly reviewed discovery item justifies a portable rule by itself.

## Selection effectiveness

The [description](../../../skills/keystone/ki-skills/SKILL.md) has concrete user-language triggers for audit, review, extraction, optimisation, and refresh. It states the `SKILL.md` boundary and routes adjacent subagent, MCP, authoring, and Harness concerns to their owners. The whole-repository collision audit is clean.

This supports effective selection, but the standing description is close to the portable hard cap and lists many workflows. Its value currently outweighs that cost because these modes share one quality contract; no separate-skill extraction is justified by the evidence.

## Outcome effectiveness

The skill provides material Knowledge Islands knowledge that a general model cannot safely infer: host-first mechanical versus judgment review, composition and optional-augmentation boundaries, shared-module packaging, candidate routing, and the rubric/host ownership split. Its AUDIT and REVIEW procedures improve consistency and prevent deterministic checks from being re-derived in model prose.

The present behavioural evidence cannot prove the current contract. [`skills-shape`](../../../evals/scenarios/ki-skills.ts) rewards the retired base-coupled-extension pattern, so its historical “skill helped” result is negative evidence: the evaluation can score obsolete advice as improvement. The local matrix logs are also ignored by Git, absent from the immutable baseline, advisory, nondeterministic, and Claude-CLI-specific.

## Instruction economy

The 102-line `SKILL.md` routes detailed standards, rubric, exemplars, and mode procedures into on-demand references. The seven named modes still share enough model and vocabulary that splitting them would add selection cost without evidence of better outcomes. No orphan support file or unnecessary public command was found.

The largest economy risk is not body size but review ceremony: the judgment rubric is broad, so per-skill records must aggregate conforming criteria by evidence dimension rather than reproduce every criterion line when no exception exists.

## Architecture and ownership

`ki-skills` is the correct root owner for skill quality and the sole provider of the portable `rubric` compile-time module. Semantic family files own criterion policy; `ki` owns execution, reporting, transactions, and derived publication. REVIEW and EXTRACT are read-only discovery modes, and REFRESH is correctly restricted to the canonical Harness.

No dependency, naming, base coupling, or alternate automation shape should replace the skill. The source-authority and evaluation findings are repairs within the existing owner.

## Executability and safety

AUDIT begins with the hosted repository-scope checker and preserves exact findings. REVIEW and EXTRACT explicitly prohibit silent changes. CONFORM is bounded by rubric findings, and REFRESH stops outside the canonical Harness. No unsafe command, external side effect, or recovery gap was found in the selected procedures.

## Evidence and tests

Focused tests cover the structured catalogue, session construction, portability detection, script surfaces, shared-module contract, and generated publication. They establish implementation behavior, not real-world usefulness.

The existing behavioural scenarios cover shape, size, and linking, but one of three is stale and the harness does not establish current Codex behavior. There is no checked-in current result record. Effectiveness therefore remains supported by architectural evidence and known house-specific knowledge, with a material evaluation gap.

## Gaps and approval gates

- Current multi-runtime assisted-versus-baseline evidence is missing.
- The source refresh found normative wording and authority changes that require approval before editing the standard or rubric.
- No grade is assigned until the common grade vocabulary is approved.

## Proposed remediation

These proposals are not approved implementation:

1. Correct the source authority: reclassify `disallowed-tools`, decide how to represent `background`, add the official OpenAI overlay, qualify the selection-signal claim, demote `skills-ref`, fix the Anthropic date, and repair unsupported house citations.
2. Replace `skills-shape` with a scenario that distinguishes composition, optional augmentation, coverage detection, shared-module packaging, and declared-not-forked repository variation.
3. Add focused regression coverage proving that the retired extension pattern cannot be rewarded as conforming.
4. Regenerate current advisory evidence across supported runtime paths before grading.

No new skill, agent, hook, or shared module is proposed. These are direct amendments to the existing `ki-skills` owner and its evaluation evidence.

## Applied changes

**State:** applied in `ba4bd18a`.

Corrected portable versus runtime-specific authority, qualified the selection-signal claim, demoted demonstration-only sources, replaced the obsolete composition scenario, and added regression coverage for the retired extension pattern. Source records, standards, rubric publication, tests, and eval scenarios were aligned. Outcome effectiveness still awaits grading evidence.
