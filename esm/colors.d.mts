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
/// <reference path="../../../lib/colors.d.ts" preserve="true" />
/// <reference types="node" preserve="true" />
import { Support } from "./core/support-detect";
export { _Support as Support } from "./core/support-detect";
import { type TColorsMap, type TColorsBasicMap, type TWebColorSafeList } from "./core/ansi-color-map";
import { type Painter } from "./core/theme";
export { logAnsi as log, isBrowser, getRgbFrom256Index, toConsoleArgsFromAnsiNext, EAnsiColorList, EAnsiFlag, EConstans } from "./ansi-console";
export type TSafeMapAndGrayListArg = [webSafeMap: TColorsBasicMap, webSafeList: TWebColorSafeList[], grayMap?: TColorsBasicMap, grayList?: TWebColorSafeList[]];
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
export declare const version = "1.6.5";