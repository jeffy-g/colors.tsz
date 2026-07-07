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
/**
 * @import { TColorsBasicMap, TWebColorSafeList } from "./ansi-color-map.mts";
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
export const n2h = (value) => {
  if (value === 0) return "00";
  const HEX_CHARS = "0123456789abcdef";
  let digits = "";
  let n = value;
  while (n > 0) {
    digits = HEX_CHARS[n % 16] + digits;
    n >>>= 4;
  }
  return digits.length % 2 ? "0" + digits : digits;
};
/**
 * hex string map
 *
 * ```
 * ffffff: "\u001b[38;5;231m"
 * ```
 * @type {TColorsBasicMap}
 */
export let _color_web_safe_map;
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
export let _color_web_safe_list;
/**
 * hex string map
 *
 * ```
 * ffffff: "\u001b[48;5;231m"
 * ```
 * @type {TColorsBasicMap}
 */
export let _color_bg_web_safe_map;
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
export let _color_bg_web_safe_list;
/** @type {TColorsBasicMap} */
export let _color_gray_map;
/** @type {TWebColorSafeList[]} */
export let _color_gray_list;
/** @type {TColorsBasicMap} */
export let _color_bg_gray_map;
/** @type {TWebColorSafeList[]} */
export let _color_bg_gray_list;
const _color_web_safe_map_init = () => {
  const hexStrA = ["00", "33", "66", "99", "cc", "ff"];
  const hexNumA = [0, 0x33, 0x66, 0x99, 0xcc, 0xff];
  _color_web_safe_map = /** @type {TColorsBasicMap} */ ({});
  _color_web_safe_list = /** @type {TWebColorSafeList[]} */ ([]);
  _color_bg_web_safe_map = /** @type {TColorsBasicMap} */ ({});
  _color_bg_web_safe_list = /** @type {TWebColorSafeList[]} */ ([]);
  _color_gray_map = /** @type {TColorsBasicMap} */ ({});
  _color_gray_list = /** @type {TWebColorSafeList[]} */ ([]);
  _color_bg_gray_map = /** @type {TColorsBasicMap} */ ({});
  _color_bg_gray_list = /** @type {TWebColorSafeList[]} */ ([]);
  let key = [0, 0, 0];
  for (let i = 0; i < 216; ++i, ++key[0]) {
    if (key[0] > 5) {
      key[0] = 0;
      key[1]++;
      if (key[1] > 5) {
        key[1] = 0;
        key[2]++;
      }
    }
    const pos = 16 /* EConstans.HEX_BASE */ + i;
    const hex = hexStrA[key[2]] + hexStrA[key[1]] + hexStrA[key[0]];
    let c = "\u001B[38;5;" /* EC256bits.colorBits */ + pos + "m"; /* EC256bits.colorBitsEndl */
    _color_web_safe_map[hex] = c;
    _color_web_safe_list.push({
      r: hexNumA[key[2]],
      g: hexNumA[key[1]],
      b: hexNumA[key[0]],
      c: c,
    });
    c = "\u001B[48;5;" /* EC256bits.colorBitsBg */ + pos + "m" /* EC256bits.colorBitsEndl */;
    _color_bg_web_safe_map[hex] = c;
    _color_bg_web_safe_list.push({
      r: hexNumA[key[2]],
      g: hexNumA[key[1]],
      b: hexNumA[key[0]],
      c: c,
    });
  }
  for (let i = 0; i < 24; ++i) {
    const n = 8 + i * 10;
    let hex = n2h(n);
    let grayLevel = 232 /* EConstans.GRAY_CODE_BASE */ + i;
    let c = "\u001B[38;5;" /* EC256bits.colorBits */ + grayLevel + "m"; /* EC256bits.colorBitsEndl */
    _color_gray_map[hex] = c;
    _color_gray_list.push({ r: n, g: n, b: n, c: c });
    c = "\u001B[48;5;" /* EC256bits.colorBitsBg */ + grayLevel + "m" /* EC256bits.colorBitsEndl */;
    _color_bg_gray_map[hex] = c;
    _color_bg_gray_list.push({ r: n, g: n, b: n, c: c });
  }
};
_color_web_safe_map_init();