# `ki-repo` effectiveness review

- **Position:** 5 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `e6c91dc52d2307ac2a8c3c4b766e32df124dfbba` plus current-source checks on 2026-08-12.
- **Kind / dependencies:** governance / `ki-authoring`, `ki-git`; both reviewed earlier.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the repository and configuration owner; correct conflicting shorthand, refresh source authority, and replace stale evaluation evidence before grading.

## Sources and mechanics

`ki repo audit --skill ki-repo --repo .` passed with `FAIL=0 WARN=0`, including its declared `ki-authoring` and `ki-git` dependencies. Its focused repository test passed 23 tests and 49 assertions.

All eight tracked upstream sources were re-fetched. GitHub's repository, ruleset, security, and workflow API shapes remain available, but the source record is overdue and its summary still says “six of seven” sources. The secret-scanning documentation has a new canonical location, and GitHub's CLI documentation describes an Administration permission requirement rather than the skill's “repo-admin scope” shorthand. The source set should add the [SPDX licence list](https://spdx.org/licenses/) as the identifier authority and retain [Choose a License](https://choosealicense.com/) as supporting selection guidance.

## Selection and outcome effectiveness

The description selects well for repository-wide setup, audit, configuration, and GitHub settings while routing engineering, roadmap, and specialised structure concerns to their owners. The declared dependencies are truthful: authoring governs the files' presentation and Git governs working safety, while `ki-repo` owns repository semantics.

The skill materially improves house-specific outcomes. Its high-value delta is the `.ki-config.toml` schema and ownership rule, local-versus-live provenance, explicit GitHub confirmation boundary, safe foundation repairs, runtime declarations, and the gated coverage cascade. These are not adequately replaced by generic GitHub or TOML guidance.

## Instruction economy and architecture

The broad entrypoint is justified by a keystone role and routes detailed contracts into references. The most material defect is an internal authority conflict: `SKILL.md` still summarises licensing as MIT for public repositories and proprietary for private repositories, while the configuration standard correctly declares visibility and licence independent. A public repository may be proprietary and a private one MIT; the entrypoint must not couple them.

The completed authoring review's TOML question is now resolved at the ownership level: `ki-repo` owns semantic table identity and the one-table-per-skill contract. `ki-authoring` should restrict itself to TOML presentation or explicitly consume the repository contract rather than duplicating semantic judgment.

## Executability and safety

AUDIT is read-only, local writes are proposal-based and bounded, symlinks and unsafe paths are rejected, and live GitHub changes remain separately confirmed. Focused tests cover byte preservation, idempotence, runtime validation, local provenance, configuration identity, working-area repair, and unsafe targets. No destructive or unbounded action was found.

## Evidence and gaps

The mechanical checks strongly cover configuration and safe local mutation, but they do not establish whether the whole policy improves repository outcomes or whether descriptions avoid false selection. Existing eval scenarios use retired repository identity or table syntax, and the historical result logs are ignored, absent from the baseline, and advisory.

There is no current assisted-versus-baseline evidence for licence/visibility independence, local-versus-live provenance, GitHub confirmation, or coverage-cascade routing. The clean audit therefore supports structural correctness only.

## Proposed remediation

These proposals are not approved implementation:

1. Make the entrypoint's licence summary match the independent visibility/licence contract.
2. Refresh all eight source rows, fix the source-count prose, update moved GitHub locators and permission wording, and add SPDX as the identifier authority.
3. Route semantic TOML-table judgment exclusively to `ki-repo`; leave presentation with `ki-authoring`.
4. Replace retired-syntax scenarios with current assisted-versus-baseline tasks covering configuration ownership, licence independence, provenance, and confirmation boundaries.
5. Preserve the existing keystone rather than splitting its mutually dependent repository contract into new skills.

No new skill, agent, hook, or standalone script is proposed.
