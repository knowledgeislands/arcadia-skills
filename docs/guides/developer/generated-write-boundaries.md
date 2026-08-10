# Managed write boundaries

The harness keeps authored source, installed harness payloads, runtime discovery links, and repository declarations separate.

The boundary matters because each surface has a different owner and recovery path. Do not repair one surface by copying or deleting files from another.

## The surfaces

- **Harness source** — `skills/`, `subagents/`, `hooks/`, guides, and tests are authored and committed in `ki-agentic-harness`.
- **Installed harnesses** — `ki bootstrap` installs the verified canonical harness beneath the KI XDG data directory. `ki harness install` and `ki harness uninstall` manage additional compatible harnesses. These payloads are CLI-owned state, not repository content.
- **Development harness projection** — `ki dev on <checkout>` makes the installed canonical harness payload follow a validated local checkout. `ki dev off` restores the verified archive. This is the only supported nearby-checkout path.
- **Runtime skill links** — `ki skill user add` owns user-scope links and `ki skill repo add` owns repository-scope links. Their matching remove commands delete only links whose ownership KI can prove.
- **Repository declarations** — `.ki-config.toml` names the governance skills selected for one repository. `ki skill repo add` and `ki skill repo remove` update the declaration together with the managed runtime links.
- **Shared module payloads** — a provider authors `scripts/shared/<module>.ts`; each declared consumer carries a regular local copy at the same path. These compile-time contracts stay inside the skill root and are not runtime links.
- **Repository-local governance** — a repo-local `ki-self` is authored once at `.agents/skills/ki-self/`. A Claude Code projection may point `.claude/skills/ki-self` to that committed source; do not create a second canonical copy.
- **Hook payloads** — the compatible harness carries hook source. A user-environment manager owns any runtime registration because repository operations must not write global agent settings.

## Normal operation

First configure the user environment and install the canonical harness:

```bash
ki bootstrap
```

Use `ki bootstrap --refresh` to redetect agents and reconcile the recorded installed inventory. Install an additional compatible harness only when a required capability comes from it:

```bash
ki harness install <harness-id>
```

Activate a skill in the scope that needs it:

```bash
ki skill user add <skill>
ki skill repo add <skill> --repo <repository>
```

Repository governance then runs through the native host:

```bash
ki repo educate --repo <repository>
ki repo audit --repo <repository>
ki repo conform --repo <repository> --dry-run
```

The repository commands resolve declared capabilities from installed harnesses. They do not execute repository-local wrappers, copied rubric runners, or package aliases.

## Harness development

Point the canonical installed harness at a local checkout:

```bash
ki dev on /path/to/ki-agentic-harness
```

`ki` validates the checkout's payload roots, publishes the managed development projection, refreshes configured user skills, and records the local source. Existing user and repository skill links continue to resolve through that installed harness location.

Inspect the active source and environment with:

```bash
ki diag
ki doctor
```

Restore the verified canonical archive when local development is complete:

```bash
ki dev off
```

Start a new agent session after changing a managed skill link so the runtime re-scans its discovery directories.

## Preservation and recovery

The CLI refuses unfamiliar, altered, escaping, or unsafe managed paths rather than overwriting them. Treat that result as a diagnostic, not an invitation to force-delete files.

Use the owner of each surface:

- Missing configuration or core user skills → `ki bootstrap`.
- Stale configured inventory → `ki bootstrap --refresh`.
- Harness installation state → `ki harness list`, `ki harness info <harness-id>`, and `ki doctor`.
- A local development projection → `ki diag`, then `ki dev off` when the verified archive should be restored.
- User or repository skill-link drift → the matching `ki skill user` or `ki skill repo` command.
- Repository governance findings → `ki repo audit` followed by a reviewed `ki repo conform`.
- A user-global hook binding or runtime setting → the applicable user-environment manager.

The `ki-bootstrap` skill explains the installation and activation boundary; `ki-repo` owns repository coverage; exact command grammar comes from `ki help`.
