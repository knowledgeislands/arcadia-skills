---
code: RTP
---

# Runtime portability roadmap

## Blocking

Actively broken, or blocking the `Next` horizon: takes priority over everything else and must clear before `Next` work proceeds. Empty means nothing is on fire.

## Next

Scoped and ready to start — the immediate queue, picked up before anything in **Soon** or **Future**.

## Soon

Understood and roughly scoped but not yet started — worth doing once the **Next** queue clears, ahead of anything still speculative.

## Waiting for

Worth doing, but presently blocked on an external dependency or decision. Revisit when its named condition changes; do not use this horizon for intentionally paused work.

### Add Codex housekeeping when a safe contract exists

Create `ki-housekeeping-codex` only after Codex exposes an official or documented selected-repository identity together with supported retention, cleanup, and safe-conform boundaries for accumulated state. Do not add an empty symmetric capability or infer ownership from undocumented caches.

### Make KI MCP servers reachable from Cowork

Choose between sandbox-bundled servers and authenticated remote endpoints for host-local KI MCP servers in Cowork, then prove one supported path. Resolve the `ki-plugins` license and visibility conflict as part of that decision. Unblock when the owner selects the sandbox-versus-endpoint security posture and settles the plugin's license and visibility. Web remains a separate, manual-connector concern.

## Parked

Intentionally paused work with no current attention. Revisit only when its priority or named return trigger changes.

## Future

Speculative or not yet scoped — items marked _(candidate)_ need a scoping pass (or a decision to drop them) before they're actionable.

### Route multi-machine harness state through durable homes

Produce a finite routing table or decision record assigning each state class to repository tracking, knowledge-base content, synchronized personal configuration, or intentionally disposable machine-local storage. Cover project memory, runtime settings and hooks, learned patterns, and caches; create follow-up migrations only for state proven to be in the wrong home.

### Evaluate agent-native developer environments and remote session workflows _(candidate)_

Evaluate [Zed](https://zed.dev/), [Herdr](https://herdr.dev/), and [Pi](https://pi.dev/) as potential runtime or session-integration surfaces, with [Mosh](https://mosh.org/) as remote-terminal context. Determine whether any supported interface warrants a KI runtime binding, a portable session contract, or only documented personal workflow guidance. Do not add runtime configuration, installation instructions, or compatibility claims until a target exposes a precise, supportable integration boundary.
