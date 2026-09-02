# Knowledge Islands interactive website standard

## 1. Purpose

Use this implementation for a single interactive browser application such as a dashboard. It is mutually exclusive with the content implementation.

## 2. Current implementation

The application uses React, React DOM, Vite, and the official React Vite plugin. `index.html` is the application entry and loads a `src/main.tsx` or `src/main.jsx` module. `vite build` emits `dist/`; Vite's default `build.outDir` is already `dist`.

The root package scripts expose `ki:site:build` using `vite build` and `ki:site:dev` using `vite`. A `workspaces/site` workspace, a legacy top-level `site/`, or a flat root is valid, provided the command and output resolve within the same site root.

## 3. Static publication

The output is a client-only static application. A host serving client-side routes must provide an SPA fallback to `index.html`. That setting belongs to the hosting adapter. Server-side Worker code is not implied by React or Vite.

## 4. The application is rendered by a test

An interactive application must be rendered by its own test suite, in whatever forms it has — read-only and editing, populated and empty — not only reasoned about through the modules beneath it. A suite that exercises the model and never builds the tree cannot see the faults that only exist once it is built: a control drawn inside a layer that takes no pointer events, a helper referenced above the line that declares it, a hook order that changes with a prop.

Rendering to static markup is enough and is the cheaper default. `react-dom/server` is already present wherever React is, so it needs no DOM environment and no additional dependency; a component that throws throws either way. Reach for a DOM only when the assertion genuinely needs one, such as measuring layout or dispatching events.

Do not substitute a lint rule for this. A use-before-declaration rule does not fire when the call sits inside a closure, even where the closure is invoked synchronously, so it reports nothing while the application throws on first paint.

## 5. The test pattern matches every file it should

Where the site declares a test include, that pattern must cover the component file extension as well as the module one — `.tsx` alongside `.ts` for a React application, and the `.jsx` pair for a JavaScript one.

This is worth stating because of how it fails. A pattern matching only `.ts` does not error on a `.tsx` test: it silently collects nothing, and the suite reports every other test passing. The signal a reader takes from a green run is exactly the signal a missing test file removes, so the omission is invisible at the moment it matters most.
