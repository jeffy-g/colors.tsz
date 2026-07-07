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
/// <reference types="node" preserve="true"/>
// @ts-ignore this tag for after build source
/// <reference path="../colors.d.ts" preserve="true"/>
import { detectSupport, isDefined, setDefined } from "./core/support-detect.mjs";
export { _Support as Support } from "./core/support-detect.mjs";
import { _codes_base, _codes_advanced, _reset_ctrl } from "./core/ansi-codes.mjs";
import { n2h, _color_web_safe_list, _color_web_safe_map, _color_bg_web_safe_list, _color_bg_web_safe_map, _color_gray_list, _color_gray_map, _color_bg_gray_list, _color_bg_gray_map } from "./core/ansi-color-map.mjs";
import { _theme, setTheme, applyPaint } from "./core/theme.mjs";
import { isBrowser } from "./ansi-console.mjs";
export { logAnsi as log, isBrowser, getRgbFrom256Index, toConsoleArgsFromAnsiNext } from "./ansi-console.mjs";
/**
 * @import { Painter } from "./core/theme.mts";
 * @import { TCodesAdvanceKey, TCodesBaseKey } from "./core/ansi-codes.mts";
 * @import { TColorsBasicMap, TWebColorSafeList, TColorsMap } from "./core/ansi-color-map.mts";
 * @import { Support } from "./core/support-detect.mts";
 */
/**
 * @param {number} level range is __`0 - 25`__, `0` is __black__, and `25` is __white__
 * @param {38 | 48} flag foreground - __38__, backbround - __48__
 */
const _get_gray_code = (level, flag) => {
  if (_enable) {
    if (_support < 2 /* Support.ANSI256 */) return flag === 48 ? "\x1b[48;5;245m" : "\x1b[90m";
    if (level <= 0 /* EConstans.GRAY_LEVEL_MIN */)
      return `\x1B[${flag};5;0m`;
    else if (level >= 25 /* EConstans.GRAY_LEVEL_MAX */) return `\x1B[${flag};5;15m`;
    return `\x1B[${flag};5;${level - 1 + 232 /* EConstans.GRAY_CODE_BASE */}m`;
  }
  return "";
};
/**
 * @param {number} idx `0` index base
 * @param {38 | 48} flag foreground - __38__, backbround - __48__
 */
const _get_256bits_color_code = (idx, flag) => {
  if (_support < 2 /* Support.ANSI256 */) return null;
  if (idx < 0 /* EConstans.COLOR_256_MIN */) idx = 0 /* EConstans.COLOR_256_MIN */;
  else if (idx > 255 /* EConstans.COLOR_256_MAX */) idx = 255 /* EConstans.COLOR_256_MAX */;
  return `\u001B[${flag};5;` + idx + "m" /* EC256bits.colorBitsEndl */;
};
/**
 * @import {TSafeMapAndGrayListArg} from "./colors.mts";
 */
