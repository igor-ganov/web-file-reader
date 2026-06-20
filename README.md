# web-file-reader

> Headless, slots-first **Lit** file reader — a grid of files that open into an extensible, accessible, high-performance viewer.

This is the **meta repository** that orchestrates a polyrepo of independently published packages via **bun workspaces** + **git submodules**. Each element lives in its own GitHub repository under [`igor-ganov`](https://github.com/igor-ganov) and ships as a separate npm library under the `@web-file-reader/*` scope.

## What it does

- A landing page renders a **grid of file blocks** (preview icon + name).
- Clicking a tile opens a **viewer** with **normal** and **fullscreen** modes; single- and multi-page output **scroll** in every mode.
- The viewer is extended by **pluggable providers** that translate a file → HTML. Providers **lazy-load** their heavy renderer code on first use (then cache it), expose a **settings API + serialization** for host-side persistence, and decide single- vs multi-page output.
- The reference **Astro host** opens the viewer as a **dialog with a URL route change**, supports **paging between files** (arrow keys + auto-hiding hover/tap/focus controls), and applies **View Transitions** between slides.

Everything is **headless + customizable**, **accessibility-first**, **DX-first**, and tuned for **Lighthouse 100**.

## Packages

| Package | npm | Description |
| --- | --- | --- |
| [`wfr-core`](https://github.com/igor-ganov/wfr-core) | `@web-file-reader/core` | Contracts, provider registry (lazy cache), content & settings model. No UI. |
| [`wfr-file-grid`](https://github.com/igor-ganov/wfr-file-grid) | `@web-file-reader/file-grid` | `<wfr-file-grid>` / `<wfr-file-tile>` headless grid. |
| [`wfr-viewer`](https://github.com/igor-ganov/wfr-viewer) | `@web-file-reader/viewer` | `<wfr-viewer>` normal/fullscreen, scrollable single/multi-page surface. |
| [`wfr-navigation`](https://github.com/igor-ganov/wfr-navigation) | `@web-file-reader/navigation` | `<wfr-viewer-nav>` auto-hiding paging controls + keyboard paging. |
| [`wfr-settings`](https://github.com/igor-ganov/wfr-settings) | `@web-file-reader/settings` | `<wfr-settings-panel>` driven by provider settings schema. |
| [`wfr-provider-markdown`](https://github.com/igor-ganov/wfr-provider-markdown) | `@web-file-reader/provider-markdown` | Markdown / plain-text / code provider. |
| [`wfr-provider-image`](https://github.com/igor-ganov/wfr-provider-image) | `@web-file-reader/provider-image` | Image provider (zoom/scroll). |
| [`wfr-provider-pdf`](https://github.com/igor-ganov/wfr-provider-pdf) | `@web-file-reader/provider-pdf` | PDF provider (pdf.js, multi-page). |
| [`wfr-provider-csv`](https://github.com/igor-ganov/wfr-provider-csv) | `@web-file-reader/provider-csv` | CSV/TSV provider (virtualized table). |
| [`wfr-host-astro`](https://github.com/igor-ganov/wfr-host-astro) | — (app) | Reference Astro host / demo. |

## Develop

```bash
git clone --recurse-submodules https://github.com/igor-ganov/web-file-reader.git
cd web-file-reader
bun install          # links all workspaces
bun run test         # all unit suites
bun run build        # build all libraries
bun run dev:host     # serve the Astro host
```

## License

MIT © Igor Ganov
