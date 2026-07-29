---
id: KI-HARNESS-FND-001
title: Harden external Cowork plugin publication
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Make `ki-binding-claude`'s `build-plugin` publication inspectable before mutation and recoverable across replacement of generated output.

## Boundary

Preserve its output-root and symlink guards and unrelated scaffold; assess a dry-run and staged replacement only where compatible with the separate target repository.

## Discussion

### Recovery boundary

The shaping pass needs to determine whether staged replacement can preserve the current external-repository ownership boundary without introducing a second publication path.
