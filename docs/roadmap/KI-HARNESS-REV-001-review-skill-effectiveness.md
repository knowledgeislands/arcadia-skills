---
id: KI-HARNESS-REV-001
title: Review skill effectiveness
area: REV
theme: regular-reviews
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 94f0b775903286fcf37c0ec050d5568672a5154f
---

## Goal

Establish whether every canonical Harness skill still improves agent outcomes under current standards and runtimes, then produce an evidence-backed basis for grading, retention, revision, consolidation, or retirement.

## Context

The recent `ki-delegation` review showed that a skill can remain structurally compliant while no longer providing enough practical help to justify its instructions, loaded context, or workflow cost. The Harness therefore needs a whole-set effectiveness review that goes beyond mechanical conformance.

At this baseline the canonical `skills/` tree contains 50 skills. Forty-two carry a `references/sources.md`; eight do not. The declared `ki-depends-on` graph is shallow, while the current foundations-first synthesis order in ADR-KI-HARNESS-SKILLS-003 predates parts of the present catalogue. This review must use declared dependencies as hard ordering constraints, then use current ownership and foundations-first judgment to order otherwise independent skills.

This item is selected as the current top review priority. The roadmap model expresses that selection through `horizon: now`; it does not add a second ordinal-priority field.

## Boundary

Do not treat a clean rubric audit as proof that a skill is useful, award grades before evidence is collected, preserve a skill merely because it already exists, or change a reviewed skill while recording its REVIEW findings. Source refresh may update source records and confirmed normative contracts, but every effectiveness remediation remains a separately confirmed change or follow-up work item.

Do not require every process skill to acquire a source list. Where one is absent, decide whether the skill is fully derived from stable local governance or makes volatile external/runtime claims that need tracked sources.

## Review protocol

Apply the same evidence shape to every skill:

- **Standing-guidance extraction:** Before freezing the skill inventory, inspect `AGENTS.md`, `CLAUDE.md`, and `.agents/skills/ki-self/SKILL.md` paragraph by paragraph. Classify each instruction as necessary repository orientation, a repository-local delta, a runtime-specific delta, an existing skill's responsibility, or a reusable extraction candidate. Use the `ki-skills` candidate shape and require confirmation before moving or deleting guidance.
- **Current-source check:** Re-fetch every tracked source, reconcile documentation indexes where one is authoritative, update review dates and watch-items, and search primary or official discovery surfaces for material additions. Distinguish normative sources from supporting practice. For a skill without `references/sources.md`, record whether that absence remains appropriate.
- **Mechanical conformance:** Run the hosted `ki-skills` audit at repository scope and the skill's own focused audit and tests where available. Retain exact findings rather than re-deriving deterministic checks manually.
- **Selection effectiveness:** Test whether the description wins the intended user requests, avoids false activation, supplies reciprocal off-ramps, and remains worth its standing context cost.
- **Outcome effectiveness:** Ask whether following the skill materially improves correctness, safety, clarity, speed, or reuse compared with current model/runtime behaviour without the skill. Record negative evidence and unnecessary ceremony explicitly.
- **Instruction economy:** Inspect loaded body size, progressive disclosure, reference routing, repeated procedures, tool round-trips, and opportunities to remove, relocate, or automate deterministic detail.
- **Architecture and ownership:** Check scope, naming, portability, dependency truth, shared-module use, collisions, and whether the capability belongs as guidance, a reference, a script, another skill, an agent, or a hook.
- **Executability and safety:** Validate that commands, runtime assumptions, authority boundaries, stop conditions, recovery behaviour, and examples remain current and usable in supported environments.
- **Evidence and tests:** Examine rubric coverage, fixtures, false-positive and false-negative risk, and whether tests prove the contract that users actually depend on rather than only its file shape.
- **Disposition:** Produce one evidence-backed recommendation: retain, revise, consolidate, split, replace with a smaller automation shape, or retire. Route each confirmed candidate through the `ki-skills` candidate-finding contract; the review itself grants no remediation authority.

## Review sequence

Phase 0 audits the three standing instruction surfaces before the canonical skill list is frozen. The numbered skill sequence then satisfies every current `ki-depends-on` prerequisite. Shared rubric use is a review-order signal rather than an executable dependency, so `ki-skills` calibrates the review first and receives a final whole-set recheck after synthesis.

### Phase 0 — Audit standing guidance

- `AGENTS.md` — retain only concise, runtime-neutral repository orientation and local working constraints; route reusable governance to its existing shared owner or an extraction candidate.
- `CLAUDE.md` — retain only Claude-Code-specific deltas that cannot live in the runtime-neutral orientation or a portable skill.
- `.agents/skills/ki-self/SKILL.md` — retain only Harness-specific governance; route any rule useful to other repositories to the appropriate shared skill.

