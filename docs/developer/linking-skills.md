# Local skill linking for harness development

This is the contributor workflow for making an installed canonical harness follow a local checkout. Normal users should start with [Install and get started](https://knowledgeislands.info/guidance/using-ki/getting-started/).

## Prepare the user environment

Install the released `ki` executable, then bootstrap the detected agent runtimes:

```bash
brew install knowledgeislands/tap/ki
ki bootstrap
```

Bootstrap installs the verified canonical harness and the core user skills. It does not declare repository governance.

## Enable the development checkout

From any directory, point `ki` at the physical harness checkout:

```bash
ki dev on /path/to/ki-agentic-harness
```

The command validates the required `skills/`, `subagents/`, and `hooks/` roots before replacing the installed canonical payload with managed links to the checkout. It also refreshes configured user skills so the next agent session sees the local sources.

Confirm the active installation:

```bash
ki diag
ki doctor
```

Repository-scoped skill links resolve through the installed harness location, so they follow the development checkout without a separate source linker. Add a missing repository capability with:

```bash
ki skill repo add <skill> --repo <repository>
```

`ki-self` is different from an installed harness skill: author its one committed source at `.agents/skills/ki-self/SKILL.md`. Codex reads that source directly; Claude Code projects `.claude/skills/ki-self` to it by relative link. Do not create a second copy.

Start a new agent session after changing skill activation or switching harness source so the runtime re-scans its skill directories.

## Restore the verified harness

When checkout-local development is complete, restore the verified canonical archive and refresh the user projections:

```bash
ki dev off
ki doctor
```

`ki dev off` preserves unfamiliar state and fails with recovery guidance rather than deleting an unproven installation.
