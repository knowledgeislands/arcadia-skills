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

Those Bun tests are maintainer fixtures for the implementation. They supplement the native repository audit; they are not a second public execution path.

Before handing off a skill change, run the repository gates in order:

```bash
bun run test
bunx tsc --noEmit
ki repo audit --skill ki-skills --repo .
```

The pre-commit hook applies the same principle to the index: it builds a complete staged snapshot, includes unchanged sibling and provider roots, and audits the repository-local `ki-self` source when relevant.
