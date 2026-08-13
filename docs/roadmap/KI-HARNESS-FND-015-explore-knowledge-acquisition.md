---
id: KI-HARNESS-FND-015
title: Explore knowledge acquisition
area: FND
theme: foundation-tooling
horizon: future
status: draft
candidate: true
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Explore whether Knowledge Islands needs a governed way to preserve selected source material for later knowledge extraction without treating acquisition itself as extraction.

## Context

An early developer guide described a manual pilot for capturing one user-selected ChatGPT conversation or project into a KEP-shaped evidence set. That work moved ahead of the more basic acquisition, extraction, authority, privacy, and destination contracts. The useful safety and evidence-shape thinking is retained here as a candidate rather than presented as a supported contributor procedure or agent capability.

## Boundary

This candidate does not establish KAF, KEP, or KBEP as approved formats; create a `ki acquire` command or skill; authorise access to conversations or private assets; automate a browser or authenticated session; perform knowledge extraction; or write into a Knowledge Base.

## Discussion

### Safety observations

- Acquire only material the user is entitled to access and explicitly selects.
- Keep private source material outside Git working trees and never commit conversations, credentials, session data, tokens, or private assets.
- Prefer user-provided exports, downloads, or manually supplied content over browser automation, undocumented APIs, existing profiles, or copied authentication material.
- Preserve unavailable records and known omissions rather than presenting a partial capture as complete.

### Candidate evidence shape

The earlier pilot separated unchanged originals, readable records, binary assets, source-native relationships, checksums, and a manifest candidate. That separation may be useful if this idea is revisited:

```text
<private-output>/
├── kep.toml
├── README.md
├── source/
│   ├── originals/
│   └── records/
├── assets/
├── relationships/
│   └── native.jsonl
└── checksums/
    └── sha256sums.txt
```

Relationships at the acquisition stage would remain source-native—such as project-to-conversation, message-to-attachment, ordering, and explicit links—rather than inferred decisions, concepts, or reusable knowledge.

### Questions before promotion

- Is acquisition a reusable agent capability, a host tool, or an external data-ingress concern?
- Which authority and privacy model governs source selection, storage, retention, and deletion?
- What is the minimum portable evidence contract, if any, before extraction begins?
- Which later process owns extraction, reconciliation, provenance, and Knowledge Base ingress?
