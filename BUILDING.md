# Building & Releasing ABCL

ABCL ("Adult Baby Club Lover") is a Tampermonkey/ViolentMonkey userscript addon for the browser game [Bondage Club](https://www.bondageprojects.com/club_game/). It is a **TypeScript + Rollup** project bundled with **pnpm** (or npm).

This document covers setting up a local build and cutting **minor** and **major** releases. For the end-user install guide, see [`README.md`](./README.md); for the contributor fork/clone workflow, see [`src/docs/readme.md`](./src/docs/readme.md).

> Releases here are **manual**: there is no CI pipeline and the project does **not** use git tags. The version is the `version` field in [`package.json`](./package.json), and each release's built files live in a `versions/<version>/` directory that is committed to git so [GitHub Pages](https://zoe-64.github.io/ABCL/versions/) can serve it.

---

## Prerequisites

- **Node.js** — provides npm/pnpm, and is required to run Rollup and `tsc`.
- **A package manager** — `pnpm` is preferred (a `pnpm-lock.yaml` is checked in); `npm` works too.
- **A userscript manager** (TamperMonkey or ViolentMonkey) — to load a locally-built dev version.
- **git** and a **GitHub account** — for contributing and committing releases.

## Install dependencies

```sh
pnpm install      # or: npm install
```

## Type-check

There is **no automated test runner** in this project — `tsc --noEmit` is the only pre-build/pre-merge verification:

```sh
pnpm run check    # tsc --noEmit
```

Run this before building or releasing.

## Dev build + local serve

```sh
pnpm run watch
```

`watch` runs Rollup in debug mode and rebuilds on `js,ts,tsx,css` changes (ignoring `./versions`), then serves the output with `http-server`:

- Output goes to the gitignored `versions/dev/` directory.
- The build is served at **`http://localhost:3041`**.

Load your dev build with a userscript manager. Create a userscript pointing at the local server, e.g.:

```js
// ==UserScript==
// @name ABCL (Loader)
// @namespace https://www.bondageprojects.com/
// @version Beta
// @description An addon for [Bondage Club](https://www.bondageprojects.com/club_game/). Stands for "Adult baby club lover"~
// @author Zoe, Maple, En
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match http://localhost:*/*
// @icon  https://zoe-64.github.io/ABCL/versions/beta/assets/favicon.ico
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  const src = `http://127.0.0.1:3041/abcl.js?v=${Date.now()}`;
  if (typeof ABCL_Loaded === "undefined") {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();
```

> **Do not run unstable/dev code on your main account, and disable the stable addon while testing.** (Carried over from `src/docs/readme.md`.)

### How the build works (brief)

The build is driven by [`rollup.config.js`](./rollup.config.js), which is a function of CLI args:

- `--configVersion <v>` — **required**. Sets the output directory `versions/<v>/` and the version injected into the bundle and loader.
- `--configDeploy <url>` — **required**. The base URL the built assets are served from. In release mode the public asset URL becomes `<url>/versions/<v>/assets`.
- `--configDebug` — optional. Dev mode: inline sourcemaps, no Terser minification. Used by `watch`.

- Entry point is `src/main.ts` (from `package.json` → `buildSettings.input`), bundled to `versions/<v>/abcl.js` as an IIFE. Release builds are minified with Terser and emit an external `abcl.js.map`.
- `src/assets/*` is copied into `versions/<v>/assets/`.
- The userscript loader `loader.user.js` is **auto-generated only when `--configVersion` matches `/\d+\.\d+\.\d+/`** (i.e. a real semver). For channel names like `latest`, `beta`, or `unstable`, the loader copy is a no-op, so those channel loaders are committed/maintained manually.

---

## Releasing

### Before any release

1. Work on the correct branch: `main` for stable, `beta` for beta preview.
2. Ensure a clean working tree (`git status`).
3. `pnpm run check` passes.
4. Add a per-version changelog entry at `src/changelog/<version>.txt`, following the existing convention (see `src/changelog/2.3.15.txt` etc.).

### Release scripts

There are two release scripts. Choose based on the version bump you want:

| Script | npm script | Bumps `package.json`? | Builds to `latest`? | Builds to `versions/<v>/`? |
| --- | --- | --- | --- | --- |
| `build-files/release.js` (older) | `pnpm run release` | Auto-bumps **minor** | ✅ yes | ✅ yes |
| `build-files/generate.js` (newer) | `pnpm run "generate released version"` | Only if the entered version is greater | ❌ no | ✅ yes |

There is **no "bump major" helper** — major releases use `generate.js` with an explicit version.

### Minor release (e.g. `2.3.15` → `2.4.0`)

**Option A — `release.js` (auto-bumps minor and refreshes `latest` in one step):**

```sh
pnpm run release
```

This runs `npm --no-git-tag-version version minor` (bumps the minor in `package.json`), prompts you to confirm the version, then builds into **both** `versions/latest/` and `versions/<version>/`. Best for a routine minor release.

**Option B — `generate.js` (explicit version):**

```sh
pnpm run "generate released version"
# At the prompt: Release version <current>? (y/{version})
# Enter the new minor version, e.g.: 2.4.0
```

It bumps `package.json` (since `2.4.0` > current) and builds `versions/2.4.0/` **only** — it does **not** update `latest`. Refresh the stable channel afterward:

```sh
rm -rf versions/latest && cp -r versions/2.4.0 versions/latest
# Re-apply any channel-specific loader.user.js / bookmark.js for `latest` if needed.
```

### Major release (e.g. `2.3.15` → `3.0.0`)

There is no major-bump script. Use the interactive `generate.js` and type the full major version:

```sh
pnpm run "generate released version"
# At the prompt enter: 3.0.0
```

`generate.js` bumps `package.json` to `3.0.0` (greater than current) and builds `versions/3.0.0/`. Then refresh the `latest` channel:

```sh
rm -rf versions/latest && cp -r versions/3.0.0 versions/latest
# Re-apply any channel-specific loader.user.js / bookmark.js for `latest` if needed.
```

Add the changelog entry `src/changelog/3.0.0.txt` if you have not already.

### After building (all releases)

1. **Verify** the new `versions/<version>/` contains `abcl.js`, `abcl.js.map`, `assets/`, and `loader.user.js`. Confirm the loader's `@version` and `@downloadURL` point at the new version.
2. **Commit** the new version directory, the refreshed `versions/latest/` (if applicable), the updated `package.json`, and the changelog entry. This is what GitHub Pages serves. Follow the repo's commit-message convention, e.g. `Publish <version>` or just `<version>`.
3. Releases are tracked by directory name (`versions/<version>/`), **not** by git tags — the project does not currently tag releases.

---

## Release channels

The `versions/` directory is committed to the repo and served via GitHub Pages from `https://zoe-64.github.io/ABCL/versions/...`:

| Directory | Purpose |
| --- | --- |
| `latest/` | Stable channel. README install links point here. Refresh on stable releases. |
| `beta/` | Beta preview channel. |
| `unstable/` | Unstable/development preview channel. |
| `stable/` | Additional stable copy. |
| `<semver>/` (e.g. `2.3.15/`) | Archived per-release builds — one directory per published version. |
| `dev/` | Local dev output from `pnpm run watch` (gitignored). |