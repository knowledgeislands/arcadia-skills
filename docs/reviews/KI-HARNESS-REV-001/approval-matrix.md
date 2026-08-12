# Approved grading and disposition matrix

This is the approved grading and disposition artifact for KI-HARNESS-REV-001. The user approved the complete vocabulary, matrix, dispositions, cluster-level routing, and owner-decision gates on 2026-08-12.

Evidence grades describe present strength and risk; they are not quality scores.

## Evidence vocabulary

| Grade | Meaning                                                                                                       |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| `E`   | Demonstrated effectiveness: current end-to-end or assisted-versus-baseline evidence plus sound mechanics.     |
| `P`   | Plausible retained value: bounded design and some structural evidence, but effectiveness remains unproven.    |
| `F`   | Material false assurance: clean state can represent a materially untrue safety, execution, or semantic claim. |
| `U`   | Unavailable capability: the claimed operation is not currently executable or hosted as described.             |

No skill currently reaches `E`. This reflects missing outcome evidence, not a conclusion that no skill is useful.

Compact Phase 3–6 records leave selection, economy, and assisted-outcome dimensions unavailable unless recorded.

## Matrix

All dispositions are `revise` except `ki-communication`, whose approved disposition is `retire`. Confidence is `H` high, `M` medium, or `L` low.

