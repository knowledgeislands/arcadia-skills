# skills

Knowledge Islands **Agent Skills** live here, one directory per skill. The **most-built-out part of the harness** today — many skills, each a governance skill that holds a house standard and ships the universal **EDUCATE / AUDIT / CONFORM / REFRESH** modes plus a mechanical checker.

## Convention

Each skill is a directory containing a `SKILL.md` (YAML frontmatter — `name` + `description` required — followed by a markdown body), per the [Agent Skills open standard](https://agentskills.io/specification). Longer detail goes in `references/`, executables in `scripts/`, templates in `assets/` — all loaded on demand. The **directory name is the skill's `name`**: lowercase, hyphenated, matching the `name:` frontmatter exactly, since agents discover a skill by `name`, not path.

Skill quality conforms to the **`ki-skills`** standard (a sibling here) — run its AUDIT (`ki repo audit --skill ki-skills`) before shipping. The container these skills sit in — this five-part `skills/` / `subagents/` / `mcp/` / `evals/` / `hooks/` harness — conforms to **`ki-repo-harness`**.

## Adding a skill

1. Scaffold `<name>/SKILL.md` (run `ki-skills` Mode EDUCATE), adding `references/` / `scripts/` / `assets/` only as needed.
2. Write to the rubric, not from memory; self-audit with `bun run ki:skills:audit <name>`.
3. Add it to the catalogue and the dependency-order sweep — see the public [skills and journeys guide](https://knowledgeislands.info/guidance/skills/).

The [skill catalogue](https://knowledgeislands.info/guidance/skills/catalogue/) explains what each skill does, and [skills and journeys](https://knowledgeislands.info/guidance/skills/) maps the set. Installed elsewhere through managed KI activation.
