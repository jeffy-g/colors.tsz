"use strict";
/*! Copyright jeffy-g 2025
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file lib/ansi-console.ts
 */
exports.__esModule = true;
exports.getRgbFrom256Index = getRgbFrom256Index;
exports.toConsoleArgsFromAnsiNext = toConsoleArgsFromAnsiNext;
exports.isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
/**
 * @import { T256Rgb, EAnsiColorList } from "./ansi-console.ts";
 */
/** @type {T256Rgb[]} */
let web_safe_list = Array(216);
/** @type {T256Rgb[]} */
let gray_list = Array(24);
/**
 * @param {number} index
 * @returns {T256Rgb | null}
 */
function getRgbFrom256Index(index) {
  if (index < 16 /* EConstans.HEX_BASE */ || index > 255 /* EConstans.COLOR_256_MAX */) return null;
  if (index >= 232 /* EConstans.GRAY_CODE_BASE */) {
    const level = index - 232; /* EConstans.GRAY_CODE_BASE */
    let rgb = gray_list[level];
    if (!rgb) {
      const n = 8 + level * 10;
      gray_list[level] = rgb = { r: n, g: n, b: n };
    }
    return rgb;
  }
  const cubeIndex = index - 16; /* EConstans.HEX_BASE */
  let rgb = web_safe_list[cubeIndex];
  if (!rgb) {
    const hexNumA = [0, 0x33, 0x66, 0x99, 0xcc, 0xff];
    const bIndex = cubeIndex % 6;
    const gIndex = ((cubeIndex / 6) | 0) % 6;
    const rIndex = ((cubeIndex / 36) | 0) % 6;
    web_safe_list[cubeIndex] = rgb = {
      r: hexNumA[rIndex],
      g: hexNumA[gIndex],
      b: hexNumA[bIndex],
    };
  }
  return rgb;
}
/**
 * @template {1=} IsBG
 * @template {[IsBG] extends [1] ? "background" : "color"} Rule
 * @param {EAnsiColorList} color
 * @param {IsBG=} isBg
 * @returns {`${Rule}:${EAnsiColorList};`}
 */
const _tc = (color, isBg) => `${/** @type {Rule} */ (isBg ? "background" : "color")}:${color};`;
/**
 * more details see - {@link https://en.wikipedia.org/wiki/ANSI_escape_code#Select_Graphic_Rendition_parameters Select Graphic Rendition parameters}
 */