/** @type {(bg: boolean) => TSafeMapAndGrayListArg} */
const _get_safemap_and_graylist_args = (bg) => {
  /** @type {TSafeMapAndGrayListArg} */
  let mapListArgs = [bg ? _color_bg_web_safe_map : _color_web_safe_map, bg ? _color_bg_web_safe_list : _color_web_safe_list];
  if (_more_detail_on_color256) {
    mapListArgs = [mapListArgs[0], mapListArgs[1], bg ? _color_bg_gray_map : _color_gray_map, bg ? _color_bg_gray_list : _color_gray_list];
  }
  return mapListArgs;
};
/** @type {(hexcode: string, bg: boolean) => string | null} */
const _get_color_by_hex = (hexcode, bg) => {
  if (_support === 3 /* Support.ANSI24bits */) {
    let r = +("0x" + hexcode[0] + hexcode[1]);
    let g = +("0x" + hexcode[2] + hexcode[3]);
    let b = +("0x" + hexcode[4] + hexcode[5]);
    return bg ? _get_truecolor_bg(r, g, b) : _get_truecolor(r, g, b);
  }
  if (_support < 2 /* Support.ANSI256 */) return null;
  return _get_web_safe_code_by_hex(hexcode, ..._get_safemap_and_graylist_args(bg));
};
/** @type {(r: number, g: number, b: number, bg: boolean) => string | null} */
const _get_color_by_rgb = (r, g, b, bg) => {
  if (_support === 3 /* Support.ANSI24bits */) return bg ? _get_truecolor_bg(r, g, b) : _get_truecolor(r, g, b);
  if (_support < 2 /* Support.ANSI256 */) return null;
  return _get_web_safe_code_by_rgb(r, g, b, ..._get_safemap_and_graylist_args(bg));
};
/** @type {(hex: string, map: TColorsBasicMap, list: TWebColorSafeList[], map2?: TColorsBasicMap, list2?: TWebColorSafeList[]) => string | null} */
const _get_web_safe_code_by_hex = (hex, map, list, map2, list2) => {
  /** @type {string | null=} */
  let c = map[hex];
  if (c) return c;
  if (map2) {
    c = map2[hex];
    if (c) return c;
  }
  let r = +("0x" + hex[0] + hex[1]);
  let g = +("0x" + hex[2] + hex[3]);
  let b = +("0x" + hex[4] + hex[5]);
  c = _get_web_safe_code_search(r, g, b, list, list2);
  if (c) map[hex] = c;
  return c;
};
/** @type {(r: number, g: number, b: number, map: TColorsBasicMap, list: TWebColorSafeList[], map2?: TColorsBasicMap, list2?: TWebColorSafeList[]) => string | null} */
const _get_web_safe_code_by_rgb = (r, g, b, map, list, map2, list2) => {
  let hex = n2h(r) + n2h(g) + n2h(b);
  /** @type {string | null=} */
  let c = map[hex];
  if (c) return c;
  if (map2) {
    c = map2[hex];
    if (c) return c;
  }
  c = _get_web_safe_code_search(r, g, b, list, list2);
  if (c) map[hex] = c;
  return c;
};
/** @type {(r: number, g: number, b: number, list: TWebColorSafeList[], list2?: TWebColorSafeList[]) => string | null} */
const _get_web_safe_code_search = (r, g, b, list, list2) => {
  let m = Number.MAX_VALUE;
  let c = null;
  list.forEach((item) => {
    let v = (item.r - r) * (item.r - r) + (item.g - g) * (item.g - g) + (item.b - b) * (item.b - b);
    if (v < m) {
      m = v;
      c = item.c;
    }
  });
  if (list2) {
    list2.forEach((item) => {
      let v = (item.r - r) * (item.r - r) + (item.g - g) * (item.g - g) + (item.b - b) * (item.b - b);
      if (v < m) {
        m = v;
        c = item.c;
      }
    });
  }
  return c;
};
/** @type {(r: number, g: number, b: number) => `\x1b[38;2;${number};${number};${number}m`} */
const _get_truecolor = (r, g, b) => `\u001b[38;2;${r};${g};${b}m`;
/** @type {(r: number, g: number, b: number) => `\x1b[48;2;${number};${number};${number}m`} */
const _get_truecolor_bg = (r, g, b) => `\x1b[48;2;${r};${g};${b}m`;
/** @type {(color: string) => string | null} */
const _get_code = (color) => {
  if (color.length === 0 || _support < 1 /* Support.BASE */) return null;
  /** @type {number} */
  let code = _codes_base[/** @type {TCodesBaseKey} */ (color)];
  if (code !== void 0) return `\x1b[${code}m`;
  code = _codes_advanced[/** @type {TCodesAdvanceKey} */ (color)];
  if (code !== void 0) return `\x1b[${code};1m`;
  color = color.toLowerCase();
  const c0 = color[0];
  if (c0 === "#") return _get_color_by_hex(color.slice(1), false);
  else if (c0 === "g") return _get_gray_code(+color.slice(1), 38);
  else if (c0 === "b") {
    if (color[1] === "#") return _get_color_by_hex(color.slice(2), true);
    else if (color[1] === "g") return _get_gray_code(+color.slice(2), 48);
  }
  return null;
};
/**
 * state of __current Support__
 * @type {Support}
 */
let _support = 0; /* Support.DISABLE */
/**
 * state of __current enabling__
 */
let _enable = true;
let _more_detail_on_color256 = false;
/**
 * + __`"\u001B[0m"`__.length is **4**
 * @param {string} value
 */
