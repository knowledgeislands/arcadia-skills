---
areas: { FND: 19, GOV: 47, OPS: 6, REV: 1, RTP: 8 }
---

# Roadmap issue ledger

This ledger reserves fixed issuing-area namespaces. Allocate the next work item in its area as one greater than that area's high-water mark; never lower a value or reuse an issued number after a record is pruned. Areas are not mutable themes or groups.

- `FND` reserves through `019`.
- `GOV` reserves through `047`.
- `OPS` reserves through `006`.
- `REV` reserves through `001`.
- `RTP` reserves through `008`.
