---
id: KI-HARNESS-FND-001
title: Harden external Cowork plugin publication
theme: foundation-tooling
horizon: soon
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Make `ki-binding-claude`'s `build-plugin` publication inspectable before mutation and recoverable across replacement of generated output.

## Boundary

Preserve its output-root and symlink guards and unrelated scaffold; assess a dry-run and staged replacement only where compatible with the separate target repository.

## Shaping

### Intended approach

Inspect the existing plugin builder and a named `ki-plugins` checkout without mutating either publication output.

Determine whether the builder can present a complete dry-run manifest and stage a replacement under the target repository's safe output root before one atomic publish step, while preserving unrelated scaffold and current symlink protections.

### Known dependencies

The generated marketplace lives in the separate `knowledgeislands/ki-plugins` repository.

Its owner and checkout scope must be explicit before any staged replacement or publication test runs.

### Decision still needed

Decide whether a staged replacement can preserve the target repository's ownership boundary without introducing a second publication path or a cross-device non-atomic fallback.

### Promotion conditions

Promote when the named target checkout, dry-run evidence shape, safe staging boundary, failure cleanup, and focused builder verification are concrete.

## Discussion

### Recovery boundary

The shaping pass needs to determine whether staged replacement can preserve the current external-repository ownership boundary without introducing a second publication path.
