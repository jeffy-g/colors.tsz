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
 * @file lib/core/theme.ts
 */
import type { TColorsMap } from "./ansi-color-map";
/**
 * point to __current theme__
 * @type {TColorsMap}
 */
export declare let _theme: TColorsMap;
/** @type {(theme?: TColorsMap | null) => void} */
export declare const setTheme: (theme?: TColorsMap | null) => void;
export interface Painter {
  /**
   * In the case of arrays, you cannot mix strings and regex. (original)
   */
  key: string | string[] | RegExp | RegExp[];
  colors: string | string[];
}
export type ColorizeFn = (colors: string | string[], value: string) => string;
/** @type {(paint: Painter[], value: string, colorize: ColorizeFn) => string} */
export declare const applyPaint: (paint: Painter[], value: string, colorize: ColorizeFn) => string;