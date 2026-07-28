---
code: GOV
---

# Governance consistency roadmap

## Blocking

Actively broken, or blocking the `Next` horizon: takes priority over everything else and must clear before `Next` work proceeds. Empty means nothing is on fire.

## Next

Scoped and ready to start — the immediate queue, picked up before anything in **Soon** or **Future**.

## Soon

Understood and roughly scoped but not yet started — worth doing once the **Next** queue clears, ahead of anything still speculative.

## Waiting for

Worth doing, but presently blocked on an external dependency or decision. Revisit when its named condition changes; do not use this horizon for intentionally paused work.

## Parked

Intentionally paused work with no current attention. Revisit only when its priority or named return trigger changes.

## Future

Speculative or not yet scoped — items marked _(candidate)_ need a scoping pass (or a decision to drop them) before they're actionable.

### Separate Knowledge Islands policy from portable governance _(candidate)_

Write a compact boundary matrix separating portable contract, Knowledge Islands estate policy, and runtime binding. Use it to identify when a principle first expressed in the Harness should return to Arcadia Principal as canonical philosophy; when it should mature into a portable formal contract in KI Specifications; when it remains reusable Harness mechanics; and when it is only a runtime-specific binding. The Website publishes or routes those source-owned bodies without becoming their authority. Do not split standards or redesign composition unless the matrix exposes a concrete ownership conflict.

### Roll Feature Definitions out across the repository fleet _(candidate)_

Select one named repository with externally visible behaviour and an owner, then pilot the format there. Do not begin fleet rollout before that pilot exists.

### Add engineering change value profiles to the verb map _(candidate)_

Define a compact, evidence-backed way to compare engineering changes without collapsing them into one misleading score. The profile should cover new capability, comprehensibility, maintenance reduction from duplicated or divergent implementation, reliability and risk reduction, leverage across repositories or agents, and delivery cost and reversibility. Decide which dimensions belong on each work verb or plan, how claims become measurable evidence, and how the profile informs roadmap ordering without becoming ceremony for small fixes.

### Review interpretable context methodology and current agentic practice _(candidate)_

Once the harness's own governance and orchestration contracts are stable, assess [Interpretable Context Methodology: Folder Structure as Agentic Architecture](https://arxiv.org/abs/2603.16021) alongside current agent models, runtimes, and orchestration approaches. Compare its filesystem-visible stages, layered context loading, local mechanical scripts, and human review points with the harness's skills, durable artifacts, shared modules, plans, and runtime bindings. Extract only evidence-backed improvements: retain differences that serve this architecture, record any adopted principle in its owning decision or standard, and avoid changing the harness merely to mirror an external model.

### Review language-model evaluation frameworks _(candidate)_

Review robust evaluation frameworks such as [EuroEval](https://euroeval.com/), which benchmarks language models across 30+ European languages and is part of the Horizon Europe [TrustLLM project](https://cordis.europa.eu/project/id/101135671), alongside agentic and harness-focused evaluation approaches. Determine what is transferable to this repository's `evals/` surface: benchmark design, multilingual coverage, reproducibility, dataset governance, result reporting, and the boundary between evaluating a model and evaluating an agent-plus-harness system. Treat external frameworks as research sources, not dependencies or an adoption commitment; record only evidence-backed improvements in the owning evaluation standard or plan.