|   # | Skill                                | Grade | Conf. | State    | Material basis                                          |
| --: | ------------------------------------ | :---: | :---: | -------- | ------------------------------------------------------- |
|   1 | `ki-skills`                          |   P   |   M   | applied  | Strong rubric; current outcome evidence insufficient.   |
|   2 | `ki-authoring`                       |   P   |   M   | applied  | Distinct safety/formatting value; outcomes incomplete.  |
|   3 | `ki-git`                             |   P   |   M   | applied  | Valuable safety protocol; judgment outcomes unproven.   |
|   4 | `ki-engineering`                     |   F   |   M   | applied  | Authority conflict can coexist with clean audit.        |
|   5 | `ki-repo`                            |   P   |   M   | applied  | Distinct config owner; mainly structural evidence.      |
|   6 | `ki-delegation`                      |   P   |   M   | applied  | Credible packet delta; incremental value unproven.      |
|   7 | `ki-change-management`               |   F   |   M   | applied  | Selector can pass without resolvable adapter.           |
|   8 | `ki-change-management-roadmap`       |   P   |   M   | applied  | Mechanics repaired; outcome evidence remains thin.      |
|   9 | `ki-change-management-github-issues` |   U   |   M   | applied  | No authorised remote execution path.                    |
|  10 | `ki-change-management-linear`        |   U   |   M   | applied  | No authorised remote execution path.                    |
|  11 | `ki-change-management-housekeeping`  |   P   |   M   | applied  | Useful split; no completed-run evidence.                |
|  12 | `ki-recap`                           |   P   |   M   | applied  | Conservative boundary; limited runtime outcomes.        |
|  13 | `ki-next`                            |   P   |   M   | applied  | Credible selection discipline; no direct outcome trial. |
|  14 | `ki-plan`                            |   P   |   M   | applied  | Plausible readiness boundary; outcomes unproven.        |
|  15 | `ki-batch`                           |   P   |   M   | applied  | Approval safeguards credible; no outcome evaluation.    |
|  16 | `ki-implement`                       |   P   |   M   | applied  | Transition safeguards credible; outcomes absent.        |
|  17 | `ki-accept`                          |   P   |   M   | applied  | Closure safeguards credible; no completed-use evidence. |
|  18 | `ki-decision-records`                |   F   |   M   | applied  | Metadata collision remains owner-gated.                 |
|  19 | `ki-specs`                           |   F   |   M   | applied  | Serial/applicability policy remains owner-gated.        |
|  20 | `ki-guides`                          |   P   |   L   | applied  | Useful structure; reader outcomes unproven.             |
|  21 | `ki-checkpoint`                      |   P   |   L   | applied  | Plausible reconstruction; no resumption trial.          |
|  22 | `ki-trades`                          |   F   |   M   | applied  | Completion now fails closed without adapter evidence.   |
|  23 | `ki-trade`                           |   F   |   M   | applied  | Unsupported host atomic intake is blocked.              |
|  24 | `ki-agora`                           |   F   |   M   | applied  | Local shape explicitly cannot prove bilateral consent.  |
|  25 | `ki-communication`                   |   U   |   H   | retired  | No activation, checker, sources, tests, or modes.       |
|  26 | `ki-subagents`                       |   F   |   M   | applied  | Portable/native split removes parser overclaim.         |
|  27 | `ki-repo-project`                    |   F   |   M   | applied  | Duplicate primary-kind mechanics removed.               |
|  28 | `ki-repo-kb-activities`              |   F   |   M   | applied  | Parsed YAML and real links fail closed.                 |
|  29 | `ki-repo-kb-live-artifacts`          |   F   |   M   | applied  | Invalid config and symlinks fail closed.                |
|  30 | `ki-repo-kb-streams`                 |   F   |   M   | applied  | Inert configuration is rejected or consumed.            |
|  31 | `ki-repo-kb`                         |   F   |   H   | applied  | Unresolved metadata is no longer aggregate success.     |
|  32 | `ki-repo-kb-principal`               |   F   |   M   | applied  | Structure no longer implies canonical authority.        |
|  33 | `ki-repo-specifications`             |   P   |   L   | applied  | Structure works; stability evidence absent.             |
|  34 | `ki-repo-mcp`                        |   F   |   M   | applied  | Source shape is separate from security/runtime.         |
|  35 | `ki-repo-website`                    |   F   |   M   | applied  | Layout and runtime contract reconciled statically.      |
|  36 | `ki-repo-website-cloudflare`         |   F   |   M   | applied  | Parsed config rejects invalid Worker seams.             |
|  37 | `ki-repo-plugins`                    |   F   |   M   | applied  | Shape is separate from freshness and activation.        |
|  38 | `ki-repo-tools`                      |   F   |   H   | applied  | Read-only audit no longer executes target code.         |
|  39 | `ki-repo-homebrew-tap`               |   F   |   H   | applied  | Read-only audit no longer invokes Homebrew.             |
|  40 | `ki-repo-dotfiles-chezmoi`           |   F   |   M   | applied  | Applicability and host subjects now align.              |
|  41 | `ki-binding`                         |   F   |   H   | applied  | Full definitions and source resolution are checked.     |
|  42 | `ki-binding-claude`                  |   F   |   H   | applied  | Projection no longer claims runtime health.             |
|  43 | `ki-binding-codex`                   |   U   |   H   | applied  | Hosted adapter activated; runtime remains unavailable.  |
|  44 | `ki-binding-chezmoi`                 |   F   |   M   | applied  | Parsed source structure replaces substring assurance.   |
|  45 | `ki-housekeeping-claude`             |   F   |   M   | applied  | Memory selection now resolves or fails closed.          |
|  46 | `ki-tokenomics`                      |   F   |   H   | applied  | Policy is labelled declared, never measured.            |
|  47 | `ki-tokenomics-claude`               |   F   |   M   | applied  | Only bounded repository evidence may pass.              |
|  48 | `ki-tokenomics-codex`                |   F   |   M   | applied  | Current repository paths and unavailability are clear.  |
|  49 | `ki-repo-harness`                    |   F   |   H   | applied  | Source shape no longer implies payload provenance.      |
|  50 | `ki-bootstrap`                       |   U   |   H   | applied  | Guidance and evals use current installed CLI grammar.   |

Distribution: `E 0`, `P 16`, `F 29`, `U 5`.

## Approval record

The user approved all five decisions on 2026-08-12:

1. The `E/P/F/U` evidence vocabulary.
2. All 50 grades and dispositions, including `ki-communication` retirement.
3. Treating missing outcome or economy evidence as a confidence limit rather than automatic proof of poor quality.
4. Cluster-level routing.
5. Owner decisions before implementing schema, adapter, runtime, identity, or aggregate conflicts.
