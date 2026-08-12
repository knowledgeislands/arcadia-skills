# `ki-authoring` effectiveness review

- **Position:** 2 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `e15fb4f390e51d3e7f69cf285fceb3385bed5dbf` plus current-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the capability and safety model; refresh tool evidence, repair eval reliability, and reconcile TOML ownership before grading.

## Sources and mechanics

`ki repo audit --skill ki-authoring --repo .` passed with `FAIL=0 WARN=0`. Its focused catalogue test passed 8 tests and 30 assertions.

The [CommonMark specification](https://spec.commonmark.org/) remains at 0.31.2 and the [TOML specification](https://toml.io/en/v1.1.0) remains at 1.1.0. GitHub's alert syntax remains current. The material change is [rumdl 0.2.54](https://github.com/rvben/rumdl/releases), released on 2026-08-11, while the source record and local range name 0.2.52. The skill's own REFRESH contract requires every disabled-rule reproduction to be rerun before claiming compatibility or re-enabling a rule; that evidence does not yet exist.

The source list should also cite rumdl's official global-settings and CLI pages for configuration and `check --fix` behavior rather than asking the general rules page to support those claims.

## Selection and outcome effectiveness

The description names Markdown, TOML, knowledge placement, and house-style refresh while routing skill, configuration-contract, and toolchain work to adjacent owners. This is a distinct and useful selection boundary.

The skill materially improves outcomes by separating mechanical formatting from judgment, owning fixed formatter configuration, refusing unsafe owned-file targets, and preserving human/model decisions for wide tables, link quality, TOML readability, and knowledge placement. These are house-specific boundaries that current models cannot infer reliably. No evidence supports replacing the skill with a smaller script or standing instruction.

## Instruction economy and architecture

The 83-line entrypoint routes enforcement, Markdown, TOML, knowledge promotion, and examples to five on-demand references. The inline footnote-marker sequence is a justified high-frequency recall aid. Reports should aggregate clean judgment areas rather than restating every rubric criterion.

One ownership boundary needs later reconciliation with `ki-repo`: the TOML standard says the one-table-per-skill contract belongs to `ki-repo`, while `ki-authoring`'s `TOML-tables` criterion judges that same semantic contract. Authoring should either judge only presentation or cite an explicitly shared contract; this review does not choose the fix before the dependent `ki-repo` review.

## Executability and safety

AUDIT is host-first. CONFORM emits bounded proposals and fixed formatter commands rather than writing directly. Owned-file actions reject symlinks, and focused tests cover exceptions, normalization, proposal aggregation, and unsafe targets. No unbounded or destructive action was found.

## Evidence and gaps

The focused tests establish catalogue and mutation safety but do not execute rumdl against the recorded destructive-rule reproductions. The historical matrix logs are ignored, absent from the baseline, advisory, and Claude-only.

The current TOML scenario is not reliable current-contract evidence: its assertion expects `[ki-repo]`, while the live contract uses `[skills.ki-repo]`, and its rubric text names yet another table spelling. Its comment that the no-skill baseline reliably scores zero also conflicts with the available historical results. Knowledge-promotion routing has no behavioural scenario.

Explicit gaps are current rumdl compatibility evidence, real-tool regression fixtures, multi-runtime assisted-versus-baseline results, knowledge-promotion evidence, and the unresolved TOML contract boundary.

## Proposed remediation

These proposals are not approved implementation:

1. Test rumdl 0.2.54 in disposable fixtures against every recorded disabled-rule and `MD013` pipe reproduction before updating the source record.
2. Add the official rumdl configuration and CLI pages and clarify which sources define syntax versus local style.
3. Add real-tool regression fixtures for the destructive watch-items.
4. Replace the stale TOML recall scenario with a current contract task and add knowledge-promotion outcome evidence across supported runtimes.
5. Reconcile semantic TOML ownership with the later `ki-repo` review.

No new skill, agent, hook, or shared module is proposed.
