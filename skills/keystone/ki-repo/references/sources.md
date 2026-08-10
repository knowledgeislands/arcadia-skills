# Sources — where the repo standard comes from

**Refresh:** external-spec · monthly

The authoritative sources behind [the repository standard](standards-repository.md), [the configuration standard](standards-configuration.md), and the generated [rubric](rubric.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standards and structured catalogue, then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). GitHub's settings surface moves (rulesets, security toggles, Actions policy), so this is the skill's memory of where the standard comes from — keep it current.

## Authoritative (GitHub)

| Source | Governs | Last reviewed |
| --- | --- | --- |
| [REST: repository settings][repo-settings] | merge methods, auto-delete-branch, features, description, visibility | 2026-08-10 |
| [REST: branch protection][branch-protection] | the optional `branch-protection` body (PR, `build` check, linear) | 2026-08-10 |
| [Repository rulesets][rulesets] | the modern alternative to classic protection (private-repo path) | 2026-08-10 |
| [REST: Dependabot alerts / fixes][dependabot] | `vulnerability-alerts`, `automated-security-fixes` endpoints | 2026-08-10 |
| [Secret scanning & push protection][secret-scanning] | `security_and_analysis` toggles and their plan/GHAS gating | 2026-08-10 |
| [REST: Actions permissions for a repository][actions] | `allowed_actions` policy | 2026-08-10 |
| [`gh` CLI manual][gh-cli] | `gh repo list/view/edit`, `gh api` — how evidence is read and confirmed live changes are applied | 2026-08-10 |
| [choosealicense.com][choosealicense] | the declared `license` SPDX id — the picker and the reference for license/`LICENSE`/`package.json` conformance | 2026-07-09 |

## Last review

REFRESH last run **2026-08-10**. Re-fetched seven of eight tracked sources (choosealicense proxy-blocked, carried). No drift affecting the standard or rubric; two prior watch-items still hold; two new watch-items added.

- **REST repository settings (docs.github.com, 2026-08-10):** merge-method booleans, `delete_branch_on_merge`, `allow_update_branch`, features, `description`, and `visibility` all confirmed unchanged. Standard current.
- **REST branch protection (2026-08-10):** `required_status_checks.contexts` still returned on GET; the auditor (on `checks`, tolerant of `contexts`) remains correct. `enforce_admins`, `required_linear_history`, `allow_force_pushes`, `allow_deletions` unchanged. Standard current.
- **Repository rulesets (2026-08-10):** no deprecation signal; classic branch protection not deprecated; rulesets coexist. Staying on classic protection for the optional `branch-protection` check remains correct.
- **Dependabot alerts / automated security fixes (2026-08-10):** endpoints and shapes unchanged. Standard current.
- **Secret scanning & push protection (2026-08-10):** new AI-powered secret detection and delegated bypass toggles documented in `security_and_analysis` (additive). Free/public-repo path unchanged. Current catalogue scope (toggling `secret_scanning.status`) is still correct; new toggles are out of scope but noted.
- **REST Actions permissions (2026-08-10):** `/actions/permissions` path and `allowed_actions` enum (`all`/`local_only`/`selected`) unchanged. Standard current.
- **`gh` CLI manual (2026-08-10):** gh v2.97.0 current (security advisory on this release; no credential-handling change affecting the standard). New commands `gh skill` and `gh agent-task` added — out of standard scope. All `gh repo edit` flags the standard uses confirmed present.
- **choosealicense.com (carried, 2026-07-09):** proxy-blocked this pass. SPDX picker unchanged as of prior review.
- **Open watch-items:**
  - **WI-1: `contexts` GET back-compat.** Still populated in the schema this run. The auditor relies on this; re-confirm on each pass.
  - **WI-2: Rulesets vs classic protection.** No deprecation signal yet; re-confirm on each pass.
  - **Secret-scanning AI detection / delegated bypass (new).** New additive `security_and_analysis` toggles. Determine whether to expand the catalogue on a future CONFORM pass.
  - **GitHub workflow lockfile / centralized execution rulesets (new).** Announced on the GitHub roadmap but not yet shipped. Track; no standard change needed until they land.

[repo-settings]: https://docs.github.com/en/rest/repos/repos#update-a-repository
[branch-protection]: https://docs.github.com/en/rest/branches/branch-protection
[rulesets]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets
[dependabot]: https://docs.github.com/en/rest/repos/repos#enable-vulnerability-alerts
[secret-scanning]: https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
[actions]: https://docs.github.com/en/rest/actions/permissions
[gh-cli]: https://cli.github.com/manual/
[choosealicense]: https://choosealicense.com/
