---
areas: { FND: 18, GOV: 46, OPS: 5, REV: 1, RTP: 8 }
---

# Roadmap issue ledger

This ledger reserves fixed issuing-area namespaces. Allocate the next work item in its area as one greater than that area's high-water mark; never lower a value or reuse an issued number after a record is pruned. Areas are not mutable themes or groups.

- `FND` reserves through `018`.
- `GOV` reserves through `046`.
- `OPS` reserves through `005`.
- `REV` reserves through `001`.
- `RTP` reserves through `008`.
