import type { Util } from "../dts/factory.d.ts";
import { patterns } from "./constants.ts";

// returns index of pattern match
export const indexOfRegExp: Util.IOF = function (rx, arr) {
  return arr.findIndex((el) => rx.test(el));
};

// trims excess whitespace from an slice of an array and joins as string
export const sliceAndTrim: Util.TRIM = function (input, i, j) {
  if (typeof input === "string") return input;
  return input.slice(i, j).join("").replace(patterns.whitespace, " ");
};

// trims any whitespace from a slice of a string and returns as array
export const trimAndSplit: Util.TRIM = function (input, i, j) {
  if (typeof input !== "string") return input;
  return input.slice(i, j).replace(/\s/g, "").split(",");
};

// removes carriage return for windows users
export const removeCarriageReturn: Util.TXT = function (text) {
  return text.split("\r").filter((text) => text !== "\r").join("\n");
};

// stdin/out decoder for cli
export const prompt = async function (msg: string): Promise<string> {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(`${msg}: `));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
};

