# Mode CONFORM — bring an existing tool repository up to standard

_On-demand procedure for `ki-tools` CONFORM. The hosted catalogue owns its bounded executable-bit and configuration-marker actions; this procedure coordinates the judgment repairs and sibling skills that remain outside that transaction._

1. Run **AUDIT** first, so changes begin from a known gap list.
2. Run `ki repo conform --repo <repo-path> --skill ki-tools`. The host may set executable bits on verified physical `bin/*` files and `install.sh`, and append `["knowledgeislands/ki-agentic-harness:ki-tools"]` to an existing physical, parseable `.ki-config.toml`. Repeated item requests coalesce into bounded commands and one configuration draft.
3. Fix report-only gaps by adapting the `tools-mgit` reference rather than inventing:
   - Missing `install.sh` → adapt the `REPO`, `<TOOL>_INSTALL_DIR` / `<TOOL>_VERSION` overrides, and download → verify → install flow.
   - Missing `--version` → add one version marker literal and the `--version`/`-V` case.
   - An evolving persisted manifest → introduce its own strictly validated integer schema, write the current form explicitly, and choose a deliberate migration or rejection path for earlier forms; do not add a schema to stable leaf metadata.
   - Missing `CHANGELOG.md` → seed either a Keep a Changelog `## [Unreleased]` head or a declared current-release baseline, matching the repository's release state.
   - A physical manual → add a `mandoc -T lint man/<tool>.1` CI gate and ensure both release and `--link` installation publish it alongside the executable.
   - Missing shared CLI behaviour → make `--help` succeed; use statuses 0 (success), 1 (operational error), and 2 (invalid owned syntax); use the singular `completion <shell>` interface; and return a namespaced error plus usage for invalid owned syntax, including when `--help` is also present.
   - A physical manual with an unclear layout → use the portable roff macro set, insert `\&` after each `.SH` / `.SS`, then inspect `mandoc -Tutf8 man/<tool>.1 | col -b` after lint passes.
   - Missing CI / shellcheck / Bats → adapt `.github/workflows/ci.yml` and the matching test suite.
4. For a TS/Bun tool, run `ki-engineering` CONFORM for its toolchain and ensure its qualified declaration is present.
5. Re-run the `ki-tools` and `ki-repo` audits until clean; a shell tool should also be shellcheck-clean and Bats-green locally.
