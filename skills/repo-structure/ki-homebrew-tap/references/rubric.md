<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-homebrew-tap

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [TAP — tap structure](#tap--tap-structure)
- [CONFIG — configuration](#config--configuration)

## TAP — tap structure

- **TAP-1 [FAIL · INSPECT] — formula directory**
- **TAP-2 [WARN · INSPECT] — formula class**
- **TAP-3 [WARN · INSPECT] — formula fields**
- **TAP-4 [WARN · INSPECT] — formula description style**
- **TAP-5 [WARN · INSPECT] — versioned source URLs**
- **TAP-6 [WARN · INSPECT] — formula discoverability**
- **TAP-7 [WARN · DERIVED] — Homebrew audit**
- **TAP-J1 [J] — tap naming**
  > Does the repository name follow the `homebrew-<name>` convention without an unsafe rename?
- **TAP-J2 [J] — meaningful formula test**
  > Does each formula test exercise its installed binary with a meaningful assertion?
- **TAP-J3 [J] — install correctness**
  > Does each `def install` block install the artefact the tool actually ships?
- **TAP-J4 [J] — source integrity**
  > Do each source URL, version, and checksum correspond to the intended release archive?
- **TAP-J5 [J] — fresh README entries**
  > Are README formula rows complete, current, and accurate?
- **TAP-J6 [J] — CI Homebrew coverage**
  > When local Homebrew is unavailable, does CI run the appropriate Homebrew test-bot checks?

## CONFIG — configuration

- **CONFIG-1 [WARN · INSPECT] — identity marker**