Reconcile the three surfaces against one another and the canonical skill set. Record every reusable candidate with evidence, disposition, roadmap treatment, proposed owner, and smallest useful action. Apply no extraction until the candidate is confirmed; if an approved extraction changes the canonical skill set, update the inventory and dependency order before Phase 1.

### Phase 1 — Review foundations

1. `ki-skills`
2. `ki-authoring`
3. `ki-git`
4. `ki-engineering`
5. `ki-repo`
6. `ki-delegation`

### Phase 2 — Review change management

7. `ki-change-management`
8. `ki-change-management-roadmap`
9. `ki-change-management-github-issues`
10. `ki-change-management-linear`
11. `ki-change-management-housekeeping`
12. `ki-recap`
13. `ki-next`
14. `ki-plan`
15. `ki-batch`
16. `ki-implement`
17. `ki-accept`

### Phase 3 — Review portable governance and agent systems

18. `ki-decision-records`
19. `ki-specs`
20. `ki-guides`
21. `ki-checkpoint`
22. `ki-trades`
23. `ki-trade`
24. `ki-agora`
25. `ki-communication`
26. `ki-subagents`

### Phase 4 — Review repository structures

27. `ki-repo-project`
28. `ki-repo-kb-activities`
29. `ki-repo-kb-live-artifacts`
30. `ki-repo-kb-streams`
31. `ki-repo-kb`
32. `ki-repo-kb-principal`
33. `ki-repo-specifications`
34. `ki-repo-mcp`
35. `ki-repo-website`
36. `ki-repo-website-cloudflare`
37. `ki-repo-plugins`
38. `ki-repo-tools`
39. `ki-repo-homebrew-tap`
40. `ki-repo-dotfiles-chezmoi`

### Phase 5 — Review environment and runtime adapters

41. `ki-binding`
42. `ki-binding-claude`
43. `ki-binding-codex`
44. `ki-binding-chezmoi`
45. `ki-housekeeping-claude`
46. `ki-tokenomics`
47. `ki-tokenomics-claude`
48. `ki-tokenomics-codex`

### Phase 6 — Review aggregate and entry-point skills

49. `ki-repo-harness`
50. `ki-bootstrap`

## Current state

The Harness has a strong mechanical `ki-skills` rubric and per-skill REFRESH contracts, but it has no current, complete review order or common effectiveness record spanning all 50 skills. Phase 0 reconciled the standing instruction surfaces: `AGENTS.md` is now a concise common repository anchor, `CLAUDE.md` contains only its Claude-specific hook boundary, the reusable rubric-code allocation rule lives in `ki-skills`, and the redundant repository-local `ki-self` has been retired. The existing dependency-order decision distinguishes executable dependencies from judgment priority, but its illustrative priority list no longer names the complete canonical set.

No grade scale or remediation queue is approved yet. The ordered inventory and common checks above are the planning basis for collecting comparable evidence before those decisions.

## Steps

- [x] Audit `AGENTS.md`, `CLAUDE.md`, and `.agents/skills/ki-self/SKILL.md` for duplicated or reusable guidance; present deduplicated extraction candidates and obtain approval for any move, deletion, new skill, or existing-skill amendment.
- [ ] After confirmed standing-guidance dispositions are applied or explicitly deferred, freeze the execution baseline, regenerate the canonical skill inventory and dependency graph, and reconcile any additions, removals, missing dependencies, or cycles against the 50-skill planning list before reviewing content.
- [ ] Refresh `ki-skills` and its source inventory first, confirm the effectiveness evidence template and grading vocabulary, and obtain approval for any normative rubric change before applying it to the remaining set.
- [ ] Process Phases 1–6 in order, reviewing one skill at a time and recording source evidence, mechanical results, judgment findings, effectiveness evidence, instruction cost, and proposed disposition without silently remediating the skill.
- [ ] At each phase boundary, reconcile newly discovered ownership or dependency changes before starting the next phase; update the remaining order only with an explicit, evidenced reason.
- [ ] Re-run whole-repository collision and dependency checks, recheck `ki-skills` against emergent findings, and prove that every canonical skill has exactly one completed review record.
- [ ] Present the complete grade and disposition matrix for approval, then route confirmed remediation as amendments or separate roadmap items under the owning area.

## Files touched

