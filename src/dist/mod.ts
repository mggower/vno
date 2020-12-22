const _CDN = "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
const _VNO_PATH = "./vno-build";
const _BUILD_PATH = "./vno-build/build.js";
const _STYLE_PATH = "./vno-build/style.css";
const _IGNORE = `/* eslint-disable */\n// prettier-ignore\n`;
const Queue = [];
function print() {
  console.log(
    ` \n  __   ___ __   ___  \n  \\ \\ / / '_ \\ / _ \\ \n   \\ V /| | | | (_) |\n    \\_/ |_| |_|\\___/         \n\n  `,
  );
  return true;
}
const componentStringify = function cS(current) {
  try {
    const { label, name, template, script } = current;
    if (current.isRoot) {
      current.instance =
        `\nvar ${label} = new Vue({template: \`${template}\`,${script}});\n`;
    } else {
      current.instance =
        `\nvar ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;
    }
    return "componentStringify()=> successful";
  } catch (error) {
    console.error("Error inside of componentStringify()=>:", {
      error,
    });
  }
};
class SiblingList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(component) {
    if (!this.head) {
      this.head = component;
      this.tail = component;
    } else if (this.tail) {
      this.tail.sibling = component;
      this.tail = component;
    }
  }
}
class Component {
  constructor(label, path, isRoot = false) {
    this.isRoot = isRoot;
    this.label = label;
    this.path = path;
    this.data = null;
    this.split = null;
    this.child = null;
    this.sibling = null;
    this.runData();
  }
  async runData() {
    try {
      if (!this.path) {
        throw `There was an error identifying the path for ${this.label}`;
      }
      this.data = await Deno.readTextFile(this.path);
      if (!this.data) {
        throw `There was an error reading the file for path ${this.path}`;
      }
      this.split = this.data.split(/\n/);
      return true;
    } catch (error) {
      console.error("Error inside of Component.runData():", {
        error,
      });
    }
  }
}
const Storage1 = {};
async function exists(filePath) {
  try {
    await Deno.lstat(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
function existsSync(filePath) {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
function include(path1, exts, match, skip) {
  if (exts && !exts.some((ext) => path1.endsWith(ext))) {
    return false;
  }
  if (match && !match.some((pattern) => !!path1.match(pattern))) {
    return false;
  }
  if (skip && skip.some((pattern) => !!path1.match(pattern))) {
    return false;
  }
  return true;
}
function throwUnlessNotFound(error) {
  if (!(error instanceof Deno.errors.NotFound)) {
    throw error;
  }
}
function comparePath(a, b) {
  if (a.path < b.path) return -1;
  if (a.path > b.path) return 1;
  return 0;
}
async function ensureValidCopy(src, dest, options) {
  let destStat;
  try {
    destStat = await Deno.lstat(dest);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return;
    }
    throw err;
  }
  if (options.isFolder && !destStat.isDirectory) {
    throw new Error(
      `Cannot overwrite non-directory '${dest}' with directory '${src}'.`,
    );
  }
  if (!options.overwrite) {
    throw new Error(`'${dest}' already exists.`);
  }
  return destStat;
}
function ensureValidCopySync(src, dest, options) {
  let destStat;
  try {
    destStat = Deno.lstatSync(dest);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return;
    }
    throw err;
  }
  if (options.isFolder && !destStat.isDirectory) {
    throw new Error(
      `Cannot overwrite non-directory '${dest}' with directory '${src}'.`,
    );
  }
  if (!options.overwrite) {
    throw new Error(`'${dest}' already exists.`);
  }
  return destStat;
}
var EOL;
(function (EOL1) {
  EOL1["LF"] = "\n";
  EOL1["CRLF"] = "\r\n";
})(EOL || (EOL = {}));
const regDetect = /(?:\r?\n)/g;
const indexOfRegExp = function iRe(regex, array) {
  return array.findIndex((element) => regex.test(element));
};
const sarahJessicaParker = function sJP(
  array,
  start,
  end,
  regex = /(\s)/g,
  replaced = "",
) {
  return array.slice(start, end).join("").replace(regex, replaced);
};
function assertPath(path1) {
  if (typeof path1 !== "string") {
    throw new TypeError(
      `Path must be a string. Received ${JSON.stringify(path1)}`,
    );
  }
}
function _format(sep, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base ||
    (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) return base;
  if (dir === pathObject.root) return dir + base;
  return dir + sep + base;
}
const regExpEscapeChars = [
  "!",
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "=",
  "?",
  "[",
  "\\",
  "^",
  "{",
  "|",
];
const rangeEscapeChars = [
  "-",
  "\\",
  "]",
];
function globToRegExp(
  glob,
  { extended = true, globstar: globstarOption = true, os = osType1 } = {},
) {
  if (glob == "") {
    return /(?!)/;
  }
  const sep = os == "windows" ? "(?:\\\\|/)+" : "/+";
  const sepMaybe = os == "windows" ? "(?:\\\\|/)*" : "/*";
  const seps = os == "windows"
    ? [
      "\\",
      "/",
    ]
    : [
      "/",
    ];
  const globstar = os == "windows"
    ? "(?:[^\\\\/]*(?:\\\\|/|$)+)*"
    : "(?:[^/]*(?:/|$)+)*";
  const wildcard = os == "windows" ? "[^\\\\/]*" : "[^/]*";
  const escapePrefix = os == "windows" ? "`" : "\\";
  let newLength = glob.length;
  for (; newLength > 1 && seps.includes(glob[newLength - 1]); newLength--);
  glob = glob.slice(0, newLength);
  let regExpString = "";
  for (let j = 0; j < glob.length;) {
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i = j;
    for (; i < glob.length && !seps.includes(glob[i]); i++) {
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
        segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        continue;
      }
      if (glob[i] == escapePrefix) {
        inEscape = true;
        continue;
      }
      if (glob[i] == "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";
          if (glob[i + 1] == "!") {
            i++;
            segment += "^";
          } else if (glob[i + 1] == "^") {
            i++;
            segment += "\\^";
          }
          continue;
        } else if (glob[i + 1] == ":") {
          let k = i + 1;
          let value = "";
          while (glob[k + 1] != null && glob[k + 1] != ":") {
            value += glob[k + 1];
            k++;
          }
          if (glob[k + 1] == ":" && glob[k + 2] == "]") {
            i = k + 2;
            if (value == "alnum") segment += "\\dA-Za-z";
            else if (value == "alpha") segment += "A-Za-z";
            else if (value == "ascii") segment += "\x00-\x7F";
            else if (value == "blank") segment += "\t ";
            else if (value == "cntrl") segment += "\x00-\x1F\x7F";
            else if (value == "digit") segment += "\\d";
            else if (value == "graph") segment += "\x21-\x7E";
            else if (value == "lower") segment += "a-z";
            else if (value == "print") segment += "\x20-\x7E";
            else if (value == "punct") {
              segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
            } else if (value == "space") segment += "\\s\v";
            else if (value == "upper") segment += "A-Z";
            else if (value == "word") segment += "\\w";
            else if (value == "xdigit") segment += "\\dA-Fa-f";
            continue;
          }
        }
      }
      if (glob[i] == "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }
      if (inRange) {
        if (glob[i] == "\\") {
          segment += `\\\\`;
        } else {
          segment += glob[i];
        }
        continue;
      }
      if (
        glob[i] == ")" && groupStack.length > 0 &&
        groupStack[groupStack.length - 1] != "BRACE"
      ) {
        segment += ")";
        const type = groupStack.pop();
        if (type == "!") {
          segment += wildcard;
        } else if (type != "@") {
          segment += type;
        }
        continue;
      }
      if (
        glob[i] == "|" && groupStack.length > 0 &&
        groupStack[groupStack.length - 1] != "BRACE"
      ) {
        segment += "|";
        continue;
      }
      if (glob[i] == "+" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }
      if (glob[i] == "@" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }
      if (glob[i] == "?") {
        if (extended && glob[i + 1] == "(") {
          i++;
          groupStack.push("?");
          segment += "(?:";
        } else {
          segment += ".";
        }
        continue;
      }
      if (glob[i] == "!" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }
      if (glob[i] == "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }
      if (glob[i] == "}" && groupStack[groupStack.length - 1] == "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }
      if (glob[i] == "," && groupStack[groupStack.length - 1] == "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] == "*") {
        if (extended && glob[i + 1] == "(") {
          i++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob[i - 1];
          let numStars = 1;
          while (glob[i + 1] == "*") {
            i++;
            numStars++;
          }
          const nextChar = glob[i + 1];
          if (
            globstarOption && numStars == 2 && [
              ...seps,
              undefined,
            ].includes(prevChar) && [
              ...seps,
              undefined,
            ].includes(nextChar)
          ) {
            segment += globstar;
            endsWithSep = true;
          } else {
            segment += wildcard;
          }
        }
        continue;
      }
      segment += regExpEscapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
    }
    if (groupStack.length > 0 || inRange || inEscape) {
      segment = "";
      for (const c of glob.slice(j, i)) {
        segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
        endsWithSep = false;
      }
    }
    regExpString += segment;
    if (!endsWithSep) {
      regExpString += i < glob.length ? sep : sepMaybe;
      endsWithSep = true;
    }
    while (seps.includes(glob[i])) i++;
    if (!(i > j)) {
      throw new Error("Assertion failure: i > j (potential infinite loop)");
    }
    j = i;
  }
  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString);
}
function isGlob(str) {
  const chars = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  const regex =
    /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  if (str === "") {
    return false;
  }
  let match;
  while (match = regex.exec(str)) {
    if (match[2]) return true;
    let idx = match.index + match[0].length;
    const open = match[1];
    const close = open ? chars[open] : null;
    if (open && close) {
      const n = str.indexOf(close, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }
    str = str.slice(idx);
  }
  return false;
}
function isPosixPathSeparator(code) {
  return code === 47;
}
function isPathSeparator(code) {
  return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path1, allowAboveRoot, separator, isPathSeparator1) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i = 0, len = path1.length; i <= len; ++i) {
    if (i < len) code = path1.charCodeAt(i);
    else if (isPathSeparator1(code)) break;
    else code = 47;
    if (isPathSeparator1(code)) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (
          res.length < 2 || lastSegmentLength !== 2 ||
          res.charCodeAt(res.length - 1) !== 46 ||
          res.charCodeAt(res.length - 2) !== 46
        ) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path1.slice(lastSlash + 1, i);
        else res = path1.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const mod = function () {
  const sep = "/";
  const delimiter = ":";
  function resolve(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      let path1;
      if (i >= 0) path1 = pathSegments[i];
      else {
        if (globalThis.Deno == null) {
          throw new TypeError("Resolved a relative path without a CWD.");
        }
        path1 = Deno.cwd();
      }
      assertPath(path1);
      if (path1.length === 0) {
        continue;
      }
      resolvedPath = `${path1}/${resolvedPath}`;
      resolvedAbsolute = path1.charCodeAt(0) === 47;
    }
    resolvedPath = normalizeString(
      resolvedPath,
      !resolvedAbsolute,
      "/",
      isPosixPathSeparator,
    );
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return `/${resolvedPath}`;
      else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
  }
  function normalize(path1) {
    assertPath(path1);
    if (path1.length === 0) return ".";
    const isAbsolute = path1.charCodeAt(0) === 47;
    const trailingSeparator = path1.charCodeAt(path1.length - 1) === 47;
    path1 = normalizeString(path1, !isAbsolute, "/", isPosixPathSeparator);
    if (path1.length === 0 && !isAbsolute) path1 = ".";
    if (path1.length > 0 && trailingSeparator) path1 += "/";
    if (isAbsolute) return `/${path1}`;
    return path1;
  }
  function isAbsolute(path1) {
    assertPath(path1);
    return path1.length > 0 && path1.charCodeAt(0) === 47;
  }
  function join(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for (let i = 0, len = paths.length; i < len; ++i) {
      const path1 = paths[i];
      assertPath(path1);
      if (path1.length > 0) {
        if (!joined) joined = path1;
        else joined += `/${path1}`;
      }
    }
    if (!joined) return ".";
    return normalize(joined);
  }
  function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve(from);
    to = resolve(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for (; fromStart < fromEnd; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for (; toStart < toEnd; ++toStart) {
      if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) {
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) {
            lastCommonSep = i;
          } else if (i === 0) {
            lastCommonSep = 0;
          }
        }
        break;
      }
      const fromCode = from.charCodeAt(fromStart + i);
      const toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break;
      else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) {
        if (out.length === 0) out += "..";
        else out += "/..";
      }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47) ++toStart;
      return to.slice(toStart);
    }
  }
  function toNamespacedPath(path1) {
    return path1;
  }
  function dirname(path1) {
    assertPath(path1);
    if (path1.length === 0) return ".";
    const hasRoot = path1.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for (let i = path1.length - 1; i >= 1; --i) {
      if (path1.charCodeAt(i) === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path1.slice(0, end);
  }
  function basename(path1, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path1);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path1.length) {
      if (ext.length === path1.length && ext === path1) return "";
      let extIdx = ext.length - 1;
      let firstNonSlashEnd = -1;
      for (i = path1.length - 1; i >= 0; --i) {
        const code = path1.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if ((--extIdx) === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd;
      else if (end === -1) end = path1.length;
      return path1.slice(start, end);
    } else {
      for (i = path1.length - 1; i >= 0; --i) {
        if (path1.charCodeAt(i) === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return "";
      return path1.slice(start, end);
    }
  }
  function extname(path1) {
    assertPath(path1);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for (let i = path1.length - 1; i >= 0; --i) {
      const code = path1.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1) startDot = i;
        else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (
      startDot === -1 || end === -1 || preDotState === 0 ||
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
    ) {
      return "";
    }
    return path1.slice(startDot, end);
  }
  function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
      throw new TypeError(
        `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`,
      );
    }
    return _format("/", pathObject);
  }
  function parse(path1) {
    assertPath(path1);
    const ret = {
      root: "",
      dir: "",
      base: "",
      ext: "",
      name: "",
    };
    if (path1.length === 0) return ret;
    const isAbsolute1 = path1.charCodeAt(0) === 47;
    let start;
    if (isAbsolute1) {
      ret.root = "/";
      start = 1;
    } else {
      start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path1.length - 1;
    let preDotState = 0;
    for (; i >= start; --i) {
      const code = path1.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1) startDot = i;
        else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (
      startDot === -1 || end === -1 || preDotState === 0 ||
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
    ) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute1) {
          ret.base = ret.name = path1.slice(1, end);
        } else {
          ret.base = ret.name = path1.slice(startPart, end);
        }
      }
    } else {
      if (startPart === 0 && isAbsolute1) {
        ret.name = path1.slice(1, startDot);
        ret.base = path1.slice(1, end);
      } else {
        ret.name = path1.slice(startPart, startDot);
        ret.base = path1.slice(startPart, end);
      }
      ret.ext = path1.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path1.slice(0, startPart - 1);
    else if (isAbsolute1) ret.dir = "/";
    return ret;
  }
  function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
      throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(
      url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
    );
  }
  function toFileUrl(path1) {
    if (!isAbsolute(path1)) {
      throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = path1.replace(/%/g, "%25").replace(/\\/g, "%5C");
    return url;
  }
  return {
    sep,
    delimiter,
    resolve,
    normalize,
    isAbsolute,
    join,
    relative,
    toNamespacedPath,
    dirname,
    basename,
    extname,
    format,
    parse,
    fromFileUrl,
    toFileUrl,
  };
}();
function isSubdir(src, dest, sep1 = sep1) {
  if (src === dest) {
    return false;
  }
  const srcArray = src.split(sep1);
  const destArray = dest.split(sep1);
  return srcArray.every((current, i) => destArray[i] === current);
}
function getFileInfoType(fileInfo) {
  return fileInfo.isFile
    ? "file"
    : fileInfo.isDirectory
    ? "dir"
    : fileInfo.isSymlink
    ? "symlink"
    : undefined;
}
const osType = (() => {
  if (globalThis.Deno != null) {
    return Deno.build.os;
  }
  const navigator = globalThis.navigator;
  if (navigator?.appVersion?.includes?.("Win") ?? false) {
    return "windows";
  }
  return "linux";
})();
const isWindows = osType === "windows";
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}
const parseTemplate = function pT(current) {
  try {
    if (current.split) {
      const { split } = current;
      const open = split.indexOf("<template>");
      const close = split.indexOf("</template>");
      if (typeof open !== "number" || typeof close !== "number") {
        throw `There was an error isolating content inside of <template> tags for ${current.label}.vue`;
      }
      current.template = sarahJessicaParker(
        split,
        open + 1,
        close,
        /(\s{2,})/g,
        " ",
      );
      current.split = split.slice(close + 1);
      return "parseTemplate()=> successful";
    }
  } catch (error) {
    console.error("Error inside of parseTemplate()=>:", {
      error,
    });
  }
};
const parseScript = function pS(current) {
  try {
    if (current.split) {
      const { split } = current;
      const open = split.indexOf("<script>");
      const close = split.indexOf("</script>");
      if (typeof open !== "number" || typeof close !== "number") {
        throw `There was an error isolating content inside of <script> tags for ${current.label}.vue`;
      }
      const script = split.slice(open + 1, close);
      if (!script) {
        throw `There was an error while reading through the script tag in ${current.label}.vue`;
      }
      const nameIndex = indexOfRegExp(/(name)/, script);
      if (nameIndex < 0) {
        throw `There was an error while identifying the name property inside ${current.label}.vue`;
      }
      current.name = script[nameIndex].split(/[`'"]/)[1];
      const exportStart = indexOfRegExp(/^(export)/, script);
      const exportEnd = script.lastIndexOf("}");
      if (typeof exportStart !== "number" || typeof exportEnd !== "number") {
        throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
      }
      current.script = sarahJessicaParker(script, exportStart + 1, exportEnd);
      const cmpsStart = indexOfRegExp(/(components:)/, script);
      const children = cmpsStart > 0 && script.slice(cmpsStart);
      if (children) {
        const cmpsEnd = children.findIndex((element) => element.includes("}"));
        const cmpsString = sarahJessicaParker(children, 0, cmpsEnd + 1);
        const foundChildren = cmpsString.slice(
          cmpsString.indexOf("{") + 1,
          cmpsString.indexOf("}"),
        ).split(",").filter((el) => el).map((child) => Storage1[child]);
        current.child = new SiblingList();
        while (foundChildren.length) {
          const component = foundChildren.pop();
          if (component) {
            Queue.push(component);
            current.child?.add(component);
          }
        }
      }
    }
    return "parseScript()=> successful";
  } catch (error) {
    console.error("Error inside of Parser.script:", {
      error,
    });
  }
};
const parseStyle = function pSt(current) {
  try {
    if (current.split) {
      const { split } = current;
      const open = split.indexOf("<style>");
      const close = split.indexOf("</style>");
      if (
        open < 0 || close < 0 ||
        (typeof open !== "number" || typeof close !== "number")
      ) {
        current.style = undefined;
        return "parseStyle()=> succesful (no component styling)";
      }
      current.style = sarahJessicaParker(split, open + 1, close);
      return "parseStyle()=> succesful";
    }
  } catch (error) {
    console.error("Error inside of parseStyle()=>:", {
      error,
    });
  }
};
async function ensureDir(dir) {
  try {
    const fileInfo = await Deno.lstat(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${
          getFileInfoType(fileInfo)
        }'`,
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      await Deno.mkdir(dir, {
        recursive: true,
      });
      return;
    }
    throw err;
  }
}
function ensureDirSync(dir) {
  try {
    const fileInfo = Deno.lstatSync(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${
          getFileInfoType(fileInfo)
        }'`,
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      Deno.mkdirSync(dir, {
        recursive: true,
      });
      return;
    }
    throw err;
  }
}
async function copyFile(src, dest, options) {
  await ensureValidCopy(src, dest, options);
  await Deno.copyFile(src, dest);
  if (options.preserveTimestamps) {
    const statInfo = await Deno.stat(src);
    assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    await Deno.utime(dest, statInfo.atime, statInfo.mtime);
  }
}
function copyFileSync(src, dest, options) {
  ensureValidCopySync(src, dest, options);
  Deno.copyFileSync(src, dest);
  if (options.preserveTimestamps) {
    const statInfo = Deno.statSync(src);
    assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
  }
}
async function copySymLink(src, dest, options) {
  await ensureValidCopy(src, dest, options);
  const originSrcFilePath = await Deno.readLink(src);
  const type = getFileInfoType(await Deno.lstat(src));
  if (isWindows) {
    await Deno.symlink(originSrcFilePath, dest, {
      type: type === "dir" ? "dir" : "file",
    });
  } else {
    await Deno.symlink(originSrcFilePath, dest);
  }
  if (options.preserveTimestamps) {
    const statInfo = await Deno.lstat(src);
    assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    await Deno.utime(dest, statInfo.atime, statInfo.mtime);
  }
}
function copySymlinkSync(src, dest, options) {
  ensureValidCopySync(src, dest, options);
  const originSrcFilePath = Deno.readLinkSync(src);
  const type = getFileInfoType(Deno.lstatSync(src));
  if (isWindows) {
    Deno.symlinkSync(originSrcFilePath, dest, {
      type: type === "dir" ? "dir" : "file",
    });
  } else {
    Deno.symlinkSync(originSrcFilePath, dest);
  }
  if (options.preserveTimestamps) {
    const statInfo = Deno.lstatSync(src);
    assert(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
  }
}
const SEP = isWindows ? "\\" : "/";
const SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/;
const osType1 = osType;
const mod1 = function () {
  const sep = "\\";
  const delimiter = ";";
  function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for (let i = pathSegments.length - 1; i >= -1; i--) {
      let path1;
      if (i >= 0) {
        path1 = pathSegments[i];
      } else if (!resolvedDevice) {
        if (globalThis.Deno == null) {
          throw new TypeError(
            "Resolved a drive-letter-less path without a CWD.",
          );
        }
        path1 = Deno.cwd();
      } else {
        if (globalThis.Deno == null) {
          throw new TypeError("Resolved a relative path without a CWD.");
        }
        path1 = Deno.env.get(`=${resolvedDevice}`) || Deno.cwd();
        if (
          path1 === undefined ||
          path1.slice(0, 3).toLowerCase() !==
            `${resolvedDevice.toLowerCase()}\\`
        ) {
          path1 = `${resolvedDevice}\\`;
        }
      }
      assertPath(path1);
      const len = path1.length;
      if (len === 0) continue;
      let rootEnd = 0;
      let device = "";
      let isAbsolute = false;
      const code = path1.charCodeAt(0);
      if (len > 1) {
        if (isPathSeparator(code)) {
          isAbsolute = true;
          if (isPathSeparator(path1.charCodeAt(1))) {
            let j = 2;
            let last = j;
            for (; j < len; ++j) {
              if (isPathSeparator(path1.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              const firstPart = path1.slice(last, j);
              last = j;
              for (; j < len; ++j) {
                if (!isPathSeparator(path1.charCodeAt(j))) break;
              }
              if (j < len && j !== last) {
                last = j;
                for (; j < len; ++j) {
                  if (isPathSeparator(path1.charCodeAt(j))) break;
                }
                if (j === len) {
                  device = `\\\\${firstPart}\\${path1.slice(last)}`;
                  rootEnd = j;
                } else if (j !== last) {
                  device = `\\\\${firstPart}\\${path1.slice(last, j)}`;
                  rootEnd = j;
                }
              }
            }
          } else {
            rootEnd = 1;
          }
        } else if (isWindowsDeviceRoot(code)) {
          if (path1.charCodeAt(1) === 58) {
            device = path1.slice(0, 2);
            rootEnd = 2;
            if (len > 2) {
              if (isPathSeparator(path1.charCodeAt(2))) {
                isAbsolute = true;
                rootEnd = 3;
              }
            }
          }
        }
      } else if (isPathSeparator(code)) {
        rootEnd = 1;
        isAbsolute = true;
      }
      if (
        device.length > 0 && resolvedDevice.length > 0 &&
        device.toLowerCase() !== resolvedDevice.toLowerCase()
      ) {
        continue;
      }
      if (resolvedDevice.length === 0 && device.length > 0) {
        resolvedDevice = device;
      }
      if (!resolvedAbsolute) {
        resolvedTail = `${path1.slice(rootEnd)}\\${resolvedTail}`;
        resolvedAbsolute = isAbsolute;
      }
      if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(
      resolvedTail,
      !resolvedAbsolute,
      "\\",
      isPathSeparator,
    );
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail ||
      ".";
  }
  function normalize(path1) {
    assertPath(path1);
    const len = path1.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path1.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code)) {
        isAbsolute = true;
        if (isPathSeparator(path1.charCodeAt(1))) {
          let j = 2;
          let last = j;
          for (; j < len; ++j) {
            if (isPathSeparator(path1.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            const firstPart = path1.slice(last, j);
            last = j;
            for (; j < len; ++j) {
              if (!isPathSeparator(path1.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              last = j;
              for (; j < len; ++j) {
                if (isPathSeparator(path1.charCodeAt(j))) break;
              }
              if (j === len) {
                return `\\\\${firstPart}\\${path1.slice(last)}\\`;
              } else if (j !== last) {
                device = `\\\\${firstPart}\\${path1.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code)) {
        if (path1.charCodeAt(1) === 58) {
          device = path1.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path1.charCodeAt(2))) {
              isAbsolute = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code)) {
      return "\\";
    }
    let tail;
    if (rootEnd < len) {
      tail = normalizeString(
        path1.slice(rootEnd),
        !isAbsolute,
        "\\",
        isPathSeparator,
      );
    } else {
      tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator(path1.charCodeAt(len - 1))) {
      tail += "\\";
    }
    if (device === undefined) {
      if (isAbsolute) {
        if (tail.length > 0) return `\\${tail}`;
        else return "\\";
      } else if (tail.length > 0) {
        return tail;
      } else {
        return "";
      }
    } else if (isAbsolute) {
      if (tail.length > 0) return `${device}\\${tail}`;
      else return `${device}\\`;
    } else if (tail.length > 0) {
      return device + tail;
    } else {
      return device;
    }
  }
  function isAbsolute(path1) {
    assertPath(path1);
    const len = path1.length;
    if (len === 0) return false;
    const code = path1.charCodeAt(0);
    if (isPathSeparator(code)) {
      return true;
    } else if (isWindowsDeviceRoot(code)) {
      if (len > 2 && path1.charCodeAt(1) === 58) {
        if (isPathSeparator(path1.charCodeAt(2))) return true;
      }
    }
    return false;
  }
  function join(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for (let i = 0; i < pathsCount; ++i) {
      const path1 = paths[i];
      assertPath(path1);
      if (path1.length > 0) {
        if (joined === undefined) joined = firstPart = path1;
        else joined += `\\${path1}`;
      }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
      ++slashCount;
      const firstLen = firstPart.length;
      if (firstLen > 1) {
        if (isPathSeparator(firstPart.charCodeAt(1))) {
          ++slashCount;
          if (firstLen > 2) {
            if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
            else {
              needsReplace = false;
            }
          }
        }
      }
    }
    if (needsReplace) {
      for (; slashCount < joined.length; ++slashCount) {
        if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
      }
      if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
  }
  function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for (; fromStart < fromEnd; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 92) break;
    }
    for (; fromEnd - 1 > fromStart; --fromEnd) {
      if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for (; toStart < toEnd; ++toStart) {
      if (to.charCodeAt(toStart) !== 92) break;
    }
    for (; toEnd - 1 > toStart; --toEnd) {
      if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 92) {
            return toOrig.slice(toStart + i + 1);
          } else if (i === 2) {
            return toOrig.slice(toStart + i);
          }
        }
        if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 92) {
            lastCommonSep = i;
          } else if (i === 2) {
            lastCommonSep = 3;
          }
        }
        break;
      }
      const fromCode = from.charCodeAt(fromStart + i);
      const toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break;
      else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
      return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 92) {
        if (out.length === 0) out += "..";
        else out += "\\..";
      }
    }
    if (out.length > 0) {
      return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
      toStart += lastCommonSep;
      if (toOrig.charCodeAt(toStart) === 92) ++toStart;
      return toOrig.slice(toStart, toEnd);
    }
  }
  function toNamespacedPath(path1) {
    if (typeof path1 !== "string") return path1;
    if (path1.length === 0) return "";
    const resolvedPath = resolve(path1);
    if (resolvedPath.length >= 3) {
      if (resolvedPath.charCodeAt(0) === 92) {
        if (resolvedPath.charCodeAt(1) === 92) {
          const code = resolvedPath.charCodeAt(2);
          if (code !== 63 && code !== 46) {
            return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
          }
        }
      } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
        if (
          resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92
        ) {
          return `\\\\?\\${resolvedPath}`;
        }
      }
    }
    return path1;
  }
  function dirname(path1) {
    assertPath(path1);
    const len = path1.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path1.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code)) {
        rootEnd = offset = 1;
        if (isPathSeparator(path1.charCodeAt(1))) {
          let j = 2;
          let last = j;
          for (; j < len; ++j) {
            if (isPathSeparator(path1.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (!isPathSeparator(path1.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              last = j;
              for (; j < len; ++j) {
                if (isPathSeparator(path1.charCodeAt(j))) break;
              }
              if (j === len) {
                return path1;
              }
              if (j !== last) {
                rootEnd = offset = j + 1;
              }
            }
          }
        }
      } else if (isWindowsDeviceRoot(code)) {
        if (path1.charCodeAt(1) === 58) {
          rootEnd = offset = 2;
          if (len > 2) {
            if (isPathSeparator(path1.charCodeAt(2))) rootEnd = offset = 3;
          }
        }
      }
    } else if (isPathSeparator(code)) {
      return path1;
    }
    for (let i = len - 1; i >= offset; --i) {
      if (isPathSeparator(path1.charCodeAt(i))) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1) {
      if (rootEnd === -1) return ".";
      else end = rootEnd;
    }
    return path1.slice(0, end);
  }
  function basename(path1, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path1);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path1.length >= 2) {
      const drive = path1.charCodeAt(0);
      if (isWindowsDeviceRoot(drive)) {
        if (path1.charCodeAt(1) === 58) start = 2;
      }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path1.length) {
      if (ext.length === path1.length && ext === path1) return "";
      let extIdx = ext.length - 1;
      let firstNonSlashEnd = -1;
      for (i = path1.length - 1; i >= start; --i) {
        const code = path1.charCodeAt(i);
        if (isPathSeparator(code)) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if ((--extIdx) === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd;
      else if (end === -1) end = path1.length;
      return path1.slice(start, end);
    } else {
      for (i = path1.length - 1; i >= start; --i) {
        if (isPathSeparator(path1.charCodeAt(i))) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return "";
      return path1.slice(start, end);
    }
  }
  function extname(path1) {
    assertPath(path1);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (
      path1.length >= 2 && path1.charCodeAt(1) === 58 &&
      isWindowsDeviceRoot(path1.charCodeAt(0))
    ) {
      start = startPart = 2;
    }
    for (let i = path1.length - 1; i >= start; --i) {
      const code = path1.charCodeAt(i);
      if (isPathSeparator(code)) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1) startDot = i;
        else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (
      startDot === -1 || end === -1 || preDotState === 0 ||
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
    ) {
      return "";
    }
    return path1.slice(startDot, end);
  }
  function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
      throw new TypeError(
        `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`,
      );
    }
    return _format("\\", pathObject);
  }
  function parse(path1) {
    assertPath(path1);
    const ret = {
      root: "",
      dir: "",
      base: "",
      ext: "",
      name: "",
    };
    const len = path1.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path1.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code)) {
        rootEnd = 1;
        if (isPathSeparator(path1.charCodeAt(1))) {
          let j = 2;
          let last = j;
          for (; j < len; ++j) {
            if (isPathSeparator(path1.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (!isPathSeparator(path1.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              last = j;
              for (; j < len; ++j) {
                if (isPathSeparator(path1.charCodeAt(j))) break;
              }
              if (j === len) {
                rootEnd = j;
              } else if (j !== last) {
                rootEnd = j + 1;
              }
            }
          }
        }
      } else if (isWindowsDeviceRoot(code)) {
        if (path1.charCodeAt(1) === 58) {
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path1.charCodeAt(2))) {
              if (len === 3) {
                ret.root = ret.dir = path1;
                return ret;
              }
              rootEnd = 3;
            }
          } else {
            ret.root = ret.dir = path1;
            return ret;
          }
        }
      }
    } else if (isPathSeparator(code)) {
      ret.root = ret.dir = path1;
      return ret;
    }
    if (rootEnd > 0) ret.root = path1.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path1.length - 1;
    let preDotState = 0;
    for (; i >= rootEnd; --i) {
      code = path1.charCodeAt(i);
      if (isPathSeparator(code)) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1) startDot = i;
        else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (
      startDot === -1 || end === -1 || preDotState === 0 ||
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
    ) {
      if (end !== -1) {
        ret.base = ret.name = path1.slice(startPart, end);
      }
    } else {
      ret.name = path1.slice(startPart, startDot);
      ret.base = path1.slice(startPart, end);
      ret.ext = path1.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
      ret.dir = path1.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
  }
  function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
      throw new TypeError("Must be a file URL.");
    }
    let path1 = decodeURIComponent(
      url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
    ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
      path1 = `\\\\${url.hostname}${path1}`;
    }
    return path1;
  }
  function toFileUrl(path1) {
    if (!isAbsolute(path1)) {
      throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path1.match(
      /^(?:[/\\]{2}([^/\\]+)(?=[/\\][^/\\]))?(.*)/,
    );
    const url = new URL("file:///");
    url.pathname = pathname.replace(/%/g, "%25");
    if (hostname != null) {
      url.hostname = hostname;
      if (!url.hostname) {
        throw new TypeError("Invalid hostname.");
      }
    }
    return url;
  }
  return {
    sep,
    delimiter,
    resolve,
    normalize,
    isAbsolute,
    join,
    relative,
    toNamespacedPath,
    dirname,
    basename,
    extname,
    format,
    parse,
    fromFileUrl,
    toFileUrl,
  };
}();
const path1 = isWindows ? mod1 : mod;
const {
  basename,
  delimiter,
  dirname,
  extname,
  format,
  fromFileUrl,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  sep,
  toFileUrl,
  toNamespacedPath,
} = path1;
const sep1 = sep;
function normalizeGlob(glob, { globstar = false } = {}) {
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) {
    return normalize(glob);
  }
  const s = SEP_PATTERN.source;
  const badParentPattern = new RegExp(
    `(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`,
    "g",
  );
  return normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
function joinGlobs(globs, { extended = false, globstar = false } = {}) {
  if (!globstar || globs.length == 0) {
    return join(...globs);
  }
  if (globs.length === 0) return ".";
  let joined;
  for (const glob of globs) {
    const path2 = glob;
    if (glob.length > 0) {
      if (!joined) joined = glob;
      else joined += `${SEP}${glob}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob(joined, {
    extended,
    globstar,
  });
}
class Compiler {
  constructor(root, vue) {
    this.mount =
      `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;
    this.vue = `import Vue from '${vue}';\n`;
    this.root = root;
  }
  build() {
    try {
      ensureDirSync(_VNO_PATH);
      if (existsSync(_STYLE_PATH)) Deno.removeSync(_STYLE_PATH);
      Deno.writeTextFileSync(_BUILD_PATH, _IGNORE + this.vue);
      this.traverse(this.root);
      Deno.writeTextFileSync(_BUILD_PATH, this.mount, {
        append: true,
      });
      return print();
    } catch (error) {
      return console.error(`Error inside of Compiler.build:`, {
        error,
      });
    }
  }
  write(current) {
    if (
      !current.instance
    ) {
      throw `${current.label} is missing it's instance data`;
    }
    Deno.writeTextFileSync(_BUILD_PATH, current.instance, {
      append: true,
    });
    if (current.style) {
      Deno.writeTextFileSync(_STYLE_PATH, current.style, {
        append: true,
      });
    }
  }
  traverse(current) {
    if (current.child) {
      if (current.child.head) this.traverse(current.child.head);
    }
    if (current.sibling) {
      this.traverse(current.sibling);
    }
    this.write(current);
  }
}
class Parser {
  constructor(root1, vue1 = _CDN) {
    this.root = root1;
    this.vue = vue1;
    Queue.push(root1);
  }
  parse() {
    while (Queue.length) {
      const current = Queue.shift();
      if (current) {
        parseTemplate(current);
        parseScript(current);
        parseStyle(current);
        componentStringify(current);
      }
    }
    return new Compiler(this.root, this.vue).build();
  }
}
function _createWalkEntrySync(path2) {
  path2 = normalize(path2);
  const name = basename(path2);
  const info = Deno.statSync(path2);
  return {
    path: path2,
    name,
    isFile: info.isFile,
    isDirectory: info.isDirectory,
    isSymlink: info.isSymlink,
  };
}
async function _createWalkEntry(path2) {
  path2 = normalize(path2);
  const name = basename(path2);
  const info = await Deno.stat(path2);
  return {
    path: path2,
    name,
    isFile: info.isFile,
    isDirectory: info.isDirectory,
    isSymlink: info.isSymlink,
  };
}
async function* walk(
  root2,
  {
    maxDepth = Infinity,
    includeFiles = true,
    includeDirs = true,
    followSymlinks = false,
    exts = undefined,
    match = undefined,
    skip = undefined,
  } = {},
) {
  if (maxDepth < 0) {
    return;
  }
  if (includeDirs && include(root2, exts, match, skip)) {
    yield await _createWalkEntry(root2);
  }
  if (maxDepth < 1 || !include(root2, undefined, undefined, skip)) {
    return;
  }
  for await (const entry of Deno.readDir(root2)) {
    assert(entry.name != null);
    let path2 = join(root2, entry.name);
    if (entry.isSymlink) {
      if (followSymlinks) {
        path2 = await Deno.realPath(path2);
      } else {
        continue;
      }
    }
    if (entry.isFile) {
      if (includeFiles && include(path2, exts, match, skip)) {
        yield {
          path: path2,
          ...entry,
        };
      }
    } else {
      yield* walk(path2, {
        maxDepth: maxDepth - 1,
        includeFiles,
        includeDirs,
        followSymlinks,
        exts,
        match,
        skip,
      });
    }
  }
}
function* walkSync(
  root2,
  {
    maxDepth = Infinity,
    includeFiles = true,
    includeDirs = true,
    followSymlinks = false,
    exts = undefined,
    match = undefined,
    skip = undefined,
  } = {},
) {
  if (maxDepth < 0) {
    return;
  }
  if (includeDirs && include(root2, exts, match, skip)) {
    yield _createWalkEntrySync(root2);
  }
  if (maxDepth < 1 || !include(root2, undefined, undefined, skip)) {
    return;
  }
  for (const entry of Deno.readDirSync(root2)) {
    assert(entry.name != null);
    let path2 = join(root2, entry.name);
    if (entry.isSymlink) {
      if (followSymlinks) {
        path2 = Deno.realPathSync(path2);
      } else {
        continue;
      }
    }
    if (entry.isFile) {
      if (includeFiles && include(path2, exts, match, skip)) {
        yield {
          path: path2,
          ...entry,
        };
      }
    } else {
      yield* walkSync(path2, {
        maxDepth: maxDepth - 1,
        includeFiles,
        includeDirs,
        followSymlinks,
        exts,
        match,
        skip,
      });
    }
  }
}
function split(path2) {
  const s = SEP_PATTERN.source;
  const segments = path2.replace(new RegExp(`^${s}|${s}$`, "g"), "").split(
    SEP_PATTERN,
  );
  const isAbsolute_ = isAbsolute(path2);
  return {
    segments,
    isAbsolute: isAbsolute_,
    hasTrailingSep: !!path2.match(new RegExp(`${s}$`)),
    winRoot: isWindows && isAbsolute_ ? segments.shift() : undefined,
  };
}
async function copyDir(src, dest, options) {
  const destStat = await ensureValidCopy(src, dest, {
    ...options,
    isFolder: true,
  });
  if (!destStat) {
    await ensureDir(dest);
  }
  if (options.preserveTimestamps) {
    const srcStatInfo = await Deno.stat(src);
    assert(srcStatInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert(srcStatInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    await Deno.utime(dest, srcStatInfo.atime, srcStatInfo.mtime);
  }
  for await (const entry of Deno.readDir(src)) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, basename(srcPath));
    if (entry.isSymlink) {
      await copySymLink(srcPath, destPath, options);
    } else if (entry.isDirectory) {
      await copyDir(srcPath, destPath, options);
    } else if (entry.isFile) {
      await copyFile(srcPath, destPath, options);
    }
  }
}
function copyDirSync(src, dest, options) {
  const destStat = ensureValidCopySync(src, dest, {
    ...options,
    isFolder: true,
  });
  if (!destStat) {
    ensureDirSync(dest);
  }
  if (options.preserveTimestamps) {
    const srcStatInfo = Deno.statSync(src);
    assert(srcStatInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert(srcStatInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    Deno.utimeSync(dest, srcStatInfo.atime, srcStatInfo.mtime);
  }
  for (const entry of Deno.readDirSync(src)) {
    assert(entry.name != null, "file.name must be set");
    const srcPath = join(src, entry.name);
    const destPath = join(dest, basename(srcPath));
    if (entry.isSymlink) {
      copySymlinkSync(srcPath, destPath, options);
    } else if (entry.isDirectory) {
      copyDirSync(srcPath, destPath, options);
    } else if (entry.isFile) {
      copyFileSync(srcPath, destPath, options);
    }
  }
}
class Initialize {
  constructor() {
    this.root = null;
  }
  async config(options) {
    try {
      const { entry, root: root2 } = options;
      if (!entry) {
        throw "an entry path is required inside of your config method";
      }
      if (!root2) {
        throw "a root label is required to identify the root of your application";
      }
      const ready = await this.walk(entry, root2);
      if (!ready) throw "an error occured building out the queue";
      let vue2;
      options.vue ? { vue: vue2 } = options : null;
      if (this.root) return new Parser(this.root, vue2 && vue2).parse();
      else throw `an Error defining the root component`;
    } catch (error) {
      return console.error("Error inside of Initialize.config", {
        error,
      });
    }
  }
  async walk(entry, rootLabel) {
    for await (
      const file of walk(`${entry}`, {
        exts: [
          "vue",
        ],
      })
    ) {
      const { path: path2 } = file;
      if (path2.includes(rootLabel)) {
        this.root = new Component(rootLabel, path2, true);
        if (!this.root) throw `there was an error reading ${path2}`;
      } else {
        const regex = new RegExp(/\/(?<label>\w*)(\.vue)$/);
        const label1 = path2.match(regex)?.groups?.label;
        if (label1) Storage1[label1] = new Component(label1, path2);
        else throw `there was an error reading ${path2}`;
      }
    }
    return true;
  }
}
export default new Initialize();
