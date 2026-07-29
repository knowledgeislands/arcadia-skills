# Evaluation frameworks review

This reference records a bounded review of language-model and agent-evaluation sources against the harness evaluation material as it stands on 2026-07-29.

It does not adopt a dataset, benchmark runner, evaluation service, trace store, or dependency.

## Primary sources reviewed

- [EuroEval](https://euroeval.com/) and [its source repository](https://github.com/EuroEval/EuroEval) — a benchmark framework covering several language-model classes across more than 30 European languages, with dataset-creation scripts and test coverage in its repository.
- [OpenAI trace grading](https://platform.openai.com/docs/guides/trace-grading) and the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) — trace grading assigns structured labels or scores to an agent's end-to-end trace; the SDK offers tracing, guardrails, sessions, and handoffs as runtime facilities.

EuroEval is a model benchmark with language datasets and runner assumptions.

Trace grading is an agent-observability technique that evaluates a recorded execution, including decisions and tool calls.

Neither source is a direct specification for the harness's skill-quality evals.

## Comparison

| Dimension | Source evidence | Current KI surface | KI inference and outcome |
| --- | --- | --- | --- |
| Task definition | EuroEval defines benchmark tasks and reconstructible datasets; trace grading needs declared grader criteria. | Each local scenario declares a prompt, deterministic regex assertions, and a judge rubric. | **Aligned.** Continue to make the evaluated behaviour explicit and version it beside the scenario. |
| Fixtures | EuroEval publishes dataset-creation scripts, making benchmark data reproducible. | Scenario definitions are TypeScript source, run in an isolated temporary directory; no external dataset is required. | **Aligned for this scope.** Keep scenarios self-contained unless a future task needs a real fixture. |
| Scoring | EuroEval has task-specific benchmark metrics; trace grading records structured grader labels or scores. | KI combines deterministic assertions with a 0–5 model judge and treats results as advisory. | **Deliberate difference.** Do not import benchmark metrics or turn stochastic behavioural evaluation into a merge gate. |
| Result evidence | EuroEval supports result records; trace grading evaluates an execution record. | The harness prints per-scenario outcomes and costs; generated results are intentionally regenerable rather than checked in. | **Aligned.** Retain reproducible source plus concise run evidence, not a permanent evaluation service or trace database. |
| Agent behaviour | Trace grading can inspect end-to-end tool use and execution decisions. | The local harness compares a skill-disabled baseline against a skill-loaded treatment, but does not claim complete runtime traces. | **Deliberate boundary.** Do not add a trace capture protocol until there is a runtime-portable, separately authorised need. |
| Reproducibility | EuroEval's dataset-generation scripts and test suite support repeatable benchmark preparation. | `--runs` averages nondeterministic model calls; the README states model, baseline contamination, and cost limits. | **Aligned.** Preserve declared model, runs, assertions, judge rubric, and advisory status in every evaluation report. |

## Result

The harness already separates task intent, deterministic checks, model judgment, and advisory interpretation.

That separation is the transferable practice from the reviewed sources.

No benchmark dataset, metric suite, external evaluation framework, trace store, or OpenAI-specific runtime facility is adopted.

Potential follow-up belongs to the `evals/` owner only if a future harness change needs repeatable real-agent execution evidence beyond the existing prompt-level skill comparison.

Such a proposal must first define a portable artifact, its privacy boundary, fixture/reset method, score interpretation, and whether its results are advisory or gating.

## Local evidence considered

- `evals/README.md` — scenario purpose, baseline/treatment method, deterministic assertions, model judge, advisory status, and regeneration policy.
- `evals/harness.ts` — isolated execution, explicit model/runs, assertion aggregation, judge output, and non-gating exit behaviour.
- `evals/scenarios/` — one source-controlled scenario module per assessed skill.
- `docs/decisions/references/runtime-parity-scorecard.md` — evaluation execution is not yet proven across both supported runtimes.

## Review record

Reviewed 2026-07-29.

No external framework or infrastructure was adopted.