/** @type {Record<string, string>} */
const SGR_TO_CSS_Map = {
  [0 /* EAnsiFlag.reset */]: "",
  [1 /* EAnsiFlag.bold */]: "font-weight: bold;",
  [2 /* EAnsiFlag.dim */]: "opacity: 0.6;",
  [3 /* EAnsiFlag.italic */]: "font-style: italic;",
  [4 /* EAnsiFlag.underline */]: "text-decoration:underline;",
  [53 /* EAnsiFlag.overline */]: "text-decoration:overline;",
  [7 /* EAnsiFlag.inverse */]: "filter: invert(1);",
  [8 /* EAnsiFlag.hidden */]: "color: transparent;",
  [9 /* EAnsiFlag.strikethrough */]: "text-decoration:line-through;",
  24: "underline",
  29: "line-through",
  55: "overline",
  [30 /* EAnsiFlag.black */]: _tc(/** @type {EAnsiColorList} */("#000")),
  [31 /* EAnsiFlag.red */]: _tc(/** @type {EAnsiColorList} */("#cd3131")),
  [32 /* EAnsiFlag.green */]: _tc(/** @type {EAnsiColorList} */("#0dbc79")),
  [33 /* EAnsiFlag.yellow */]: _tc(/** @type {EAnsiColorList} */("#e5e510")),
  [34 /* EAnsiFlag.blue */]: _tc(/** @type {EAnsiColorList} */("#2472c8")),
  [35 /* EAnsiFlag.magenta */]: _tc(/** @type {EAnsiColorList} */("#bc3fbc")),
  [36 /* EAnsiFlag.cyan */]: _tc(/** @type {EAnsiColorList} */("#11a8cd")),
  [37 /* EAnsiFlag.white */]: _tc(/** @type {EAnsiColorList} */("#e5e5e5")),
  [40 /* EAnsiFlag.bg_black */]: _tc(/** @type {EAnsiColorList} */("#000"), 1),
  [41 /* EAnsiFlag.bg_red */]: _tc(/** @type {EAnsiColorList} */("#cd3131"), 1),
  [42 /* EAnsiFlag.bg_green */]: _tc(/** @type {EAnsiColorList} */("#0dbc79"), 1),
  [43 /* EAnsiFlag.bg_yellow */]: _tc(/** @type {EAnsiColorList} */("#e5e510"), 1),
  [44 /* EAnsiFlag.bg_blue */]: _tc(/** @type {EAnsiColorList} */("#2472c8"), 1),
  [45 /* EAnsiFlag.bg_magenta */]: _tc(/** @type {EAnsiColorList} */("#bc3fbc"), 1),
  [46 /* EAnsiFlag.bg_cyan */]: _tc(/** @type {EAnsiColorList} */("#11a8cd"), 1),
  [47 /* EAnsiFlag.bg_white */]: _tc(/** @type {EAnsiColorList} */("#e5e5e5"), 1),
  [90 /* EAnsiFlag.brightblack */]: _tc(/** @type {EAnsiColorList} */("#666666")),
  [91 /* EAnsiFlag.brightred */]: _tc(/** @type {EAnsiColorList} */("#f14c4c")),
  [92 /* EAnsiFlag.brightgreen */]: _tc(/** @type {EAnsiColorList} */("#23d18b")),
  [93 /* EAnsiFlag.brightyellow */]: _tc(/** @type {EAnsiColorList} */("#f5f543")),
  [94 /* EAnsiFlag.brightblue */]: _tc(/** @type {EAnsiColorList} */("#3b8eea")),
  [95 /* EAnsiFlag.brightmagenta */]: _tc(/** @type {EAnsiColorList} */("#d670d6")),
  [96 /* EAnsiFlag.brightcyan */]: _tc(/** @type {EAnsiColorList} */("#29b8dB")),
  [97 /* EAnsiFlag.brightwhite */]: _tc(/** @type {EAnsiColorList} */("#ededed")),
  [100 /* EAnsiFlag.bg_brightblack */]: _tc(/** @type {EAnsiColorList} */("#666666"), 1),
  [101 /* EAnsiFlag.bg_brightred */]: _tc(/** @type {EAnsiColorList} */("#f14c4c"), 1),
  [102 /* EAnsiFlag.bg_brightgreen */]: _tc(/** @type {EAnsiColorList} */("#23d18b"), 1),
  [103 /* EAnsiFlag.bg_brightyellow */]: _tc(/** @type {EAnsiColorList} */("#f5f543"), 1),
  [104 /* EAnsiFlag.bg_brightblue */]: _tc(/** @type {EAnsiColorList} */("#3b8eea"), 1),
  [105 /* EAnsiFlag.bg_brightmagenta */]: _tc(/** @type {EAnsiColorList} */("#d670d6"), 1),
  [106 /* EAnsiFlag.bg_brightcyan */]: _tc(/** @type {EAnsiColorList} */("#29b8dB"), 1),
  [107 /* EAnsiFlag.bg_brightwhite */]: _tc(/** @type {EAnsiColorList} */("#ededed"), 1),
};
/**
 * @typedef {`color:#${string};`} TCssPropFg
 * @typedef {`background:#${string};`} TCssPropBg
 * @type {Array<TCssPropFg | TCssPropBg>}
 */
const SGR_TO_CSS = (() => {
  const cssPropArry = Array(108);
  for (const idx in SGR_TO_CSS_Map) {
    cssPropArry[+idx] = SGR_TO_CSS_Map[idx];
  }
  return cssPropArry;
})();
/**
 * Removes a CSS rule matching the given token from the state
 * @param {string} token - CSS property name to match (e.g., "color:")
 * @param {string[]} cssState - Current CSS state array
 * @param {string=} tdCriteria - For text-decoration, specific value to remove
 * @returns {1 | 0} 1 if modified, 0 otherwise
 */
const pargeStyle = (token, cssState, tdCriteria) => {
  const finded = cssState.findIndex((state) => state.startsWith(token));
  if (finded === -1) return 0;
  if (tdCriteria) {
    const tdValues = cssState[finded]
      .slice(16, -1)
      .split(" ")
      .filter((rule) => rule !== tdCriteria);
    if (tdValues.length) {
      cssState[finded] = `text-decoration:${tdValues.join(" ")};`;
      return 1;
    }
  }
  cssState.splice(finded, 1);
  return 1;
};
const isa = Array.isArray;
/**
 * Handles SGR reset codes (22-29, 39)
 *
 * @param {string[]} cssState
 * @param {number} code
 * @returns true if the code was a reset code and was handled
 */
