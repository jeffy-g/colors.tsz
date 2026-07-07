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
 * @file lib/core/support-detect.ts
 */
exports.__esModule = true;
/**
 * @import { Support } from "./support-detect";
 * @type {Support}
 */
exports._Support = {
  DISABLE: 0 /* Support.DISABLE */,
  BASE: 1 /* Support.BASE */,
  ANSI256: 2 /* Support.ANSI256 */,
  ANSI24bits: 3 /* Support.ANSI24bits */,
};
const isDefined = () => globalThis.COLORS_DEFINED === true;
exports.isDefined = isDefined;
const setDefined = () => {
  globalThis.COLORS_DEFINED = true;
};
exports.setDefined = setDefined;
/**
 * Detects ANSI color support level of the current process.
 *
 * Inspects CLI arguments, environment variables, OS and terminal information
 * and returns one of the {@link Support} enum values.
 *
 * @returns {Support} Detected color support level.
 */
const detectSupport = () => {
  if (typeof process !== "object") {
    return 3 /* Support.ANSI24bits */;
  }
  const env = process.env || {};
  const argv = Array.isArray(process.argv) ? process.argv : [];
  if (argv.indexOf("nocolor") >= 0 || argv.indexOf("nocolors") >= 0) {
    return 0 /* Support.DISABLE */;
  }
  if (argv.indexOf("fullcolor") >= 0 || argv.indexOf("fullcolors") >= 0 || argv.indexOf("truecolor") >= 0 || argv.indexOf("truecolors") >= 0 || argv.indexOf("color24bits") >= 0) {
    return 3 /* Support.ANSI24bits */;
  }
  if (argv.indexOf("websafe") >= 0 || argv.indexOf("color256") >= 0) {
    return 2 /* Support.ANSI256 */;
  }
  if (argv.indexOf("colorbase") >= 0 || argv.indexOf("basecolors") >= 0) {
    return 1 /* Support.BASE */;
  }
  if (process.platform === "win32") {
    if (env.COLORTERM === "truecolor") return 3 /* Support.ANSI24bits */;
    const nodeVersion = (process.versions && process.versions.node) || "0.0.0";
    const nodeMajor = +nodeVersion.split(".")[0] || 0;
    if (nodeMajor >= 8) return 2 /* Support.ANSI256 */;
    return 1 /* Support.BASE */;
  }
  if ("CI" in env) {
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1 /* Support.BASE */;
    }
    return 0 /* Support.DISABLE */;
  }
  if ("TEAMCITY_VERSION" in env) {
    // @ts-expect-error regex.test allows undefined value
    return +/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION);
  }
  if ("TERM_PROGRAM" in env) {
    const termVersion = +(env.TERM_PROGRAM_VERSION || "").split(".")[0];
    switch (env.TERM_PROGRAM) {
      case "iTerm.app":
        return termVersion >= 3 ? 3 : 2;
      case "Hyper":
        return 3 /* Support.ANSI24bits */;
      case "Apple_Terminal":
        return 2 /* Support.ANSI256 */;
    }
  }
  // @ts-expect-error regex.test allows undefined value
  if (/-256(?:color)?$/i.test(env.TERM)) {
    return 2 /* Support.ANSI256 */;
  }
  // @ts-expect-error regex.test allows undefined value
  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 2 /* Support.ANSI256 */;
  }
  if ("COLORTERM" in env) {
    return 1 /* Support.BASE */;
  }
  if (env.TERM === "dumb") {
    return 1 /* Support.BASE */;
  }
  return 0 /* Support.DISABLE */;
};
exports.detectSupport = detectSupport;