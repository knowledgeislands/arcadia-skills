# `ki-binding-chezmoi` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 5 remediation is authorised

## Dependency and ownership

`ki-binding-chezmoi` has a valuable composition boundary: portable inventory stays with `ki-binding`, generic source-repo safety with `ki-repo-dotfiles-chezmoi`, and this skill owns the rendering seam. The current source registry is house-only and lacks direct chezmoi authority; official documentation confirms template, data, secret-function, diff, and apply behavior.

The representative source contains the canonical data, partial, and three target templates. Those are source-structure observations, not rendered, applied, or activated runtime evidence.

## Mechanical trace and limits

Five tests, publication sync, and the composed focused audit pass. The checker accepts any MCP-named structured file to depth six, a partial filename containing `mcp-servers-json`, and any template substring reference. It neither parses the selected source and template nor proves canonical identity or definition equality. Preceding composition evidence is always reported not applicable, making standalone success easy to overread.

Conform writes nothing but recommends `chezmoi diff` and `apply`. The real partial can resolve secret references and invoke external tools during rendering; live render was correctly not run without authority. No exact eval or outcome evidence exists, and tests omit malformed/ambiguous data, misplaced partials, comment-only references, rendered validity, definition parity, redaction, apply failure, and client activation.

## Candidate improvements

1. Constrain discovery to documented chezmoi semantics and parse the selected source and actual template reference, with negative fixtures.
2. Add a contained no-secret/no-apply render fixture comparing normalized canonical definitions to rendered projection while keeping installed state separate.
3. Register current official templating, diff, and apply sources and reconcile data-merge terminology with the actual include pattern.
4. Report prerequisite evidence as verified, missing, or unavailable rather than using an always-not-applicable composition criterion.

## Carry-forward criteria

Structural source, deterministic render parity, secret-safe preview, applied target, and client activation are distinct. Composition must expose prerequisite evidence, and filename or substring detection cannot prove source identity, template execution, or equality.

## Local evidence

- `skills/environment/ki-binding-chezmoi/SKILL.md`
- `skills/environment/ki-binding-chezmoi/references/standards-chezmoi-mcp-rendering.md`
- `skills/environment/ki-binding-chezmoi/references/sources.md`
- `skills/environment/ki-binding-chezmoi/scripts/rubric/contexts/binding-chezmoi.ts`
- `skills/environment/ki-binding-chezmoi/scripts/rubric/items/bindchez.ts`
- `skills/environment/ki-binding-chezmoi/scripts/rubric/items/index.test.ts`
