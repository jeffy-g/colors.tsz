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
export type TCodesBaseKey = keyof typeof _codes_base;
export declare const _codes_base: {
  readonly reset: 0;
  readonly bold: 1;
  readonly dim: 2;
  readonly italic: 3;
  readonly underline: 4;
  readonly inverse: 7;
  readonly hidden: 8;
  readonly strikethrough: 9;
  readonly black: 30;
  readonly red: 31;
  readonly green: 32;
  readonly yellow: 33;
  readonly blue: 34;
  readonly magenta: 35;
  readonly cyan: 36;
  readonly white: 37;
  readonly bg_black: 40;
  readonly bg_red: 41;
  readonly bg_green: 42;
  readonly bg_yellow: 43;
  readonly bg_blue: 44;
  readonly bg_magenta: 45;
  readonly bg_cyan: 46;
  readonly bg_white: 47;
};
export type TCodesAdvanceKey = keyof typeof _codes_advanced;
export declare const _codes_advanced: {
  readonly brightblack: 90;
  readonly brightred: 91;
  readonly brightgreen: 92;
  readonly brightyellow: 93;
  readonly brightblue: 94;
  readonly brightmagenta: 95;
  readonly brightcyan: 96;
  readonly brightwhite: 97;
  readonly bg_brightblack: 100;
  readonly bg_brightred: 101;
  readonly bg_brightgreen: 102;
  readonly bg_brightyellow: 103;
  readonly bg_brightblue: 104;
  readonly bg_brightmagenta: 105;
  readonly bg_brightcyan: 106;
  readonly bg_brightwhite: 107;
};
export declare const _reset_ctrl = "\u001B[0m";