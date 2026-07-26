<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-engineering

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [PKG — PKG engineering rules](#pkg--pkg-engineering-rules)
- [MISE — MISE engineering rules](#mise--mise-engineering-rules)
- [CI — CI engineering rules](#ci--ci-engineering-rules)
- [SCR — SCR engineering rules](#scr--scr-engineering-rules)
- [BUN — BUN engineering rules](#bun--bun-engineering-rules)
- [TSC — TSC engineering rules](#tsc--tsc-engineering-rules)
- [BIO — BIO engineering rules](#bio--bio-engineering-rules)
- [KNIP — KNIP engineering rules](#knip--knip-engineering-rules)
- [SYNC — SYNC engineering rules](#sync--sync-engineering-rules)
- [DEPS — DEPS engineering rules](#deps--deps-engineering-rules)
- [GEN — GEN engineering rules](#gen--gen-engineering-rules)
- [TEST — TEST engineering rules](#test--test-engineering-rules)
- [BUILD — BUILD engineering rules](#build--build-engineering-rules)
- [ENV — ENV engineering rules](#env--env-engineering-rules)
- [TOML — TOML engineering rules](#toml--toml-engineering-rules)

## PKG — PKG engineering rules

- **PKG-1 [WARN · INSPECT] — module package type**
- **PKG-2 [WARN · INSPECT] — Bun package-manager pin**
- **PKG-3 [WARN · INSPECT] — Node engine floor**
- **PKG-4 [FAIL · INSPECT] — closed package coverage manifest**
- **PKG-5 [FAIL · INSPECT] — toolchain dependencies declared**
- **PKG-6 [FAIL · INSPECT] — lint-staged fan-out**

## MISE — MISE engineering rules

- **MISE-1 [WARN · INSPECT] — root toolchain pin**
- **MISE-2 [WARN · INSPECT] — Bun pin drift pair**
- **MISE-3 [WARN · INSPECT] — no legacy tool pins**

## CI — CI engineering rules

- **CI-1 [WARN · INSPECT] — CI installs the declared toolchain**
- **CI-2 [FAIL · INSPECT] — CI runs the canonical gates**

## SCR — SCR engineering rules

- **SCR-1 [FAIL · INSPECT] — ki script naming law**
- **SCR-2 [FAIL · INSPECT] — aggregate audit and conform entrypoints**
- **SCR-3 [FAIL · INSPECT] — retired script families absent**
- **SCR-4 [FAIL · INSPECT] — derived checker entrypoints**
- **SCR-5 [FAIL · INSPECT] — lifecycle clean and prepare scripts**
- **SCR-6 [FAIL · INSPECT] — no test-entrypoint bypass**
- **SCR-7 [FAIL · INSPECT] — runner-neutral test and build entrypoints**
- **SCR-8 [J] — repo-specific scripts retain clear ownership**
  > Do repo-specific scripts have a clear owner and avoid divergent shadows of governed entrypoints?

## BUN — BUN engineering rules

- **BUN-1 [J] — Node environment-loading parity**
  > Where `.env` is loaded, does the loader call `process.loadEnvFile()` safely?

## TSC — TSC engineering rules

- **TSC-1 [FAIL · INSPECT] — type-check passes**
- **TSC-2 [FAIL · INSPECT] — universal TypeScript invariants**
- **TSC-3 [J] — strictness is not weakened**
  > Does the effective TypeScript configuration preserve the required strictness flags?

## BIO — BIO engineering rules

- **BIO-1 [FAIL · INSPECT] — Biome read-only gate passes**
- **BIO-2 [FAIL · INSPECT] — Biome shared configuration**

## KNIP — KNIP engineering rules

- **KNIP-1 [FAIL · INSPECT] — Knip configuration exists**
- **KNIP-2 [FAIL · INSPECT] — Knip gate passes**

## SYNC — SYNC engineering rules

- **SYNC-1 [FAIL · INSPECT] — dependency synchronisation passes**

## DEPS — DEPS engineering rules

- **DEPS-1 [WARN · INSPECT] — dependencies are current**

## GEN — GEN engineering rules

- **GEN-1 [FAIL · INSPECT] — generated surfaces share exclusions**

## TEST — TEST engineering rules

- **TEST-1 [WARN · INSPECT] — test capability and Vitest profile**
- **TEST-2 [FAIL · INSPECT] — Vitest coverage thresholds**
- **TEST-3 [WARN · INSPECT] — Vitest test-source exclusion**
- **TEST-4 [WARN · INSPECT] — Vitest monorepo scoping**
- **TEST-5 [FAIL · INSPECT] — Vitest coverage command passes**
- **TEST-6 [J] — tests are colocated and genuinely complete**
  > Are tests colocated with their source and does their coverage evidence substantiate the 100% claim?

## BUILD — BUILD engineering rules

- **BUILD-1 [FAIL · INSPECT] — compiled-build shape**
- **BUILD-2 [WARN · INSPECT] — build TypeScript configuration**
- **BUILD-3 [WARN · INSPECT] — compiled shared TypeScript base**
- **BUILD-4 [FAIL · INSPECT] — CLI chmod iff rule**

## ENV — ENV engineering rules

- **ENV-1 [WARN · INSPECT] — environment example template**
- **ENV-2 [FAIL · INSPECT] — development NODE_ENV confinement**
- **ENV-3 [J] — real environment files are protected**
  > Are real environment files ignored and is the loader Node-parity-safe?
- **ENV-4 [J] — XDG paths are honoured**
  > Do config, data, cache, and state paths honour the appropriate XDG environment variable?

## TOML — TOML engineering rules

- **TOML-1 [WARN · INSPECT] — engineering selector table**
- **TOML-2 [WARN · INSPECT] — engineering configuration validates down**
