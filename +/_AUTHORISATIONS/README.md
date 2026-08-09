# Batch authorisations

This directory holds one reviewed, time-bounded authority record for each `ki-batch` run. It is a working-zone control plane, not a roadmap, scheduler, task tracker, or transcript store.

Name each regular Markdown record `<REPO>-BATCH-<NNN>.md`, with an identical `id`. Its frontmatter declares only the local repository identity, approval and timestamp, expiry timestamp, ordered item IDs, `awaiting-review` completion target, mandatory stops, and an optional exact closure-item list. An absent closure list grants no closure authority.

The record body explains the purpose, scope, required verification, allowed delegation and decisions, and records the append-only run ledger. `ki-batch` resolves only a regular file directly in this directory. Absent, malformed, foreign, expired, or unapproved records are no-write stops.

After every named item and the ledger have been reviewed, `ki-accept` may explicitly prune the selected record. No process deletes it automatically.