const handleResetCode = (cssState, code) => {
  if (code === 0) {
    cssState.length = 0;
    return true;
  }
  let tokens;
  let tdCriteria;
  switch (code) {
    case 22: {
      tokens = ["font-weight:", "opacity:"];
      break;
    }
    case 23: {
      tokens = "font-style:";
      break;
    }
    case 24:
    case 29:
    case 55: {
      tokens = "text-decoration:";
      tdCriteria = SGR_TO_CSS[code];
      break;
    }
    case 27: {
      tokens = "filter:";
      break;
    }
    case 28:
    case 39: {
      tokens = "color:";
      break;
    }
    case 49: {
      tokens = "background:";
      break;
    }
    default:
      return false;
  }
  /** @type {any} */
  let isChanged;
  if (tokens) {
    if (isa(tokens)) {
      for (const token of tokens) {
        isChanged |= pargeStyle(token, cssState);
      }
    } else {
      isChanged |= pargeStyle(tokens, cssState, tdCriteria);
    }
  }
  return !!isChanged;
};
/**
 * Updates or adds a CSS rule to the state
 * Handles text-decoration merging and rule replacement
 * @param {string} css - CSS rule to add or update
 * @param {string[]} cssState - Current CSS state array
 */
const updateCssState = (css, cssState) => {
  const comingPropName = css.slice(0, css.indexOf(":"));
  const isTextDecoration = comingPropName === "text-decoration";
  const reTdTest = /^text-decoration/;
  for (let i = 0, cssStateLen = cssState.length; i < cssStateLen; ) {
    const _css = cssState[i++];
    if (isTextDecoration && reTdTest.test(_css)) {
      const prev = _css.slice(16, -1).trim().split(" ");
      const next = css.slice(16, -1).trim();
      if (!prev.includes(next)) {
        prev.push(next);
        cssState[i - 1] = `text-decoration:${prev.join(" ")};`;
      }
      return;
    } else {
      const propName = _css.slice(0, _css.indexOf(":"));
      if (comingPropName === propName) {
        cssState[i - 1] = css;
        return;
      }
    }
  }
  cssState.push(css);
};
/**
 * Resolves ANSI SGR color codes (truecolor and 256-color) and updates the CSS state.
 *
 * This function interprets ANSI color codes for both truecolor (24-bit, e.g., 38;2;r;g;b or 48;2;r;g;b)
 * and 256-color (e.g., 38;5;idx or 48;5;idx) sequences, and converts them to corresponding CSS rules.
 * The resulting CSS rule is added to or updates the provided cssState array.
 *
 * @param {number} codeOffset - The current offset in the codes array.
 * @param {string[]} codes The array of SGR code strings.
 *   __`CAVEAT:`__ when use code[number] then MUST convert to number
 *   ```
 *   const code = +codes[3];
 *   ```
 * @param {string[]} sgr2css - The lookup table for standard SGR code to CSS string.
 * @param {string[]} cssState - The current CSS state array to be updated.
 * @returns {number} The new offset in the codes array after processing the color code.
 */
const resolveAnsiColor = (codeOffset, codes, sgr2css, cssState) => {
  const code = +codes[codeOffset++];
  let css = sgr2css[code];
  if (!css) {
    const propName = code === 38 ? "color" : "background";
    const isRGB = codes[codeOffset++] === "2";
    if (isRGB) {
      css = `${propName}: rgb(${codes[codeOffset]} ${codes[codeOffset + 1]} ${codes[codeOffset + 2]});`;
      codeOffset += 3;
    } else {
      const color256Index = +codes[codeOffset++];
      let rgbEntry = getRgbFrom256Index(color256Index);
      if (rgbEntry) {
        css = `${propName}: rgb(${rgbEntry.r} ${rgbEntry.g} ${rgbEntry.b});`;
      } else {
        const shift = propName === "background" ? 10 : 0;
        const base = color256Index & 8 ? 82 : 30;
        css = sgr2css[color256Index + base + shift];
      }
    }
  }
  updateCssState(css, cssState);
  return codeOffset;
};
/** @type {(strs: string[]) => string} */
const join = (strs) => {
  let contents = "";
  const strsLen = strs.length;
  if (!strsLen) return contents;
  for (let idx = 0; idx < strsLen; ) contents += strs[idx++];
  return contents;
};
/**
 * Converts ANSI escape sequences to browser console format
 *
 * In Node.js, returns input as-is (ANSI passthrough)
 * In Browser, converts ANSI codes to %c placeholders with CSS
 *
 * @param {string} format - String containing ANSI escape sequences
 * @param {...unknown} comingArgs - Additional arguments (objects, etc.)
 * @returns {[string, args?: unknown[]]} Tuple of [formatted string, CSS args array]
 *
 * @example
 * // Input: "\x1b[31mError\x1b[0m message"
 * // Output: ["%cError%c message", ["color:red;", ""]]
 * @version latest
 */
