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
 * @file lib/core/support-detect.ts
 */
export declare const enum Support {
  DISABLE = 0,
  BASE = 1,
  ANSI256 = 2,
  ANSI24bits = 3,
}
/**
 * @import { Support } from "./support-detect";
 * @type {Support}
 */
export declare const _Support: {
  readonly DISABLE: Support.DISABLE;
  readonly BASE: Support.BASE;
  readonly ANSI256: Support.ANSI256;
  readonly ANSI24bits: Support.ANSI24bits;
};
declare global {
  var COLORS_DEFINED: boolean | undefined;
}
export declare const isDefined: () => boolean;
export declare const setDefined: () => void;
/**
 * Detects ANSI color support level of the current process.
 *
 * Inspects CLI arguments, environment variables, OS and terminal information
 * and returns one of the {@link Support} enum values.
 *
 * @returns {Support} Detected color support level.
 */
export declare const detectSupport: () => Support;