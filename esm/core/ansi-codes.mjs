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
 * @file lib/core/ansi-codes.ts
 */
export const _codes_base = {
  reset: 0,
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  inverse: 7,
  hidden: 8,
  strikethrough: 9,
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  bg_black: 40,
  bg_red: 41,
  bg_green: 42,
  bg_yellow: 43,
  bg_blue: 44,
  bg_magenta: 45,
  bg_cyan: 46,
  bg_white: 47,
};
export const _codes_advanced = {
  brightblack: 90,
  brightred: 91,
  brightgreen: 92,
  brightyellow: 93,
  brightblue: 94,
  brightmagenta: 95,
  brightcyan: 96,
  brightwhite: 97,
  bg_brightblack: 100,
  bg_brightred: 101,
  bg_brightgreen: 102,
  bg_brightyellow: 103,
  bg_brightblue: 104,
  bg_brightmagenta: 105,
  bg_brightcyan: 106,
  bg_brightwhite: 107,
};
export const _reset_ctrl = "\x1b[0m";