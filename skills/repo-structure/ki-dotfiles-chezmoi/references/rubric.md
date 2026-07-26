<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-dotfiles-chezmoi

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [CHEZMOI — chezmoi repository shape](#chezmoi--chezmoi-repository-shape)
- [BIN — bin source naming](#bin--bin-source-naming)
- [GIT — Git hygiene](#git--git-hygiene)
- [PATTERN — app-mutated configuration](#pattern--app-mutated-configuration)
- [CONFIG — configuration editing](#config--configuration-editing)
- [LAYER — instruction layering](#layer--instruction-layering)
- [ETIQ — audit etiquette](#etiq--audit-etiquette)
- [SYNC — standard synchronisation](#sync--standard-synchronisation)

## CHEZMOI — chezmoi repository shape

- **CHEZMOI-1 [FAIL · INSPECT] — managed ignore file**
- **CHEZMOI-2 [WARN · INSPECT] — template support directory**
- **CHEZMOI-J1 [J] — chezmoiignore negation intent**
  > Are `.chezmoiignore` negations deliberate, documented exceptions to broad ignores?

## BIN — bin source naming

- **BIN-1 [WARN · INSPECT] — bin source-attribute prefix**

## GIT — Git hygiene

- **GIT-1 [FAIL · INSPECT] — Git lock hygiene**

## PATTERN — app-mutated configuration

- **PATTERN-J1 [J] — app-mutated config pattern choice**
  > For each app-mutated configuration file, does the selected pattern match its template ownership, required native lifecycle visibility, and app-owned scope?
- **PATTERN-J2 [J] — native fragment-binding boundary**
  > Does every native fragment binding state its canonical source, target, selector, ownership and removal policy, and explicit safe-adoption boundary?

## CONFIG — configuration editing

- **CONFIG-J1 [J] — format-preserving editor selection**
  > Do Pattern A and Pattern C writers use a format-appropriate edit API, define absent-file and path behaviour, fail closed, and demonstrate syntax preservation and idempotence?

## LAYER — instruction layering

- **LAYER-J1 [J] — agent-instruction layering**
  > Does each piece of CLAUDE.md-style guidance sit at the correct repo-local, user-level, or persistent-memory layer?

## ETIQ — audit etiquette

- **ETIQ-J1 [J] — audit etiquette**
  > Were findings reported with a file, concise problem statement, and options before a change was applied?

## SYNC — standard synchronisation

- **SYNC-1 [J] — standard and rubric synchronisation**
  > Do the standard, structured rubric items, and mechanical behaviour still agree?