const _check_reset_end = (value) => {
  return value.length >= 4 && value.endsWith(_reset_ctrl);
};
/** @type {(x: number, y: number) => `\x1b[${number};${number}H`} */
const _position = (x, y) => `\x1b[${y};${x}H`;
const _strProto = String.prototype;
/** @type {(key: string, fn: (this: string, ...args: any[]) => string) => void} */
const _defineStringProp = (key, fn) => {
  try {
    Object.defineProperty(_strProto, key, {
      get: fn,
      enumerable: false,
      configurable: false,
    });
  } catch (e) {
    console.warn(/** @type {Error} */ (e).message);
  }
};
/** @type {(ansiEscape: `\x1b[${number}m`) => (this: string) => string} */
const emitColorsFunction = (ansiEscape) => {
  return function () {
    if (!_enable || _support < 1 /* Support.BASE */) return this;
    const ansiValue = ansiEscape + this;
    if (_check_reset_end(this)) return ansiValue;
    else return ansiValue + _reset_ctrl;
  };
};
const _codes_init = () => {
  for (const key in _codes_base) {
    _defineStringProp(key, emitColorsFunction(`\x1b[${_codes_base[/** @type {TCodesBaseKey} */ (key)]}m`));
  }
  for (const key in _codes_advanced) {
    _defineStringProp(key, emitColorsFunction(`\x1b[${_codes_advanced[/** @type {TCodesAdvanceKey} */ (key)]}m`));
  }
  /** @type {(dis: string, idxOrLevel: number, flag: 38 | 48, fn: (idxOrLevel: number, flag: 38 | 48) => string | null) => string} */
  const _color_at_256_or_gray_impl = (dis, idxOrLevel, flag, fn) => {
    if (!_enable) return dis;
    const code = fn(idxOrLevel, flag);
    if (!code) return dis;
    if (_check_reset_end(dis)) return code + dis;
    else return code + dis + _reset_ctrl;
  };
  _strProto.color_at_256 =
    /** @type {(this: string, idx: number) => string} */
    function (idx) {
      return _color_at_256_or_gray_impl(this, idx, 38, _get_256bits_color_code);
    };
  _strProto.color_bg_at_256 =
    /** @type {(this: string, idx: number) => string} */
    function (idx) {
      return _color_at_256_or_gray_impl(this, idx, 48, _get_256bits_color_code);
    };
  _strProto.gray =
    /** @type {(this: string, level: number) => string} */
    function (level) {
      return _color_at_256_or_gray_impl(this, level, 38, _get_gray_code);
    };
  _strProto.gray_bg =
    /** @type {(this: string, level: number) => string} */
    function (level) {
      return _color_at_256_or_gray_impl(this, level, 48, _get_gray_code);
    };
  _strProto.grey = _strProto.gray;
  _strProto.grey_bg = _strProto.gray_bg;
  _strProto.colors =
    /** @type {(this: string, color: string | string[], noreset?: boolean) => string} */
    function (color, noreset) {
      return colors(color, this, noreset);
    };
  /** @type {(isBg?: boolean) => (this: string, hex: string) => string} */
  const emit_hex_fn = (isBg = false) =>
    function (hex) {
      if (!_enable) return this;
      const h = hex[0] === "#" ? hex.slice(1) : hex;
      const code = _get_color_by_hex(h, isBg);
      if (!code) return this;
      return code + this + _reset_ctrl;
    };
  _strProto.hex = emit_hex_fn();
  _strProto.hex_bg = emit_hex_fn(true);
  const emit_rgb_fn = (isBg = false) =>
    /** @type {(this: string, r: number, g: number, b: number) => string} */
    function (r, g, b) {
      if (!_enable) return this;
      const ansiMark = _get_color_by_rgb(r, g, b, isBg);
      if (!ansiMark) return this;
      return ansiMark + this + _reset_ctrl;
    };
  _strProto.rgb = emit_rgb_fn();
  _strProto.rgb_bg = emit_rgb_fn(true);
  _strProto.paint =
    /** @type {(this: string, pt: Painter[]) => string} */
    function (pt) {
      return paint(pt, this);
    };
  "up:A,down:B,right:C,left:D,next_line:E,prev_line:F".split(",").forEach((pair) => {
    const [method, dir] = pair.split(":");
    // @ts-ignore ignore ts(7015)
    _strProto[method] =
      /** @type {(this: string, n?: number) => string} */
      function (n = 1) {
        if (!_enable) return this;
        return `\x1b[${n}${dir}` + this;
      };
  });
  _strProto.column =
    /** @type {(this: string, n: number) => string} */
    function (n) {
      if (!_enable) return this;
      return `\x1b[${n}G` + this;
    };
  _strProto.position =
    /** @type {(this: string, x: number, y: number) => string} */
    function (x, y) {
      if (!_enable) return this;
      return _position(x, y) + this;
    };
  /** @type {(pos: string) => (this: string) => string} */
  const emit_position_fn = (pos) =>
    function () {
      if (!_enable) return this;
      return pos + this;
    };
  _defineStringProp("load_position", emit_position_fn("\u001B[u" /* ECtrlCode.loadPositionCode */));
  _defineStringProp("save_position", emit_position_fn("\u001B[s" /* ECtrlCode.savePositionCode */));
  _defineStringProp("clear_screen", emit_position_fn("\u001B[2J" /* ECtrlCode.clearScreenCode */));
  _defineStringProp("clear_line", emit_position_fn("\u001B[K" /* ECtrlCode.clearLineCode */));
};
const _theme_init = () => {
  for (const key in _theme) {
    _defineStringProp(key, function () {
      if (_enable) {
        let s = _theme[key];
        if (!s) return this;
        return colors(s, this);
      }
      return this;
    });
  }
};
const _init = () => {
  _support = detectSupport();
  if (isDefined()) return;
  setDefined();
  _codes_init();
  _theme_init();
};
_init();
/** @type {(color: string | string[], value: string, noreset?: boolean) => string} */
export const colors = (color, value, noreset) => {
  if (_enable && _support >= 1 /* Support.BASE */) {
    if (typeof color === "string") {
      let s = _theme[color];
      if (s) return colors(s, value);
      var code = _get_code(color);
      if (!code) return value;
      if (noreset) return code + value;
      return code + value + _reset_ctrl;
    } else {
      let result = value;
      for (let i = color.length - 1; i >= 0; --i) {
        var code = _get_code(color[i]);
        if (code != null) result = code + result;
      }
      if (noreset) return result;
      return result + _reset_ctrl;
    }
  }
  return value;
};
/** @type {(value?: boolean) => void} */
export const enable = (value = true) => {
  _enable = value;
};
/** @type {(support?: Support) => Support} */
export const support = (support) => {
  if (typeof support !== "undefined") _support = support;
  return _support;
};
/**
 * update theme object
 *
 * @param {TColorsMap} theme new theme
 */
