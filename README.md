# p5.toast

A minimal toast notification addon for [p5.js](https://p5js.org) v2.

## Usage

In your sketch's `index.html`, add three `<script>` tags inside `<head>`, in this order:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2/lib/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@nbogie/p5.toast/dist/p5.toast.js"></script>
<script src="sketch.js"></script>
```

The order matters: p5 itself has to load first, then p5.toast (which plugs itself into p5), then your own sketch.

Then in `sketch.js` you can call `toast()` like any other p5 function:

```js
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}

function mousePressed() {
    toast("hello");
}
```

### Pinning to a specific version

The URL above always resolves to the latest published version, which means a future release could change behaviour under your sketch. To pin to a specific version, append `@<version>` to the package name:

```html
<script src="https://cdn.jsdelivr.net/npm/@nbogie/p5.toast@0.0.1/dist/p5.toast.js"></script>
```

You can also pin by major or minor (e.g. `@nbogie/p5.toast@0` or `@nbogie/p5.toast@0.0`), which lets you pick up bug-fix releases without unexpected breaking changes.

## Limitations:

- No instance mode support. Only designed for p5 global mode. (Assumes one sketch on page (or, at least, one per iframe)).
- Currently positions toasts in top right of the document body, not the top right of the canvas.
- No user-specified colours/styles.

## Install for developers

```sh
npm install
```

## Develop

The example sketch under `example/` loads the built bundle from `dist/`, so a build needs to exist before the example will work.

For iterative development, run two terminals:

```sh
npm run build:watch   # rebuilds dist/ on changes to src/
```

```sh
npm run dev           # starts the Vite dev server for example/
```

Edit `src/p5.toast.js`; the watcher rewrites `dist/`, and refreshing the browser picks up the new bundle.

For a one-off check, you can instead run `npm run build` once and then `npm run dev`.

### Script-tag order in the example

`example/index.html` loads three scripts in this order:

1. `p5.min.js` (CDN) — defines `window.p5`.
2. `../dist/p5.toast.js` — the IIFE bundle, which calls `p5.registerAddon(toastAddon)` at script-eval time.
3. `./sketch.js` — defines `setup` / `draw` / etc. on `window`.

p5 v2 auto-starts on `window.load`, so by the time `setup()` runs the addon is registered and any methods attached to `fn` are available as globals.

## Build

```sh
npm run build
```

Produces, in `dist/`:

- `p5.toast.js` — IIFE bundle, unminified, for `<script>` use.
- `p5.toast.mjs` — ESM bundle, for `import` use.


## AI: 
I've used AI to make the addon scaffold and vite config, and done the actual toast functionality myself for practice.  I might get tired of that and just use AI for maintenance, we'll see.