- This roadmap item and the `REV` area configuration and issue ledger
- `AGENTS.md`, `CLAUDE.md`, and `.agents/skills/ki-self/SKILL.md` only where a confirmed extraction removes duplication while preserving their local/runtime boundaries
- `skills/**/references/sources.md` where a source review exists or is newly justified
- The standards, rubrics, fixtures, and generated publications changed by separately approved source-refresh findings
- The durable review evidence and final grade/disposition matrix selected during implementation
- ADR-KI-HARNESS-SKILLS-003 if the completed review establishes a replacement foundations-first order

## Verify

- A generated inventory reports exactly the same canonical skills as the review sequence, with every declared dependency earlier than its dependent and no cycle or unknown target.
- Every instruction in `AGENTS.md`, `CLAUDE.md`, and the former `ki-self` has a recorded boundary disposition, no confirmed reusable rule remains duplicated across standing surfaces, and every extraction is linked to its shared owner or separately approved candidate.
- Every canonical skill has a review record covering all protocol checks, a source-list decision, exact audit evidence, and one proposed disposition.
- `ki repo audit --skill ki-skills --repo .` and each applicable focused skill audit pass after approved source-refresh changes; judgment gaps remain visible rather than being converted into synthetic mechanical passes.
- Focused rubric and fixture tests pass for every approved normative change, followed by `bun run test` and `bunx tsc --noEmit`.
- The final matrix accounts for all 50 baseline skills plus any explicitly reconciled catalogue change, and no remediation is implemented without its recorded approval and owner.

## Dependencies / blocks

The work has no roadmap blocker. Its first gate is methodological: refresh and approve the `ki-skills` evidence contract before using it to grade other skills. Formal composition dependencies constrain the review order, while shared rubric declarations, documented lifecycle relationships, and ownership boundaries inform judgment without being misreported as executable edges.

The immutable baseline will be recorded when implementation begins. Changes to the canonical skill set after that point must be reconciled explicitly rather than silently appended to or omitted from the review.

## Delegation

### Locked decisions

- The approved review protocol, 50-skill baseline, dependency-respecting order, and `baseline_ref` remain fixed unless new evidence is reconciled explicitly in this item.
- Workers collect and judge evidence only. They do not edit skills, source records, standards, rubrics, tests, roadmap records, or repository configuration.
- A clean audit is not effectiveness evidence. Every returned review must address selection value, outcome value, instruction economy, architecture, safety, tests, and disposition.
- Normative rubric changes, canonical skill-set changes, remediation, and final grades remain human approval points.

### Escalate

- Return any source conflict, proposed normative change, ownership or dependency change, missing authority, unsafe command, external write, or conclusion that cannot be supported from the named evidence to the coordinator.
- Stop if a lane would overlap another worker's scope, require repository writes, or depend on an unreviewed earlier skill.

### Rounds

- Round 1: `refresh-ki-skills-sources`, `review-ki-skills-architecture`, and `inventory-evaluation-evidence` run independently against the frozen baseline.
- Round 2: `review-ki-authoring`, `review-ki-git`, and `review-ki-engineering` begin after the coordinator integrates the `ki-skills` evidence shape.
- Round 3: `review-ki-repo` begins after the authoring and Git reviews; `review-ki-delegation` may run alongside it after the Phase 1 evidence shape is stable.

### Worker: refresh-ki-skills-sources

- **Deliverable:** Current, cited source-refresh evidence for `ki-skills`, including page-inventory drift, changed claims, relevant new primary or official material, discovery-source additions, and unresolved conflicts.
- **Inputs:** `skills/keystone/ki-skills/references/sources.md`, its three standards, generated rubric, and the source-refresh protocol in this item.
- **Files:** None; read-only repository and web research.
- **Authority:** Read the named local files and browse their declared sources; perform no repository or external writes and propose no silent standard change.
- **Isolation:** Read-only worker lane with no shared-worktree mutation.
- **Definition of done:** Every tracked source has a current status, the Agent Skills documentation index is reconciled, relevant additions are named, and each possible normative impact is separated from supporting practice.
- **Model:** reasoning — current-source reconciliation and authority conflicts require hard judgment.
- **Verify:** Coordinator checks every cited source, inventory conclusion, and claimed normative impact before recording it.
- **Return:** Concise source-by-source findings with direct links, dates where available, proposed source-list changes, and unresolved watch-items; no browsing transcript.
- **Checkpoint:** Return after the complete `ki-skills` source set and discovery surfaces have been assessed.

### Worker: review-ki-skills-architecture

