# AUDIT and CONFORM

_On-demand procedure for `ki-housekeeping`'s AUDIT and CONFORM modes (CONFORM runs AUDIT first, so they share this file). The format, rubric, and mode model live in [`SKILL.md`](../SKILL.md) and are already loaded; this file is the procedure only._

## Mode AUDIT

1. Run `ki user audit --skill ki-housekeeping`. It inspects physical `~/.claude/projects/*/memory/` directories, never arbitrary user paths. If none exist, it reports **NA**; this is not a FAIL.
2. It emits findings on the severity ladder (FAIL / WARN / POLISH / ADVISORY / INFO / NA / PASS per `ki-skills`' [checker contract](../../../keystone/ki-skills/references/checker-contract.md)); non-zero exit iff any FAIL. Repository-evidence criteria (`SELF-*`, `IDX-6`) are **NA** in user scope because the project slug is not an authoritative repository identity.
3. Apply the **[J]** items in [rubric.md](rubric.md) by reading each `memory/*.md` file: Why/How-to-apply structure, absolute dates, CLAUDE.md-duplication candidates, neutral tone in `user`-type memories, staleness against current repo state, semantic (not chronological) index organization.
4. Report a single findings table, checker output first, then the [J] reading pass, each row citing its rubric ID.

## Mode CONFORM

1. Run **AUDIT**.
2. Run `ki user conform --skill ki-housekeeping` to apply its safe host-owned repairs: frontmatter name alignment and missing index entries. Fix other FAIL/WARN findings deliberately: remove dangling index entries, correct incomplete frontmatter, dedupe `name:` slugs, and repair malformed Headroom-block markers.
3. Apply each **[J]** fix by hand: add Why/How-to-apply structure, convert relative dates, promote CLAUDE.md-duplicating content to the repo's `CLAUDE.md` and delete the memory, reorganize the index semantically.
4. Re-run **AUDIT** to confirm the fixes landed and no new issue was introduced.
