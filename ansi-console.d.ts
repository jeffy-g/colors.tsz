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
export declare const isBrowser: boolean;
export type T256Rgb = {
  r: number;
  g: number;
  b: number;
};
/**
 * @param {number} index
 * @returns {T256Rgb | null}
 */
export declare function getRgbFrom256Index(index: number): T256Rgb | null;
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
export declare function toConsoleArgsFromAnsiNext(format: string, ...comingArgs: unknown[]): [string, args?: unknown[]];
/** @type {Console["log"]} */
export declare const logAnsi: Console["log"];
export declare const enum EAnsiColorList {
  black = "#000",
  red = "#cd3131",
  green = "#0dbc79",
  yellow = "#e5e510",
  blue = "#2472c8",
  magenta = "#bc3fbc",
  cyan = "#11a8cd",
  white = "#e5e5e5",
  brightblack = "#666666",
  brightred = "#f14c4c",
  brightgreen = "#23d18b",
  brightyellow = "#f5f543",
  brightblue = "#3b8eea",
  brightmagenta = "#d670d6",
  brightcyan = "#29b8dB",
  brightwhite = "#ededed",
}
export declare const enum EAnsiFlag {
  reset = 0,
  bold = 1,
  dim = 2,
  italic = 3,
  underline = 4,
  inverse = 7,
  hidden = 8,
  strikethrough = 9,
  black = 30,
  red = 31,
  green = 32,
  yellow = 33,
  blue = 34,
  magenta = 35,
  cyan = 36,
  white = 37,
  bg_black = 40,
  bg_red = 41,
  bg_green = 42,
  bg_yellow = 43,
  bg_blue = 44,
  bg_magenta = 45,
  bg_cyan = 46,
  bg_white = 47,
  overline = 53,
  brightblack = 90,
  brightred = 91,
  brightgreen = 92,
  brightyellow = 93,
  brightblue = 94,
  brightmagenta = 95,
  brightcyan = 96,
  brightwhite = 97,
  bg_brightblack = 100,
  bg_brightred = 101,
  bg_brightgreen = 102,
  bg_brightyellow = 103,
  bg_brightblue = 104,
  bg_brightmagenta = 105,
  bg_brightcyan = 106,
  bg_brightwhite = 107,
}
export declare const enum EC256bits {
  colorBits = "\u001B[38;5;",
  colorBitsEndl = "m",
  colorBitsBlack = "\u001B[38;5;0m",
  colorBitsWhite = "\u001B[38;5;15m",
  colorBitsBg = "\u001B[48;5;",
  colorBitsBgEndl = "m",
  colorBitsBgBlack = "\u001B[48;5;0m",
  colorBitsBgWhite = "\u001B[48;5;15m",
}
export declare const enum ECtrlCode {
  /** save_position code */
  savePositionCode = "\u001B[s",
  /** load_position code */
  loadPositionCode = "\u001B[u",
  /** clear_screen code */
  clearScreenCode = "\u001B[2J",
  /** clear_line code */
  clearLineCode = "\u001B[K",
  /** hide_cursor code */
  hideCursorCode = "\u001B[?25l",
  /** show_cursor code */
  showCursorCode = "\u001B[?25h",
}
export declare const enum EConstans {
  GRAY_LEVEL_MIN = 0,
  GRAY_LEVEL_MAX = 25,
  GRAY_CODE_BASE = 232,
  COLOR_256_MIN = 0,
  COLOR_256_MAX = 255,
  HEX_BASE = 16,
  HEX_DOUBLE_DIGIT_THRESHOLD = 16,
}