- **Deliverable:** A read-only effectiveness review of `ki-skills` against the approved protocol and all judgment criteria, with candidate findings in the canonical shape.
- **Inputs:** The complete `ki-skills` directory, whole-repository mechanical audit evidence supplied in the brief, relevant eval scenarios and results, the REVIEW procedure, and this work item's boundary.
- **Files:** None; read-only review.
- **Authority:** Inspect named repository evidence and run read-only checks; do not edit, stage, commit, or create roadmap work.
- **Isolation:** Read-only worker lane scoped to `ki-skills` and its directly relevant eval evidence.
- **Definition of done:** The report covers selection and outcome effectiveness, instruction economy, architecture, executability, test evidence, source posture, disposition, and deduplicated candidates.
- **Model:** reasoning — the lane is an architectural and effectiveness judgment.
- **Verify:** Coordinator rechecks each finding against cited paths, the mechanical baseline, and the candidate-finding standard.
- **Return:** One compact review record plus candidate findings; distinguish facts, inferences, gaps, and proposals.
- **Checkpoint:** Return after one complete `ki-skills` review with no remediation applied.

### Worker: inventory-evaluation-evidence

- **Deliverable:** A mechanical baseline mapping all 50 skills to dependency position, source-list presence, structured rubric, tests, eval scenarios, and available result evidence, plus proposed fields for a comparable review record.
- **Inputs:** Canonical `skills/`, `evals/`, the review sequence, and `baseline_ref`.
- **Files:** None; read-only inventory.
- **Authority:** Run read-only repository inspection only; do not edit or interpret missing evidence as a grade.
- **Isolation:** Read-only whole-repository scan with no network or mutation.
- **Definition of done:** All 50 canonical skills appear exactly once, dependency order is checked, evidence coverage is explicit, and the proposed record fields map directly to the approved protocol.
- **Model:** standard — the work is bounded evidence collection and synthesis.
- **Verify:** Coordinator reruns the inventory and samples mappings against the filesystem and baseline commit.
- **Return:** Compact machine-verifiable counts, the 50-skill coverage map, and a proposed ungraded record template.
- **Checkpoint:** Return after the complete inventory is accounted for with no unknown skill identity.

### Worker: review-ki-authoring

- **Deliverable:** A read-only effectiveness review of `ki-authoring` using the integrated record shape.
- **Inputs:** The complete `ki-authoring` directory, relevant tests and eval evidence, the Phase 1 `ki-skills` review record, and this item's protocol.
- **Files:** None; read-only review.
- **Authority:** Inspect and run read-only checks only; do not remediate or create follow-up work.
- **Isolation:** Read-only lane scoped to `ki-authoring` and its directly relevant evidence.
- **Definition of done:** Every review-protocol dimension has evidence or an explicit gap and one proposed disposition.
- **Model:** reasoning — effectiveness and ownership require hard judgment.
- **Verify:** Coordinator checks citations, audit evidence, candidates, and disposition against the integrated template.
- **Return:** One compact review record and canonical candidate findings; no raw command output.
- **Checkpoint:** Return after the complete ungraded review.

### Worker: review-ki-git

- **Deliverable:** A read-only effectiveness review of `ki-git` using the integrated record shape.
- **Inputs:** The complete `ki-git` directory, relevant tests and eval evidence, the Phase 1 `ki-skills` review record, and this item's protocol.
- **Files:** None; read-only review.
- **Authority:** Inspect and run read-only checks only; do not mutate Git state, remediate, or create follow-up work.
- **Isolation:** Read-only lane scoped to `ki-git` and its directly relevant evidence.
- **Definition of done:** Every review-protocol dimension has evidence or an explicit gap and one proposed disposition.
- **Model:** reasoning — safety, runtime behaviour, and instruction value require hard judgment.
- **Verify:** Coordinator checks citations, audit evidence, candidates, and disposition against the integrated template.
- **Return:** One compact review record and canonical candidate findings; no raw command output.
- **Checkpoint:** Return after the complete ungraded review.

### Worker: review-ki-engineering

- **Deliverable:** A read-only effectiveness review of `ki-engineering` using the integrated record shape.
- **Inputs:** The complete `ki-engineering` directory, relevant tests and eval evidence, the Phase 1 `ki-skills` review record, and this item's protocol.
- **Files:** None; read-only review.
- **Authority:** Inspect and run read-only checks only; do not remediate or create follow-up work.
- **Isolation:** Read-only lane scoped to `ki-engineering` and its directly relevant evidence.
- **Definition of done:** Every review-protocol dimension has evidence or an explicit gap and one proposed disposition.
- **Model:** reasoning — architecture, automation, and instruction economy require hard judgment.
- **Verify:** Coordinator checks citations, audit evidence, candidates, and disposition against the integrated template.
- **Return:** One compact review record and canonical candidate findings; no raw command output.
- **Checkpoint:** Return after the complete ungraded review.

