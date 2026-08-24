# Testing skills

Use the native repository host while developing skills. It loads the staged capability contract used by governed repositories instead of invoking a skill-owned wrapper.

From the harness repository root, run the complete mechanical `ki-skills` audit:

```bash
ki repo audit --skill ki-skills --repo .
```

The audit deliberately examines the whole skill set. Cross-skill names, composition edges, shared-module providers, and off-ramp reciprocity cannot be validated from one isolated skill directory.

Preview safe mechanical repairs without publishing them:

```bash
ki repo conform --skill ki-skills --repo . --dry-run
```

The progress display is automatic on an interactive terminal and suppressed when stderr is not a TTY. Findings and recap output remain available in both cases.

When changing a rubric implementation, run its focused source tests as well. For example:

```bash
bun test ./skills/keystone/ki-skills/scripts/rubric
```

A repository-local `.agents/skills/ki-self/` source follows the same direct catalogue shape, but is not published as Harness content. Declare `[skills.ki-self]` in the target repository, keep the source physical and committed, and run `ki repo audit --skill ki-self --repo <repository>` or `ki repo conform --skill ki-self --repo <repository>`. The host reports `repository-local:ki-self` and refuses a linked, escaping, wrongly named, or catalogue-less source before import.

Those Bun tests are maintainer fixtures for the implementation. They supplement the native repository audit; they are not a second public execution path.

Before handing off a skill change, run the repository gates in order:

```bash
bun run test
bunx tsc --noEmit
ki repo audit --skill ki-skills --repo .
```

The pre-commit hook applies the same principle to the index: it builds a complete staged snapshot, includes unchanged sibling and provider roots, and audits the repository-local `ki-self` source when relevant.
