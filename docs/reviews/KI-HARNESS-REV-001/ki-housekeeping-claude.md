# `ki-housekeeping-claude` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 5 remediation is authorised

## Dependency and ownership

`ki-housekeeping-claude` correctly separates Claude runtime-state cleanup from portable recurring work. Its judge-versus-server execution split is explicit, and selected-memory checks have strong containment and symlink protections.

Native Claude owns memory location and loading, Headroom owns its learned-output behavior, and user settings own overrides. The skill currently merges these authorities: tracked Headroom 0.31.0 differs from installed 0.34.0, whose learn command defaults to `CLAUDE.local.md`, while Claude separately permits `autoMemoryDirectory` and applies aggregate loading limits.

## Mechanical trace and limits

Eleven tests, publication sync, and focused audit pass. Memory conform is bounded and proposal-only. The checker always derives the default Claude memory path and neither resolves nor refuses an override, so alternate or disabled memory can yield a clean not-applicable result. It checks long individual lines rather than Claude's aggregate load limits, validates Headroom marker order without the required date, and uses narrow regex parsers that silently skip malformed entries.

No registered housekeeping server or binary is available in the current Claude runtime. A source checkout and inventory reference therefore do not prove installation, access level, or executed cross-surface audit. Three evals test remembered format answers rather than override handling, server availability, authorization, or outcomes.

## Candidate improvements

1. Anchor native memory in current Claude documentation and separately version Headroom output and user override evidence.
2. Resolve the selected native store or fail closed with explicit unverified/disabled state; test defaults, overrides, worktrees, and disabled memory.
3. Align size and exact-format criteria with native limits and semantic parsing, adding malformed/date false-negative fixtures.
4. Separate server source, inventory reference, client registration, access exposure, and executed audit evidence.

## Carry-forward criteria

Native platform behavior, third-party tool output, and user overrides are independent authorities. Default-path audit must expose override uncertainty, and source payload, registration, capability exposure, and executed outcome each need separate evidence.

## Local evidence

- `skills/environment/ki-housekeeping-claude/SKILL.md`
- `skills/environment/ki-housekeeping-claude/references/standards-auto-memory.md`
- `skills/environment/ki-housekeeping-claude/references/standards-claude-state.md`
- `skills/environment/ki-housekeeping-claude/references/sources.md`
- `skills/environment/ki-housekeeping-claude/scripts/rubric/contexts/housekeeping.ts`
- `skills/environment/ki-housekeeping-claude/scripts/rubric/contexts/housekeeping.test.ts`
- `evals/scenarios/ki-housekeeping-claude.ts`