export const theme = (theme) => {
  setTheme(theme);
};
/**
 * @param {number} x
 * @param {number} y
 */
export const position = (x, y) => {
  if (isBrowser || !_enable) return;
  process.stdout.write(_position(x, y));
};
export const save_position = () => {
  if (isBrowser || !_enable) return;
  process.stdout.write("\u001B[s" /* ECtrlCode.savePositionCode */);
};
export const load_position = () => {
  if (isBrowser || !_enable) return;
  process.stdout.write("\u001B[u" /* ECtrlCode.loadPositionCode */);
};
export const clear_screen = () => {
  if (isBrowser || !_enable) return;
  process.stdout.write("\u001B[2J" /* ECtrlCode.clearScreenCode */);
};
/**
 * @param {boolean=} show
 */
export const show_cursor = (show = true) => {
  if (isBrowser || !_enable) return;
  process.stdout.write(show ? "\u001B[?25h" /* ECtrlCode.showCursorCode */ : "\u001B[?25l" /* ECtrlCode.hideCursorCode */);
};
/**
 * @param {boolean=} value
 */
export const more_detail_on_color256 = (value = true) => {
  _more_detail_on_color256 = value;
  return _more_detail_on_color256;
};
/** @type {(paint: Painter[], value: string) => string} */
export const paint = (paint, value) => {
  if (!_enable || paint == null || value == null || value.length === 0 || paint.length === 0) return value;
  return applyPaint(paint, value, colors);
};
export const version = "1.6.2";