### Worker: review-ki-repo

- **Deliverable:** A read-only effectiveness review of `ki-repo` using the integrated record shape and the completed authoring and Git evidence.
- **Inputs:** The complete `ki-repo` directory, relevant tests and eval evidence, completed `ki-authoring` and `ki-git` reviews, and this item's protocol.
- **Files:** None; read-only review.
- **Authority:** Inspect and run read-only checks only; do not remediate or create follow-up work.
- **Isolation:** Read-only lane scoped to `ki-repo` and its directly relevant evidence.
- **Definition of done:** Every review-protocol dimension has evidence or an explicit gap, dependency claims are reconciled, and one disposition is proposed.
- **Model:** reasoning — this keystone aggregates broad repository policy and safety behavior.
- **Verify:** Coordinator checks citations, audit evidence, dependency conclusions, candidates, and disposition.
- **Return:** One compact review record and canonical candidate findings; no raw command output.
- **Checkpoint:** Return after the complete ungraded review.

### Worker: review-ki-delegation

- **Deliverable:** A read-only effectiveness review of `ki-delegation`, explicitly testing whether the revised coordinator-first contract provides value beyond current runtime behavior and ordinary execution guidance.
- **Inputs:** The complete `ki-delegation` directory, its recent history and eval evidence, the integrated Phase 1 record shape, and this item's motivating finding.
- **Files:** None; read-only review.
- **Authority:** Inspect and run read-only checks only; do not alter the current delegation contract, packet, or roadmap.
- **Isolation:** Read-only lane scoped to `ki-delegation` and its directly relevant evidence.
- **Definition of done:** The report compares skill-assisted and current-runtime behavior, identifies residual value or ceremony, covers every protocol dimension, and proposes one disposition.
- **Model:** reasoning — the motivating effectiveness question requires careful counterfactual judgment.
- **Verify:** Coordinator checks the counterfactual evidence, citations, candidate routes, and disposition independently.
- **Return:** One compact review record and canonical candidate findings; no raw command output.
- **Checkpoint:** Return after the complete ungraded review.

## Discussion

### Why this is a new area

`REV` identifies bounded, evidence-producing reviews of existing Harness capabilities. It is distinct from `GOV`, which changes governance contracts, and from housekeeping templates, which define recurring due-run policy. Any recurring cadence should be proposed only after this first review establishes a useful evidence shape and cost.

### Why effectiveness is separate from conformance

Conformance establishes that a skill is well formed against the current standard. Effectiveness asks whether selecting and following it improves the result enough to justify its activation, context, procedure, and maintenance burden. The `ki-delegation` finding is the motivating case: correct structure alone cannot defend instructions that current runtime behaviour or newer standards have made redundant, costly, or less helpful.

### Ordering rule

The work begins one level above the skill catalogue by reviewing the always-loaded and runtime-local instruction surfaces. This prevents duplicated local guidance from being mistaken for evidence that a skill is effective or complete, and it exposes reusable guidance that the canonical set does not yet own.

After that gate, the numbered list begins by refreshing the shared skill-quality contract, then reviews the foundational authoring, Git, engineering, repository, and delegation concerns that shape later judgment. Change management follows immediately because its governance and process skills control how every resulting finding will be captured, planned, implemented, and accepted.

The remaining phases keep portable governance ahead of repository and runtime specialisations. Composite and adapter skills appear only after their declared prerequisites, and `ki-repo-harness` plus `ki-bootstrap` come last because they aggregate or expose much of the reviewed system.

### Standing-guidance disposition

The approved Phase 0 review found no missing capability that justified a new skill. `AGENTS.md` retains only the shared repository anchor, local workflow deltas, and concise pointers to existing owners. The one reusable rule not fully captured elsewhere — complete-family rubric-code allocation — moved into the `ki-skills` rubric-authoring standard. `CLAUDE.md` now contains only its import and Claude-specific hook-binding boundary. The former `ki-self` repeated `ki-repo`, `ki-git`, `ki-engineering`, `ki-authoring`, and runtime-projection guidance without owning a Harness-specific artifact, checker, configuration, or command, so it was retired rather than preserved as an empty indirection.

### Source coverage

A source refresh is not a date-bump exercise. Each review must establish that the source set still covers the claims the skill makes, add newly relevant primary or official material, demote discovery evidence that was treated as normative, retire dead sources, and retain unresolved watch-items. A missing source list is acceptable only when the review demonstrates that the skill is wholly derived from named local contracts and contains no volatile external claim.
