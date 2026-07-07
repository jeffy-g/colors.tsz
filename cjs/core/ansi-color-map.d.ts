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
 * @file lib/core/ansi-color-map.ts
 */
export type TColorsBasicMap<K extends string = string> = Record<K, string>;
export type TWebColorSafeList = {
  r: number;
  g: number;
  b: number;
  c: string;
};
export type TColorsMap = Record<string, string | string[]>;
/**
 * @import { TColorsBasicMap, TWebColorSafeList } from "./ansi-color-map.d.ts";
 */
/**
 * Converts a non-negative integer to hexadecimal string (lowercase).
 *
 * + __About 25%__ FASTER! (vs _n2h)
 *
 * @param {number} value - The non-negative integer to convert.
 * @returns {string} The hexadecimal string.
 * @date 2025/11/24 9:37:54
 * @since v1.0.14
 */
export declare const n2h: (value: number) => string;
/**
 * hex string map
 *
 * ```
 * ffffff: "\u001b[38;5;231m"
 * ```
 * @type {TColorsBasicMap}
 */
export declare let _color_web_safe_map: TColorsBasicMap;
/**
 * 256 color list
 *
 * + __Actual index__: `index - 16`
 *
 * ```
 * // actual index: (231 - 16)
 * 215: {
 *   "r": 255,
 *   "g": 255,
 *   "b": 255,
 *   "c": "\u001b[38;5;231m"
 * }
 * ```
 * @type {TWebColorSafeList[]}
 */
export declare let _color_web_safe_list: TWebColorSafeList[];
/**
 * hex string map
 *
 * ```
 * ffffff: "\u001b[48;5;231m"
 * ```
 * @type {TColorsBasicMap}
 */
export declare let _color_bg_web_safe_map: TColorsBasicMap;
/**
 * 256 color list
 *
 * + __Actual index__: `index - 16`
 *
 * ```
 * // actual index: (231 - 16)
 * 215: {
 *   "r": 255,
 *   "g": 255,
 *   "b": 255,
 *   "c": "\u001b[48;5;231m"
 * }
 * ```
 * @type {TWebColorSafeList[]}
 */
export declare let _color_bg_web_safe_list: TWebColorSafeList[];
/** @type {TColorsBasicMap} */
export declare let _color_gray_map: TColorsBasicMap;
/** @type {TWebColorSafeList[]} */
export declare let _color_gray_list: TWebColorSafeList[];
/** @type {TColorsBasicMap} */
export declare let _color_bg_gray_map: TColorsBasicMap;
/** @type {TWebColorSafeList[]} */
export declare let _color_bg_gray_list: TWebColorSafeList[];