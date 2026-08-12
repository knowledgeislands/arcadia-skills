# `ki-batch` effectiveness review

- **Position:** 15 of 50; process; no hard dependency; optional `ki-delegation`.
- **Baseline / snapshot:** `94f0b775903286fcf37c0ec050d5568672a5154f` / `873bfd1d`.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise`.
- **Change state:** applied in `cab06c4e`.

## Sources and evidence

The two community influences, [faff](https://github.com/shftwst/faff) and [gstack](https://github.com/garrytan/gstack), remain live and are correctly limited to supporting ideas; the source record should not call them canonical authority and needs review dates. Seven focused tests and 15 assertions passed. There is no eval or assisted-versus-baseline evidence.

## Findings

The narrow trigger, reviewed authorisation, fresh grounding, per-item lifecycle and verification, visible parking, and refusal to self-certify closure add credible value beyond ordinary parallel work. Entrypoint and standard delegate sibling responsibilities rather than duplicating them.

The process hard-codes roadmap/Streams resolution and needs the shared selected-adapter resolver and fail-closed remote behavior owned by `KI-HARNESS-FND-014`.

A material authority conflict remains. Frontmatter names one local repository, while the procedure and exemplar allow plural repositories and files; the helper validates only the one repository string and never parses body scope. Approval metadata therefore cannot prove that the current body is the reviewed authority. Helpers also accept duplicate item IDs and do not resolve canonical items, dependency order, actual scope, gates, mandatory stops, delegation, or closure grants. They are safe pure models, not real preflight evidence.

## Proposed remediation

These proposals are not approved: choose single-repository batches or define explicit per-repository authority and isolation; make the approved payload verifiable with a separate append-only run ledger; reject duplicate IDs; resolve canonical records, dependencies, scope, stops, and adapter selection; add outcome scenarios for wrongful admission, duplicate execution, unsafe continuation, and unnecessary ceremony. No new skill, agent, or hook is proposed.

## Applied changes

**State:** applied in `cab06c4e`.

Locked batches to one repository, rejected duplicate identifiers, bound approval to a SHA-256 payload and run identity, and made the append-only ledger evidence rather than authority. Pure preflight models reject unsupported adapters, non-canonical or out-of-scope records, missing plans/checks, unsafe delegation, mandatory stops, and invalid dependency order.
