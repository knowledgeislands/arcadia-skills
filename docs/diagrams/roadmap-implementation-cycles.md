# Roadmap and implementation cycles

The roadmap cycle makes work ready; the implementation cycle delivers one ready item; the acceptance cycle closes and eventually prunes it.

Gold diamonds are manual authority gates.

`ki-batch` reduces repeated preparation, records the reviewed authority over named candidates, and runs one bounded, fresh-grounded cycle from that authority. It asks known questions before delivery and stops on uncertainty. Each item normally stops at Acceptance. Only explicit named acceptance authority may continue through `ki-accept`; pruning remains separate and requires an explicit roadmap-item path or glob.

![Roadmap and implementation cycles](roadmap-implementation-cycles.svg)

The [DOT source](roadmap-implementation-cycles.dot) is canonical.
