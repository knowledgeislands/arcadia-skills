# Governance — `GOV`

The behaviour of the governance model the harness applies to itself and to the repos it bootstraps: the universal modes, the mechanical-first contract, the severity ladder, and composition. Part of the Feature Definitions corpus; see [index.md](index.md).

> **Status:** as-built baseline, behaviour-level.

## Modes

### GOV-001 — Universal modes

Every governance skill MUST carry the universal modes EDUCATE · AUDIT · CONFORM · REFRESH (plus any skill-specific modes), per [ADR-KI-HARNESS-SKILLS-001](../decisions/ADR-KI-HARNESS-SKILLS-001-audit-conform-educate-refresh-canonical-modes-help.md).

_Verify:_ `ki-skills`' rubric lists the four modes, and `ki repo audit --skill ki-skills --repo .` reports a governance `SKILL.md` that omits one.

### GOV-002 — Mechanical-first, LLM-optional

Each skill's mechanical criteria MUST be executable by the installed CLI host with no LLM, exiting non-zero on any FAIL, per [ADR-KI-HARNESS-003](../decisions/ADR-KI-HARNESS-003-mechanical-first-agent-judgment-progressively-enhances.md).

_Verify:_ `ki repo audit --skill <declared-skill> --repo <repo>` loads the compatible native rubric, renders findings, and exits non-zero when it finds a FAIL.

## Contracts

### GOV-003 — Severity ladder

A checker's findings MUST use the unified response levels FAIL / WARN / FIXED / INFO / NOT_APPLICABLE / PASS, and the process MUST exit non-zero only when a FAIL is present. `FIXED` is valid only for CONFORM. Judgment aspects are counted as unevaluated in the summary rather than emitted as synthetic findings.

_Verify:_ `ki repo audit --skill <declared-skill> --repo <repo>` renders the host-validated rubric outcomes at the stated levels and exits non-zero only for FAIL findings.

### GOV-004 — Composition, not extension

A skill MUST NOT import another skill's source tree. It composes by declaring each prerequisite in `ki-depends-on` so the host selects and executes that capability first, per [ADR-KI-HARNESS-004](../decisions/ADR-KI-HARNESS-004-composition-over-extension.md). The narrow implementation exception is a declared shared-module dependency materialised as a regular local file at the consumer's own `scripts/shared/<module>.ts` path.

_Verify:_ no `skills/*/scripts/**/*.ts` relative import resolves outside its own `scripts/` directory; shared dependencies resolve only to safe declared provider modules and execute from local copies.

### GOV-005 — Machine-readable dependency graph

Each `SKILL.md` MUST declare a `ki-depends-on:` frontmatter list, and the resulting graph MUST be acyclic with every edge resolving to an existing skill, per [ADR-KI-HARNESS-SKILLS-006](../decisions/ADR-KI-HARNESS-SKILLS-006-six-cluster-skill-taxonomy-and-the-implication-graph.md).

A dependency identifies a prerequisite governance capability that selection of a skill also selects. The host MUST execute every dependency before its dependent; the order of names within `ki-depends-on` has no meaning, and the host MUST use a stable order between otherwise independent capabilities. Coverage selection is separate. A target that declares a skill MUST explicitly declare each of its dependencies in `.ki-config.toml`.

_Verify:_ `bun run ki:skills:graph:check` passes — it validates that every edge resolves and the graph is acyclic.

### GOV-006 — Exactly one repo-structure skill per repo

A Knowledge Islands repo MUST declare at most one repo-structure table (`["knowledgeislands/ki-agentic-harness:ki-harness"]`, `["knowledgeislands/ki-agentic-harness:ki-kb"]`, `["knowledgeislands/ki-agentic-harness:ki-website"]`, `["knowledgeislands/ki-agentic-harness:ki-mcp"]`, `["knowledgeislands/ki-agentic-harness:ki-plugins"]`, `["knowledgeislands/ki-agentic-harness:ki-tools"]`, `["knowledgeislands/ki-agentic-harness:ki-homebrew-tap"]`) in its `.ki-config.toml`, since exactly one skill governs a repo's on-disk shape; declaring more than one is a governance error, per [ADR-KI-HARNESS-SKILLS-006](../decisions/ADR-KI-HARNESS-SKILLS-006-six-cluster-skill-taxonomy-and-the-implication-graph.md).

_Verify:_ `ki-repo`'s `audit-repo.ts` emits a FAIL (`repo-structure`) when more than one repo-structure table is declared; implied family members (`ki-website-cloudflare`, `ki-kb-streams`) are excluded from the count.

### GOV-007 — Declared SPDX license, matched everywhere

A Knowledge Islands repo MUST declare its license as an SPDX id in `["knowledgeislands/ki-agentic-harness:ki-repo"]` `license` (default MIT), and the live GitHub license, the `LICENSE` file, and `package.json` `"license"` MUST all match that declaration, per the `ki-repo` standard.

_Verify:_ `ki-repo`'s `audit-repo.ts` `license` / `license-file` / `package-license` checks FAIL on any mismatch with the declared id.

### GOV-008 — Self-governing checker-contract root

`ki-skills` MUST provide its compatible native rubric catalogue from its own shipped files and MUST NOT declare a shared-module dependency on itself or another skill, per [ADR-KI-HARNESS-SKILLS-012](../decisions/ADR-KI-HARNESS-SKILLS-012-local-copies-for-shared-modules.md).

_Verify:_ `ki repo audit --skill ki-skills --repo .` loads the catalogue through the host; the focused catalogue tests cover missing or invalid root-module declarations.

### GOV-009 — Structured rubric orchestration

Every mechanical rubric aspect MUST declare its execution phase inside the canonical structured rubric item.

The checker MUST validate the complete catalogue and selected execution plan before a CONFORM context can write. It orders executions by phase, then family, item, and subject; AUDIT and fallback executions remain read-only.

The CLI host MUST load each selected compatible native rubric exactly once and execute it through the shared host model. Cross-skill ordering comes from the resolved governance set; skill-local phase ordering comes from the rubric items.

_Verify:_ the `ki-skills` catalogue tests cover phase ordering and invalid plans; the CLI runtime tests prove one host invocation per selected skill and strict catalogue/result validation.
