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
export { EAnsiColorList, EAnsiFlag, EConstans } from "./core/ansi-constants";
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