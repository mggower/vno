import { IdxOf, Join, Pattern, Split } from "../dts/type.vno.d.ts";

// reoccuring patterns
export const patterns: Pattern = {
  multilineComment: /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm,
  htmlComment: /<!--([\s\S]*?)-->/gm,
  import:
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gm,
  url:
    /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm,
  whitespace: /(\s{2,})/g,
};

// returns index of pattern match
export const indexOfRegExp: IdxOf = function (rx, arr) {
  return arr.findIndex((el) => rx.test(el));
};

// trims excess whitespace from an slice of an array and joins as string
export const sliceAndTrim: Join = function (arr, i, j) {
  return arr.slice(i, j).join("").replace(patterns.whitespace, " ");
};

// trims any whitespace from a slice of a string and returns as array
export const trimAndSplit: Split = function (str, i, j) {
  return str.slice(i, j).replace(/\s/g, "").split(",");
};

// stdin/out decoder for cli
export const prompt = async function (msg: string): Promise<string> {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(`${msg}: `));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
};

// removes carriage return for windows users
export const removeCarriageReturn = function (text: string): string {
  return text.split("\r").filter((text) => text !== "\r").join("\n");
};
