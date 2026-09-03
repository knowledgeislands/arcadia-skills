---
id: KI-HARNESS-GOV-054
area: GOV
title: Sanction the self script namespace
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Recognise `self:` as the sanctioned namespace for repository-local package scripts in the `ki-engineering` script-naming convention, so that a script whose name is owned by the repository itself — not by the harness — declares that ownership in its name rather than through a `script_exclusions` entry.

## Context

The convention today distinguishes only two states: harness-standardised scripts under the `ki:` prefix, and everything else. Repository-local infrastructure scripts — vendoring, platform build entry points, local verify chains — carry unprefixed or ad-hoc names, and each one needs a `[skills.ki-engineering] script_exclusions` entry to pass audit. The exclusion list works, but it states ownership in a side file where a reader of `package.json` cannot see it, and it grows without bounding what it is for.

`5g-emerge/5g-emerge-ibc-2026` supplied the worked example in commit `b6b2e3e`: `cf:build`, `typecheck`, `vendor:clone` and `vendor:link` became `self:cf:build`, `self:typecheck`, `self:vendor:clone` and `self:vendor:link`, with the exclusion list renamed to match. The names now say what the exclusion list only implied — this script belongs to this repository — but the exclusions remain because the convention does not yet know the prefix.

Ecosystem-conventional names stay outside both namespaces: lifecycle scripts (`prepare` for Husky) and tool-expected names (`build`, `test`, `clean`) are contracts with external tooling, not claims of ownership, and renaming them would break the tools that call them.

## Boundary

This work may change the `ki-engineering` standard, its audit checks, examples, and repository-local `.ki.toml` files and `package.json` scripts across the registered estate. It must not rename scripts whose exact names are pinned by external systems without flagging the external change required — the worked example's `self:cf:build` is configured verbatim in a Cloudflare dashboard, and each such rename carries a manual platform step that the rollout procedure must surface, sequence, and confirm per repository. Each repository retains review and acceptance authority for its own rollout commit.

## Shaping

Amend the script-naming standard to define three namespaces: `ki:` for harness-standardised scripts, `self:` for repository-local scripts, and bare ecosystem-conventional names where an external tool expects them. A `self:`-prefixed script should pass the naming audit without an exclusion entry, narrowing `script_exclusions` to its residual purpose: bare names that are neither `ki:`, `self:`, nor recognisably ecosystem-conventional.

Decide whether the audit should maintain a small allow-list of ecosystem-conventional names (`build`, `test`, `clean`, `prepare`, `typecheck`, and peers) or treat all unprefixed names as exclusion-requiring. Then inventory the registered estate for current exclusion entries that are really `self:` candidates, and define the repository-by-repository rollout: rename, update cross-references (documentation, CI, platform dashboards), shrink the exclusion list, and commit under each repository's own review.