function toConsoleArgsFromAnsiNext(format, ...comingArgs) {
  const sgr2css = SGR_TO_CSS;
  /** @type {string} */
  var text;
  /**
   * Currently enabled CSS properties
   * @type {string[]}
   */
  let cssState = [];
  /** __Flags required for adjusting placeholders, rest args, etc.__ */
  let isStyleApplied = false;
  let formatLine = "";
  const args = [];
  const sdifoOc = "sdifoOc";
  const formatLen = format.length;
  let lastIndex = 0,
    offset = 0,
    comingArgsIdx = 0;
  while (offset < formatLen) {
    let ch = format[offset++];
    if (ch === "\x1b" && format[offset] === "[") {
      const matchStart = offset - 1;
      const codesStart = (offset += 1);
      while (offset < formatLen && format[offset] !== "m") offset++;
      if (offset >= formatLen) break;
      if (lastIndex < matchStart) {
        if (!isStyleApplied) {
          text = "%c" + format.slice(lastIndex, matchStart);
          args.push(join(cssState));
          isStyleApplied = true;
        } else text = format.slice(lastIndex, matchStart);
        formatLine += text;
      }
      const codes = format.slice(codesStart, offset).split(";");
      isStyleApplied = false;
      for (let idx = 0, codesLen = codes.length; idx < codesLen; ) {
        if (handleResetCode(cssState, +codes[idx])) {
          idx++;
        } else {
          idx = resolveAnsiColor(idx, codes, sgr2css, cssState);
        }
      }
      lastIndex = ++offset;
      continue;
    }
    if (ch === "%") {
      if (format[offset] === "%") {
        offset += 1;
        continue;
      }
      while (offset < formatLen) {
        if (((ch = format[offset]) >= "0" && ch <= "9") || ch === "." || ch === "-" || ch === "+") {
          offset++;
        } else {
          break;
        }
      }
      if (sdifoOc.includes(format[offset])) {
        const fragment = format.slice(lastIndex, ++offset);
        if (isStyleApplied) {
          formatLine += fragment;
          args.push(comingArgs[comingArgsIdx++]);
        } else {
          formatLine += "%c" + fragment;
          args.push(join(cssState), comingArgs[comingArgsIdx++]);
          isStyleApplied = true;
        }
        lastIndex = offset;
        continue;
      }
    }
  }
  if (lastIndex < formatLen) {
    if (!isStyleApplied) {
      text = "%c" + format.slice(lastIndex);
      args.push(join(cssState));
    } else text = format.slice(lastIndex);
    formatLine += text;
  }
  return [formatLine, args.concat(comingArgs.slice(comingArgsIdx))];
}
const _log = console.log;
/**
 * @typedef {(format: string, ...comingArgs: unknown[]) => [string, args?: unknown[]]} TAnsiParser
 * @param {TAnsiParser} parser
 * @returns {Console["log"]}
 */
const createAnsiLogger = (parser) => {
  if (!exports.isBrowser) return _log;
  return (...argsIn) => {
    if (!argsIn.length) return _log();
    let format = argsIn[0];
    if (typeof format !== "string") return _log(...argsIn);
    /** @type {unknown[]} */
    let fmtArgs;
    [format, fmtArgs = []] = parser(format, ...argsIn.slice(1));
    _log(format, ...fmtArgs);
  };
};
/** @type {Console["log"]} */
exports.logAnsi = createAnsiLogger(toConsoleArgsFromAnsiNext);