<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-skills

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [LAY — File existence & layout](#lay--file-existence--layout)
- [FM — Frontmatter document](#fm--frontmatter-document)
- [NAME — Frontmatter: name](#name--frontmatter-name)
- [DESC — Frontmatter: description](#desc--frontmatter-description)
- [OPT — Frontmatter: optional fields](#opt--frontmatter-optional-fields)
- [SIZE — Body: size & conciseness](#size--body-size--conciseness)
- [REF — Progressive disclosure & references](#ref--progressive-disclosure--references)
- [BODY — Body content quality](#body--body-content-quality)
- [SCRIPT — Scripts & executable code](#script--scripts--executable-code)
- [KI-CHECKER — Knowledge Islands checker contract](#ki-checker--knowledge-islands-checker-contract)
- [KI-LINK — Knowledge Islands linking & portability](#ki-link--knowledge-islands-linking--portability)
- [PORT — Runtime portability](#port--runtime-portability)
- [KI-SHAPE — Knowledge Islands skill shape](#ki-shape--knowledge-islands-skill-shape)
- [KI-INVOKE — Invocation protocol](#ki-invoke--invocation-protocol)
- [PROC — Process / meta](#proc--process--meta)
- [COLL — Cross-skill collision](#coll--cross-skill-collision)
- [LONG — Longevity](#long--longevity)

## LAY — File existence & layout

- **LAY-1 [FAIL · INSPECT] — SKILL.md exists at the skill root**
- **LAY-2 [FAIL · INSPECT] — the skill is a directory named after the skill**
- **LAY-3 [FAIL · INSPECT] — optional directories use standard names**
- **LAY-4 [FAIL · INSPECT] — file references use forward slashes**
- **LAY-5 [J] — reference chains are shallow**
  > Are supporting files one level deep from SKILL.md, without nested reference chains?
- **LAY-6 [J] — supporting files are named by their content**
  > Do supporting file names clearly describe their contents?

## FM — Frontmatter document

- **FM-1 [FAIL · INSPECT] — SKILL.md begins with a valid YAML frontmatter mapping**

## NAME — Frontmatter: name

- **NAME-1 [FAIL · INSPECT] — name is present**
- **NAME-2 [FAIL · INSPECT] — name is no longer than 64 characters**
- **NAME-3 [FAIL · INSPECT] — name uses lowercase letters, digits, and hyphens only**
- **NAME-4 [FAIL · INSPECT] — name has no leading or trailing hyphen and no consecutive hyphens**
- **NAME-5 [FAIL · INSPECT] — name matches the parent directory name exactly**
- **NAME-6 [FAIL · INSPECT] — name contains no XML tags or reserved words**
- **NAME-7 [J] — name is specific rather than generic**
  > Is this name concrete and appropriately scoped for the capability it governs?

## DESC — Frontmatter: description

- **DESC-1 [FAIL · INSPECT] — description is present and non-empty**
- **DESC-2 [FAIL · INSPECT] — description is no longer than 1024 characters**
- **DESC-3 [FAIL · INSPECT] — description contains no XML tags**
- **DESC-4 [J] — description states what the skill does and when to use it**
  > Does the description state both what this skill does and when it should be used?
- **DESC-5 [J] — description is written in the third person**
  > Is the description consistently written in the third person?
- **DESC-6 [J] — description includes concrete trigger phrases**
  > Does the description include concrete trigger phrases a user would say?
- **DESC-7 [J] — description leans toward firing and front-loads its main trigger**
  > Does the description lean toward appropriate selection and front-load its most important trigger?
- **DESC-8 [J] — description avoids vague phrasing**
  > Does the description avoid vague phrases such as "helps with documents"?
- **DESC-9 [J] — description may state explicit non-triggers where collision is likely**
  > Where skill-selection collision is likely, would explicit non-triggers improve routing?

## OPT — Frontmatter: optional fields

- **OPT-1 [FAIL · INSPECT] — compatibility is between 1 and 500 characters when present**
- **OPT-2 [FAIL · INSPECT] — metadata is a string-to-string map when present**
- **OPT-3 [FAIL · INSPECT] — tool declarations use valid tool specifications**
- **OPT-4 [FAIL · INSPECT] — license declarations are non-empty YAML string scalars**
- **OPT-5 [J] — runtime-specific fields are flagged where portability matters**
  > Where cross-platform portability matters, are runtime-specific fields clearly identified?
- **OPT-6 [J] — manually timed side effects disable model invocation**
  > Do side-effecting or manually timed workflows set disable-model-invocation: true where appropriate?
- **OPT-7 [J] — discrete modes have an ordered argument hint**
  > Where the skill has discrete modes, are they named and alphabetically ordered in argument-hint?

## SIZE — Body: size & conciseness

- **SIZE-1 [WARN · INSPECT] — body is under 500 lines**
- **SIZE-2 [WARN · INSPECT] — body stays below approximately 5,000 tokens**
- **SIZE-3 [J] — body omits knowledge the agent already has**
  > Does the body avoid spending tokens on knowledge a competent agent already has?
- **SIZE-4 [J] — body is an overview that routes to detail**
  > Does the body work as an overview that routes rarely used detail into supporting files?
- **SIZE-5 [WARN · INSPECT] — the optional footprint report measures every loaded component**

## REF — Progressive disclosure & references

- **REF-1 [J] — rarely used detail is separated into on-demand files**
  > Is detailed or rarely used material routed to on-demand files, with mutually exclusive domains split?
- **REF-2 [J] — supporting files are referenced from SKILL.md with a loading cue**
  > Is every supporting file referenced from SKILL.md with clear guidance on when to load it?
- **REF-3 [WARN · INSPECT] — long reference files open with a table of contents**
- **REF-4 [J] — script execution intent is explicit**
  > Is the execution intent for each script explicit: run it or read it?
- **REF-5 [J] — many-moded skills route independently invoked procedures**
  > Where this skill has many independently invoked modes, does SKILL.md retain the shared model and dispatch while flat mode files hold their procedures?

## BODY — Body content quality

- **BODY-1 [J] — instruction freedom matches task fragility**
  > Does the level of instruction freedom match this task’s fragility?
- **BODY-2 [J] — the main body avoids time-sensitive content**
  > Does the main body avoid time-sensitive content, containing legacy detail appropriately?
- **BODY-3 [J] — terminology is consistent**
  > Does the skill use one consistent term for each concept?
- **BODY-4 [J] — style-sensitive output includes concrete examples**
  > Where output quality depends on style, are there concrete input and output examples?
- **BODY-5 [J] — one default approach has an escape hatch**
  > Does the skill give one default approach with a clear escape hatch rather than a menu?
- **BODY-6 [J] — template strictness matches its contract**
  > Does any template make its strictness appropriate and explicit?
- **BODY-7 [J] — multi-step work has a copyable checklist and feedback loop where needed**
  > Does multi-step work provide a copyable checklist and, when quality-critical, a feedback loop?
- **BODY-8 [J] — rules state their rationale**
  > Do rules explain their rationale rather than stating bare MUST or NEVER directives?

## SCRIPT — Scripts & executable code

- **SCRIPT-1 [J] — scripts handle expected errors**
  > Do scripts handle expected errors rather than punting them to an agent?
- **SCRIPT-2 [J] — scripts explain configuration values**
  > Are configuration values justified rather than unexplained magic numbers?
- **SCRIPT-3 [J] — runtime dependencies and MCP tools are explicit**
  > Are runtime dependencies verified and MCP tools fully qualified?
- **SCRIPT-4 [J] — deterministic reusable logic is pre-written**
  > Is deterministic, frequently reused logic pre-written rather than regenerated each run?
- **SCRIPT-5 [J] — validation errors are actionable**
  > Do validation errors name the problem and valid options?
- **SCRIPT-6 [J] — batch and destructive work is planned and validated first**
  > Do batch or destructive operations plan and validate before execution?
- **SCRIPT-7 [J] — target-repository scripts are copied**
  > Are target-repository scripts copied rather than symlinked or referenced outside the repository?
- **SCRIPT-8 [FAIL · INSPECT] — top-level scripts expose command help**

## KI-CHECKER — Knowledge Islands checker contract

- **KI-CHECKER-1 [J] — governance checkers receive the repository root and scope themselves**
  > Does a governance checker receive the repository root, resolve its own scope, and stop with one NOT_APPLICABLE result when that scope is absent?
- **KI-CHECKER-2 [FAIL · INSPECT] — skill script imports remain inside the vendored payload**
- **KI-CHECKER-3 [FAIL · INSPECT] — ki-skills is the self-governing checker-contract root**
- **KI-CHECKER-4 [FAIL · INSPECT] — structured rubric items follow the uniform family layout**
- **KI-CHECKER-5 [FAIL · INSPECT] — shared and internal script packaging is explicit**

## KI-LINK — Knowledge Islands linking & portability

- **KI-LINK-1 [FAIL · INSPECT] — internal links use standard relative Markdown links**
- **KI-LINK-2 [FAIL · INSPECT] — relative link targets resolve**
- **KI-LINK-3 [J] — other skills are referred to by name**
  > Are other skills referred to by their public name rather than by a file path?
- **KI-LINK-4 [J] — the house toolchain passes**
  > Does the repository pass its configured Biome, Prettier, and markdownlint toolchain?

## PORT — Runtime portability

- **PORT-1 [FAIL · INSPECT] — portable contracts make runtime assumptions explicit**

## KI-SHAPE — Knowledge Islands skill shape

- **KI-SHAPE-1 [J] — standard skills resolve base bindings at runtime**
  > Does this standard skill resolve base bindings at runtime without hard-coding one base?
- **KI-SHAPE-2 [WARN · INSPECT] — skills compose rather than extend**
- **KI-SHAPE-3 [J] — the skill declares its kind**
  > Does the skill correctly and clearly declare its governance or process kind?
- **KI-SHAPE-4 [J] — a skill validates only its own configuration table**
  > Does this skill validate only its own configuration table and ignore unrelated tables?
- **KI-SHAPE-5 [J] — governance skills expose universal modes**
  > Does this governance skill expose the universal modes with appropriate additional modes only?
- **KI-SHAPE-6 [J] — governance skills use the KI file shape**
  > Does this KI governance skill use the required reference and executable file shape?
- **KI-SHAPE-7 [WARN · INSPECT] — behaviour-changing skills define and check their anchor**
- **KI-SHAPE-8 [WARN · INSPECT] — governance checkers emit the canonical checker response**
- **KI-SHAPE-9 [WARN · INSPECT] — mechanical work belongs in the checker**
- **KI-SHAPE-10 [J] — skills do not assume private user configuration**
  > Does the skill avoid assuming private personal configuration?
- **KI-SHAPE-11 [FAIL · INSPECT] — governance skills expose HELP**
- **KI-SHAPE-12 [WARN · INSPECT] — governance mode vocabulary is canonical and complete**
- **KI-SHAPE-13 [WARN · INSPECT] — mode headings have a canonical structure**
- **KI-SHAPE-14 [WARN · INSPECT] — REFRESH states its ownership precondition**
- **KI-SHAPE-15 [FAIL · INSPECT] — governed source entrypoints have a uniform shape**
- **KI-SHAPE-16 [WARN · INSPECT] — target files have declared ownership**
- **KI-SHAPE-17 [FAIL · INSPECT] — dependencies are declared explicitly**

## KI-INVOKE — Invocation protocol

- **KI-INVOKE-1 [J] — HELP is the safe bare-invocation default**
  > Does explicit help stop after a generated HELP explanation, while an unclear interactive invocation explains the skill before asking for a mode?

## PROC — Process / meta

- **PROC-1 [J] — the skill was built evaluation-first**
  > Was this skill built evaluation-first with meaningful scenarios against a no-skill baseline?
- **PROC-2 [J] — the skill has been tested across intended models and real use**
  > Has the skill been tested across its intended models and through real usage?

## COLL — Cross-skill collision

- **COLL-1 [WARN · INSPECT] — quoted trigger phrases are not shared across skills**
- **COLL-2 [J] — adjacent skills have non-overlapping scope and reciprocal off-ramps**
  > Do adjacent skills have non-overlapping scopes and reciprocal off-ramps where their requests are genuinely adjacent?

## LONG — Longevity

- **LONG-1 [J] — volatile facts have a refresh path**
  > Do volatile facts resolve at runtime or have a tracked source list and refresh path?
- **LONG-2 [J] — the refresh path has a cadence**
  > Does the refresh path have an appropriate declared cadence and scheduled execution where supported?
- **LONG-3 [WARN · INSPECT] — the declared refresh cadence is being met**
- **LONG-4 [WARN · INSPECT] — the refresh marker is present and coherent**
