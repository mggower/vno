import { colors } from "../lib/deps.ts";
import { out } from "./vno.cli.ts";

export const msgGreen = function (str: string) {
  console.log(colors.green(str));
};

export const msgYellow = function (str: string) {
  console.log(colors.yellow(str));
};

export const confirmation = function <S>(a: S, b: S, c: S, d: S): string {
  return `\nYour Project:\n\n` +
    `    Title: ${a || out.options.title}\n` +
    `    Root: ${b || out.options.root}\n` +
    `    Additional Component(s): ${c}\n` +
    `    Port: ${d || out.options.port}\n`;
};

// prints key/values to terminal in yellow with 2-space indent
export const keyYellow = function (key: string, val?: string) {
  return `  ${colors.yellow(colors.italic(key))}:  ${val || ""}`;
};

// prints key/values to terminal in green with 4-space indent
export const keyGreen = function (key: string, val?: string) {
  return `    ${colors.green(colors.italic(key))}:  ${val || ""}`;
};

// function breaks up long strings to new lines at max length
export const lineLength = function (str: string, length: number, tab: number) {
  let output = "";

  const breaks = function (str: string) {
    let index = length;
    if (!str[index]) {
      output += `${(" ").repeat(tab)}${str || ""}\n`;
      return;
    }
    while (str[index] !== " ") {
      index -= 1;
    }
    output += `${(" ").repeat(tab)}${str.slice(0, index + 1)}\n`;
    breaks(str.slice(index + 1));
    return;
  };

  breaks(str);
  return output;
};
