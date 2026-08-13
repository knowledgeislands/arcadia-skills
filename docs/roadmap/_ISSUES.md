---
areas: { FND: 14, GOV: 42, OPS: 4, REV: 1, RTP: 8 }
---

# Roadmap issue ledger

This ledger reserves fixed issuing-area namespaces. Allocate the next work item in its area as one greater than that area's high-water mark; never lower a value or reuse an issued number after a record is pruned. Areas are not mutable themes or groups.

- `FND` reserves through `014`.
- `GOV` reserves through `042`.
- `OPS` reserves through `004`.
- `REV` reserves through `001`.
- `RTP` reserves through `008`.
