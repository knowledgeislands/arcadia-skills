---
areas: { FND: 14, GOV: 37, OPS: 4, RTP: 7 }
---

# Roadmap issue ledger

This ledger reserves fixed issuing-area namespaces. Allocate the next work item in its area as one greater than that area's high-water mark; never lower a value or reuse an issued number after a record is pruned. Areas are not mutable themes or groups.

- `FND` reserves through `014`.
- `GOV` reserves through `037`.
- `OPS` reserves through `004`.
- `RTP` reserves through `007`.
