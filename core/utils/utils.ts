import { patterns } from "./constants.ts";

// returns index of pattern match
export function indexOfRegExp(rx: RegExp, arr: string[]): number {
  return arr.findIndex((el) => rx.test(el));
}

// trims excess whitespace from an slice of an array and joins as string
export function sliceAndTrim(input: string[], i: number, j: number): string {
  return input.slice(i, j).join("").replace(patterns.whitespace, " ");
}

// trims any whitespace from a slice of a string and returns as array
export function trimAndSplit(input: string, i: number, j: number): string[] {
  return input.slice(i, j).replace(/\s/g, "").split(",");
}

// removes carriage return for windows users
export function removeCarriageReturn(text: string): string {
  return text.split("\r").filter((text) => text !== "\r").join("\n");
}
