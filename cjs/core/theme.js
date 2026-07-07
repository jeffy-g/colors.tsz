"use strict";
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
exports.__esModule = true;
/**
 * @import { TColorsMap } from "./ansi-color-map.ts";
 * @import { ColorizeFn, Painter } from "./theme.ts";
 */
/**
 * @type {TColorsMap}
 */
const _default_theme = {
  verbose: "white",
  info: "green",
  debug: "blue",
  warning: "yellow",
  error: "red",
  custom0: "white",
  custom1: "white",
  custom2: "white",
  custom3: "white",
  custom4: "white",
  custom5: "white",
  custom6: "white",
  custom7: "white",
  custom8: "white",
  custom9: "white",
};
/**
 * point to __current theme__
 * @type {TColorsMap}
 */
exports._theme = _default_theme;
/** @type {(theme?: TColorsMap | null) => void} */
const setTheme = (theme) => {
  exports._theme = theme == null ? _default_theme : theme;
};
exports.setTheme = setTheme;
/** @type {(value: string, search: string, replace: string) => string} */
const replace_all = (value, search, replace) => {
  if (!search) return value;
  if (value.indexOf(search) === -1) return value;
  return value.split(search).join(replace);
};
/** @type {(paint: Painter[], value: string, colorize: ColorizeFn) => string} */
const applyPaint = (paint, value, colorize) => {
  for (let i = 0; i < paint.length; ++i) {
    const item = paint[i];
    const key = item.key;
    const cs = item.colors;
    if (key == null || cs == null || cs.length == 0) continue;
    if (typeof key === "string") {
      value = replace_all(value, key, colorize(cs, key));
    } else if (key instanceof RegExp) {
      value = value.replace(key, (ar) => {
        return colorize(cs, ar);
      });
    } else {
      if (key.length === 0) return value;
      if (typeof key[0] === "string") {
        for (let idx = 0; idx < key.length; ++idx) {
          const k = /** @type {string[]} */ (key)[idx];
          value = replace_all(value, k, colorize(cs, k));
        }
      } else {
        for (let idx = 0; idx < key.length; ++idx) {
          value = value.replace(/** @type {RegExp} */ (key[idx]), (ar) => {
            return colorize(cs, ar);
          });
        }
      }
    }
  }
  return value;
};
exports.applyPaint = applyPaint;