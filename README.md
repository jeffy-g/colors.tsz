# colors.tsz

`colors.tsz` is a refactored TypeScript build of the original [`colors.ts`](https://github.com/xerysherry/colors.ts).

The goal is to keep the familiar string-color API while making the package easier to bundle, easier to inspect, and usable in both Node.js and browser consoles.

The original README is kept as [`origin.README.md`](./origin.README.md).

## Highlights

- Refactored from `colors.ts` with smaller generated bundles in mind.
- Keeps the classic `String.prototype` color helpers such as `"text".red.bold`.
- Fixes several behavior bugs from the original implementation, including ANSI output that could remain after `enable(false)`.
- Works in Node.js and browser devtools. Use the exported `log` helper when you want ANSI strings to render correctly in the browser console.
- Provides CJS, ESM, UMD, webpack, and webpack-ESM entry points.

## Install

```sh
npm install colors.tsz
```

## Basic Usage

Importing the module installs the string helpers.

```ts
import * as Colors from "colors.tsz";

console.log("red text".red);
console.log("bold green".green.bold);

console.log(Colors.colors("cyan", "cyan text"));
console.log(Colors.colors(["yellow", "underline"], "styled text"));
```

CommonJS is also supported.

```js
const Colors = require("colors.tsz");

console.log("warning".yellow.bold);
Colors.log("ok".green);
```

## Disable Output

Use `enable(false)` to stop emitting ANSI codes from the color helpers and control helpers.

```ts
import * as Colors from "colors.tsz";

Colors.enable(false);

console.log("plain".red.bold); // "plain"
console.log("plain".rgb(255, 0, 0)); // "plain"
```

This project fixes cases where the original implementation could still emit ANSI marks while disabled.

## Browser Logging

Browser devtools do not render raw ANSI escape sequences by default. Use `Colors.log` to convert ANSI SGR codes into `console.log` `%c` styles in browser environments.

```ts
import * as Colors from "colors.tsz";

Colors.log("browser green".green.bold);
Colors.log("\x1b[32;1mANSI green\x1b[0m");
Colors.log("value: %d %s", 123, "ok".cyan);
```

In Node.js, `Colors.log` behaves like `console.log` and lets ANSI escape sequences pass through.

### Browser ANSI support

Some modern browser consoles, including recent Chrome DevTools, can render a subset of ANSI SGR escape sequences directly. That native support is useful for simple styles, but it is not a complete terminal emulator and support differs by browser and SGR form.

Recent Chrome DevTools can render basic colors, modifiers, and truecolor SGR sequences such as these:

```ts
console.log("\x1b[38;2;0;51;102mForeground truecolor\x1b[0m");
console.log("\x1b[48;2;0;51;102mBackground truecolor\x1b[0m");
```

However, Chrome DevTools still does not cover everything that a terminal handles. In local checks with [`sample/ansi-devtools-check.mjs`](./sample/ansi-devtools-check.mjs), gray-level output and 256-color index sequences (`38;5;n` / `48;5;n`) were not represented like they are in Node.js terminal output.

Use `Colors.log` when you want browser output to go through this package's ANSI-to-`%c` conversion path instead of relying only on each browser console's native ANSI support.

## Colors

Basic colors and modifiers are available as string properties.

```ts
console.log("red".red);
console.log("blue background".bg_blue.white);
console.log("underlined".underline);
console.log("dim italic".dim.italic);
```

256-color and grayscale helpers are available as methods.

```ts
console.log("indexed color".color_at_256(194));
console.log("indexed background".color_bg_at_256(236));

console.log("gray".gray(20));
console.log("gray background".gray_bg(8));
```

Hex and RGB helpers are available when the detected support level allows them.

```ts
console.log("hex color".hex("#336699"));
console.log("hex background".hex_bg("#222222"));
console.log("rgb color".rgb(255, 128, 0));
```

## Themes

Theme names map to color names or arrays of color names.

```ts
import * as Colors from "colors.tsz";

Colors.theme({
  info: "cyan",
  warning: ["yellow", "bold"],
  error: ["red", "underline"],
});

console.log("ready".info);
console.log("careful".warning);
console.log("failed".error);
```

Built-in theme slots include `verbose`, `info`, `debug`, `warning`, `error`, and `custom0` through `custom9`.

## Paint

`paint` applies colors to matched text ranges.

```ts
import * as Colors from "colors.tsz";

const source = "INFO ok\nERROR failed";

console.log(Colors.paint([
  { key: "INFO", colors: "cyan" },
  { key: /ERROR/g, colors: ["red", "bold"] },
], source));
```

## Entry Points

```ts
import * as Colors from "colors.tsz";
import * as WebpackEsmColors from "colors.tsz/webpack-esm";
```

```js
const UmdColors = require("colors.tsz/umd");
const WebpackColors = require("colors.tsz/webpack");
```

The root entry is the default choice for application code. The subpath entries are mainly for bundle or smoke-test scenarios.

## Notes

- `colors.tsz` intentionally mutates `String.prototype`, matching the original `colors.ts` API style.
- `skipLibCheck: true` is recommended for consumers that use strict TypeScript declaration checking across dependencies.
- The package focuses on practical Node.js and browser-console behavior rather than fully emulating every terminal feature in devtools.

## License

Apache-2.0.

This project is a refactored version of the original `colors.ts`.
Original work: https://github.com/xerysherry/colors.ts
