# KI-HARNESS-RTP-005: align the runtime identifier with ChatGPT Codex

## Origin and relationship

Origin: `ki-agentic-harness`, [KI-HARNESS-RTP-005](../../../docs/roadmap/KI-HARNESS-RTP-005-align-the-runtime-identifier-with-chatgpt-codex.md).

Receiving owner: `tools-ki`.

Relationship: this is a dependency for the originating Blocking item, not an instruction to inherit its priority.

Adopt it as an independently prioritised `KI-TOOL-CLI-*` item, record `transferred-from: KI-HARNESS-RTP-005`, and make the reciprocal dependency explicit once the receiving identifier exists.

## Requested adoption

Replace the canonical KI configuration runtime identifier `codex` with `chatgpt-codex` in the public `ki` executable.

The receiving work owns the supported-runtime vocabulary, parsing and validation of `ki-supported-runtimes`, `ki repo init --runtime`, generated `.ki-config.toml` declarations, and compatibility matching between the detected `chatgpt-codex` agent and skills or repositories that declare that runtime.

It also owns the corresponding CLI contract tests, fixtures, diagnostics, `README`, and manual wording.

## Constraints

Do not retain `codex` as a compatibility alias, fallback, or second accepted configuration value.

Retain product references that are not KI runtime identifiers, including user-facing Codex configuration paths, the Codex command name, and `ki-tokenomics-codex` as a capability name.

The changed contract must continue to support `claude-code` unchanged.

The harness owns changes to skill standards, rubrics, harness metadata, and fleet declarations; do not make those source-of-truth changes in this repository.

## Current CLI evidence

`src/core/harness.ts` currently declares `['claude-code', 'codex']`, while the actual agent descriptor is already `chatgpt-codex`.

`src/core/configuration.ts`, `src/core/repository-operations.ts`, CLI fixtures, diagnostics, and `README.md` repeat the old runtime vocabulary.

## Completion evidence

- `chatgpt-codex` and `claude-code` are the only accepted KI runtime declarations.
- `ki repo init --runtime chatgpt-codex` writes the corrected configuration and `--runtime codex` fails with recovery-oriented guidance.
- Runtime-specific skill declarations, discovery, and managed activation select the `chatgpt-codex` agent correctly; `claude-code` remains unaffected.
- Focused CLI contract tests plus `bun run test` and `bunx tsc --noEmit` pass.
- The adopted item records its relationship to KI-HARNESS-RTP-005 and the two repositories agree the release contract is consistent.

The executable's exact implementation and acceptance evidence remain canonical in `tools-ki` after adoption.
