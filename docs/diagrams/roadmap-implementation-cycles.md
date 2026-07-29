# Roadmap and implementation cycles

The roadmap cycle makes work ready; the implementation cycle delivers one ready item; the acceptance cycle closes and eventually prunes it.

Gold diamonds are manual authority gates.

`ki-batch` is planned to reduce repeated preparation and coordinate repeated `ki-implement` cycles, but it does not bypass the selection, ready, acceptance, or destructive-cleanup gates unless a batch authorisation explicitly grants the relevant authority.

![Roadmap and implementation cycles](roadmap-implementation-cycles.svg)

The [DOT source](roadmap-implementation-cycles.dot) is canonical.
