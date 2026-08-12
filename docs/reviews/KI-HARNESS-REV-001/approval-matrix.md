# Proposed grading and disposition matrix

This is the approval artifact for KI-HARNESS-REV-001. Every grade and disposition remains proposed until explicitly approved.

Evidence grades describe present strength and risk; they are not quality scores.

## Proposed evidence vocabulary

| Grade | Meaning |
| ----- | ------- |
| `E` | Demonstrated effectiveness: current end-to-end or assisted-versus-baseline evidence plus sound mechanics. |
| `P` | Plausible retained value: bounded design and some structural evidence, but effectiveness remains unproven. |
| `F` | Material false assurance: clean state can represent a materially untrue safety, execution, or semantic claim. |
| `U` | Unavailable capability: the claimed operation is not currently executable or hosted as described. |

No skill currently reaches `E`. This reflects missing outcome evidence, not a conclusion that no skill is useful.

Compact Phase 3–6 records leave selection, economy, and assisted-outcome dimensions unavailable unless recorded.

## Matrix

All dispositions are `revise` except `ki-communication`, whose proposal is `retire`. Confidence is `H` high, `M` medium, or `L` low.

| # | Skill | Grade | Conf. | State | Material basis |
| -: | ----- | :---: | :---: | ----- | -------------- |
| 1 | `ki-skills` | P | M | applied | Strong rubric; current outcome evidence insufficient. |
| 2 | `ki-authoring` | P | M | applied | Distinct safety/formatting value; outcomes incomplete. |
| 3 | `ki-git` | P | M | applied | Valuable safety protocol; judgment outcomes unproven. |
| 4 | `ki-engineering` | F | M | applied | Authority conflict can coexist with clean audit. |
| 5 | `ki-repo` | P | M | applied | Distinct config owner; mainly structural evidence. |
| 6 | `ki-delegation` | P | M | applied | Credible packet delta; incremental value unproven. |
| 7 | `ki-change-management` | F | M | applied | Selector can pass without resolvable adapter. |
| 8 | `ki-change-management-roadmap` | P | M | applied | Mechanics repaired; outcome evidence remains thin. |
| 9 | `ki-change-management-github-issues` | U | M | applied | No authorised remote execution path. |
| 10 | `ki-change-management-linear` | U | M | applied | No authorised remote execution path. |
| 11 | `ki-change-management-housekeeping` | P | M | applied | Useful split; no completed-run evidence. |
| 12 | `ki-recap` | P | M | applied | Conservative boundary; limited runtime outcomes. |
| 13 | `ki-next` | P | M | applied | Credible selection discipline; no direct outcome trial. |
| 14 | `ki-plan` | P | M | applied | Plausible readiness boundary; outcomes unproven. |
| 15 | `ki-batch` | P | M | applied | Approval safeguards credible; no outcome evaluation. |
| 16 | `ki-implement` | P | M | applied | Transition safeguards credible; outcomes absent. |
| 17 | `ki-accept` | P | M | applied | Closure safeguards credible; no completed-use evidence. |
| 18 | `ki-decision-records` | F | M | awaiting | Metadata collision masks incompatibility. |
| 19 | `ki-specs` | F | M | awaiting | Boundary and verification gaps enable false success. |
| 20 | `ki-guides` | P | L | awaiting | Useful structure; reader outcomes unproven. |
| 21 | `ki-checkpoint` | P | L | awaiting | Plausible reconstruction; no resumption trial. |
| 22 | `ki-trades` | F | M | awaiting | Completion bypasses selected-adapter evidence. |
| 23 | `ki-trade` | F | M | awaiting | Host lacks promised audit and atomic intake. |
| 24 | `ki-agora` | F | M | awaiting | Local shape cannot prove bilateral consent. |
| 25 | `ki-communication` | U | H | awaiting | No activation, checker, sources, tests, or modes. |
| 26 | `ki-subagents` | F | M | awaiting | Hand parser overstates runtime assurance. |
| 27 | `ki-repo-project` | F | M | awaiting | Cardinality cannot prove adapter activation. |
| 28 | `ki-repo-kb-activities` | F | M | awaiting | Schema/substrings permit false success. |
| 29 | `ki-repo-kb-live-artifacts` | F | M | awaiting | Invalid defaults and no pair weaken integrity. |
| 30 | `ki-repo-kb-streams` | F | M | awaiting | Unused area config creates assurance. |
| 31 | `ki-repo-kb` | F | H | awaiting | Aggregate passes incompatible contracts. |
| 32 | `ki-repo-kb-principal` | F | M | awaiting | Empty files/keyword can imply authority. |
| 33 | `ki-repo-specifications` | P | L | awaiting | Structure works; stability evidence absent. |
| 34 | `ki-repo-mcp` | F | M | awaiting | Structure cannot establish per-tool security. |
| 35 | `ki-repo-website` | F | M | awaiting | Conflicting layout/runtime rules can pass. |
| 36 | `ki-repo-website-cloudflare` | F | M | awaiting | Regex permits invalid site-worker config. |
| 37 | `ki-repo-plugins` | F | M | awaiting | Shape cannot prove freshness or activation. |
| 38 | `ki-repo-tools` | F | H | awaiting | Audit executes target code without isolation. |
| 39 | `ki-repo-homebrew-tap` | F | H | awaiting | Package-manager audit is side-effecting. |
| 40 | `ki-repo-dotfiles-chezmoi` | F | M | awaiting | Applicability and host execution diverge. |
| 41 | `ki-binding` | F | H | awaiting | Name-only comparison is not runtime parity. |
| 42 | `ki-binding-claude` | F | H | awaiting | CLI rejects projection despite name parity. |
| 43 | `ki-binding-codex` | U | H | awaiting | Hosted audit is undeclared and unavailable. |
| 44 | `ki-binding-chezmoi` | F | M | awaiting | Substrings cannot prove render equality. |
| 45 | `ki-housekeeping-claude` | F | M | awaiting | Override uncertainty can appear clean. |
| 46 | `ki-tokenomics` | F | H | awaiting | Policy passes without measurement. |
| 47 | `ki-tokenomics-claude` | F | M | awaiting | Filesystem config is presented as effective. |
| 48 | `ki-tokenomics-codex` | F | M | awaiting | Incorrect paths misstate runtime surfaces. |
| 49 | `ki-repo-harness` | F | H | awaiting | Count masks symlinked source checkout. |
| 50 | `ki-bootstrap` | U | H | awaiting | Guidance uses obsolete CLI grammar. |

Distribution: `E 0`, `P 16`, `F 29`, `U 5`.

## Approval decisions

1. Approve or amend the `E/P/F/U` evidence vocabulary.
2. Confirm, defer, or alter the 50 proposed grades and dispositions, especially `ki-communication` retirement.
3. Confirm that missing outcome/economy evidence limits confidence rather than automatically proving poor quality.
4. Approve cluster-level routing or request individual routes.
5. Require owner decisions before any schema, adapter, runtime, identity, or aggregate conflict is implemented.
