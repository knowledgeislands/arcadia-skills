# `ki-binding-codex` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 5 remediation is authorised

## Dependency and ownership

`ki-binding-codex` correctly depends on the portable inventory and limits itself to Codex's native TOML surface. The native writer's narrow replacement, unreplayable-record refusal, post-write verification, and recovery are materially safer than whole-file ownership.

Current official documentation supports shared desktop/CLI/IDE MCP configuration, stdio and streamable HTTP, and separate transport, enabled, policy, authentication, and runtime states. The local source registry lacks direct primary URLs.

## Mechanical trace and limits

Thirteen tests and publication sync pass, but the prescribed hosted audit is unavailable because this repository does not declare the adapter. A read-only renderer check and current CLI show one enabled `streamable_http` server whose URL matches canonical source. Authentication is unknown, and reachability, tools, and behavior are unproven.

`CODEXBIND-1` compares only names, so malformed or wrong transport definitions can pass. The renderer checks semantic URL or command/args/environment shape, but its result is not integrated with the hosted rubric. The renderer honors XDG and explicit overrides while rubric fallback hard-codes `$HOME/.config`, allowing them to inspect different sources. Tests are mocked and omit active CLI, hosted integration, XDG parity, malformed entries, authentication, and health. No exact eval exists.

## Candidate improvements

1. Activate the adapter in repository selection or explicitly mark its host operation unsupported; do not prescribe an impossible audit.
2. Integrate parsed transport and full-definition equivalence, enabled state where in scope, and shared source resolution into hosted evidence.
3. Add alternate-XDG, invalid transport, malformed entry, extra-key, unavailable-runtime, and active-CLI fixtures.
4. Preserve native merge/recovery and secret-safe diagnostics while labeling config/list state separately from reachability and usable tools.

## Carry-forward criteria

Generated or configured shape, active registration, authentication, transport initialization, and usable runtime tools are distinct evidence layers. Hosted capability must be declared and executable before it can support assurance.

## Local evidence

- `skills/environment/ki-binding-codex/SKILL.md`
- `skills/environment/ki-binding-codex/references/standards-codex-binding.md`
- `skills/environment/ki-binding-codex/references/sources.md`
- `skills/environment/ki-binding-codex/scripts/rubric/contexts/codex.ts`
- `skills/environment/ki-binding-codex/scripts/rubric/items/codexbind.ts`
- `skills/environment/ki-binding-codex/scripts/render-codex.ts`
- `skills/environment/ki-binding-codex/scripts/render-codex.test.ts`
