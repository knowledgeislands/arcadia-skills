# `ki-binding-claude` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 5 remediation is authorised
- **Identity:** position 42 of 50; governance; depends on `ki-binding` at position 41; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-binding-claude` correctly depends on the portable binding root and owns Claude-native projections. Its generator has meaningful staging, containment, rollback, hashing, and post-write verification, while `ki-repo-plugins` owns marketplace shape. Source projection remains distinct from registration, installation, cache, enablement, and loaded runtime capability.

Official current sources support explicit transport/type for URL servers and distinguish Claude Code, Desktop, Cowork, marketplace, installation, and activation states. The local source registry has only generic labels rather than retrievable URLs.

## Mechanical trace and limits

Seventeen tests, publication sync, and focused audit pass. `CLAUDEBIND-1` compares only server names. Locally, the expected `ki-mcporter` name exists but `claude mcp list` rejects it for unknown type `url`; canonical source carries a URL without a valid Claude transport representation. Desktop names are present but definition integrity and health remain unproven.

No KI plugin is installed in current Claude Code. Missing Cowork settings are informational, so audit cannot prove marketplace registration, installation, cache, loading, or usage. The adapter drafts discovered Cowork settings despite shared eval guidance requiring external-edit and next-launch verification; Claude Code settings are not Cowork authority. Its source fallback also hard-codes `$HOME/.config` instead of sharing root XDG resolution.

## Candidate improvements

1. Have root schema and Claude renderer owners define transport/type representation and validate full target definitions, including an invalid-URL fixture.
2. Require sourced Cowork-specific external-edit and activation evidence before automatic conform, or remove that claim.
3. Share canonical source-location resolution and test XDG override parity.
4. Create a scoped evidence chain from projection hash/version through selected marketplace, installed/enabled cache, and loaded capability.

## Carry-forward criteria

Name parity cannot prove target executability. Runtime-specific settings authority must not be inferred across products, and generated projection, registration, installation, activation, and successful loading remain separate evidence.

## Local evidence

- `skills/environment/ki-binding-claude/SKILL.md`
- `skills/environment/ki-binding-claude/references/standards-claude-binding.md`
- `skills/environment/ki-binding-claude/references/sources.md`
- `skills/environment/ki-binding-claude/scripts/rubric/contexts/claude.ts`
- `skills/environment/ki-binding-claude/scripts/rubric/items/claudebind.ts`
- `skills/environment/ki-binding-claude/scripts/build-plugin.ts`
- `evals/scenarios/ki-binding.ts`
