/*! Copyright xerysherry 2018
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
 *
 * Refactoring by jeffy-g (2025/11).
 */
/// <reference types="node" preserve="true" />
export const enum Support {
  DISABLE = 0,
  BASE = 1,
  ANSI256 = 2,
  ANSI24bits = 3,
}
export interface Painter {
  /**
   * In the case of arrays, you cannot mix strings and regex. (original)
   */
  key: string | string[] | RegExp | RegExp[];
  colors: string | string[];
}
/** @type {(color: string | string[], value: string, noreset?: boolean) => string} */
export declare const colors: (color: string | string[], value: string, noreset?: boolean) => string;
/** @type {(value?: boolean) => void} */
export declare const enable: (value?: boolean) => void;
/** @type {(support?: Support) => Support} */
export declare const support: (support?: Support) => Support;
/**
 * update theme object
 *
 * @param {TColorsMap} theme new theme
 */
export declare const theme: (theme?: TColorsMap) => void;
/**
 * @param {number} x
 * @param {number} y
 */
export declare const position: (x: number, y: number) => void;
export declare const save_position: () => void;
export declare const load_position: () => void;
export declare const clear_screen: () => void;
/**
 * @param {boolean=} show
 */
export declare const show_cursor: (show?: boolean) => void;
/**
 * @param {boolean=} value
 */
export declare const more_detail_on_color256: (value?: boolean) => boolean;
/** @type {(paint: Painter[], value: string) => string} */
export declare const paint: (paint: Painter[], value: string) => string;
export declare const version: string;
type TColorsMap = Record<string, string | string[]>;
declare global {
  interface String {
    reset: string;
    dim: string;
    italic: string;
    underline: string;
    inverse: string;
    hidden: string;
    strikethrough: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bg_black: string;
    bg_red: string;
    bg_green: string;
    bg_yellow: string;
    bg_blue: string;
    bg_magenta: string;
    bg_cyan: string;
    bg_white: string;
    verbose: string;
    info: string;
    warning: string;
    debug: string;
    error: string;
    custom0: string;
    custom1: string;
    custom2: string;
    custom3: string;
    custom4: string;
    custom5: string;
    custom6: string;
    custom7: string;
    custom8: string;
    custom9: string;
    /**
     * @param split split each characters
     */
    colors256_rnd(split?: true): string;
    /**
     * @param split split each characters
     */
    colors256_rnd_bg(split?: true): string;
    /**
     * @param idx __`0`__ to __`255`__
     */
    color_at_256(idx: number): string;
    /**
     * @param idx __`0`__ to __`255`__
     */
    color_bg_at_256(idx: number): string;
    /**
     * @param idx __`0`__ to __`25`__
     */
    gray(level: number): string;
    /**
     * @param idx __`0`__ to __`25`__
     */
    grey(level: number): string;
    /**
     * @param idx __`0`__ to __`25`__
     */
    gray_bg(level: number): string;
    /**
     * @param idx __`0`__ to __`25`__
     */
    grey_bg(level: number): string;
    hex(hex: string): string;
    hex_bg(hex: string): string;
    rgb(r: number, g: number, b: number): string;
    rgb_bg(r: number, g: number, b: number): string;
    colors(color: string | string[], noreset?: boolean): string;
    paint(paint: Painter[]): string;
    up(n?: number): string;
    down(n?: number): string;
    right(n?: number): string;
    left(n?: number): string;
    next_line(n?: number): string;
    prev_line(n?: number): string;
    column(n: number): string;
    position(x: number, y: number): string;
    save_position: string;
    load_position: string;
    clear_screen: string;
    clear_line: string;
  }
}