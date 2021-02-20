import { colors } from "../lib/deps.ts";

export const logo = (colors.bold(`
  __   ___ __   ___
  \\ \\ / / '_ \\ /   \\
   \\ V /| | | | (_) |
    \\_/ |_| |_|\\___/
`));

// prints after build
export const ASCII = function () {
  console.log(colors.green(logo));
};
// prints instead of ASCII if 'quiet' argument is passed
export const QUIET = function () {
  console.log(colors.green("\nvno build complete...\n"));
};
// prints when a server is listening
export const LISTEN = function (port: number, hostname?: string) {
  console.log(
    colors.green(
      colors.bold(
        `dev server is listening on ${
          colors.blue("http://localhost:" + port)
        }\n`,
      ),
    ),
  );
}

export const msgGreen = function (str: string) {
  console.log(colors.green(str));
}

export const msgYellow = function (str: string) {
  console.log(colors.yellow(str));
}

// print warning
export const WARN = function (msg: string) {
  console.warn(`\n${colors.yellow(msg)}\n`);
}
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
  }

  breaks(str);
  return output;
}
// prints module specific information
export const INFO = function (doc: infoInterface) {
  // version
  console.log(keyYellow("version", doc.version));
  // description
  console.log(`\n${colors.green(lineLength(doc.description, 52, 4))}`);
  console.log(`\n${keyYellow("docs", doc.docs)}`);
  console.log(`${keyYellow("module", doc.module)}`);
}
// prints key/values to terminal in yellow with 2-space indent
export const keyYellow = function (key: string, val?: string) {
  return `  ${colors.yellow(colors.italic(key))}:  ${val || ""}`;
}
// prints key/values to terminal in green with 4-space indent
export const keyGreen = function (key: string, val?: string) {
  return `    ${colors.green(colors.italic(key))}:  ${val || ""}`;
}

export const CMDS = function (doc: any) {
  // commands
  console.log("\n" + keyYellow("commands"));
  doc.commands.forEach((obj: { action: any; cmd: any; about: any; }) => {
    const { action, cmd, about } = obj;
    console.log("\n" + keyGreen(action));
    cmd.forEach((el: string) => {
      console.log(`${lineLength(colors.yellow(">>") + "  " + el, 61, 6)}`);
    });
    console.log(`${lineLength(about, 60, 6)}`);
  });
}

export const OPTIONS = function (doc: any) {
  // options flags
  console.log("\n" + keyYellow("options"));
  doc.options.forEach((obj: { cmd: any; about: any; }) => {
    const { cmd, about } = obj;
    cmd.forEach((el: string) => {
      console.log(`\n${keyGreen(el)}`);
    });
    console.log(`      ${colors.yellow(">>")}  ${about}`);
  });
  console.log("\n");
}
