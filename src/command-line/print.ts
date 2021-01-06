import { colors } from "../lib/deps.ts";
import { infoInterface } from "../lib/types.ts";

const logo = (` 
  __   ___ __   ___  
  \\ \\ / / '_ \\ / _ \\ 
   \\ V /| | | | (_) |
    \\_/ |_| |_|\\___/         

  `);
// prints after build
function ASCII() {
  console.log(colors.green(logo));
}
// prints instead of ASCII if 'quiet' argument is passed
function QUIET() {
  console.log(colors.green("\nvno build complete...\n"));
}
// prints when a server is listening
function LISTEN(port: number, hostname?: string) {
  console.log(
    colors.green(
      colors.italic(`dev server is listening on ${hostname}:${port}\n`),
    ),
  );
}
// print warning
function WARN(msg: string = "") {
  console.warn(`\n${colors.yellow(msg)}\n`);
}
function lineLength(string: string, length: number, tab: number) {
  let mutable = string.slice();
  let output = "";

  function dice(str: string) {
    let index = length;
    if (!str[index]) {
      output += `${(" ").repeat(tab)}${str || ""}\n`;
      return;
    }
    while (str[index] !== " ") {
      index -= 1;
    }
    output += `${(" ").repeat(tab)}${str.slice(0, index + 1)}\n`;
    dice(str.slice(index + 1));
    return;
  }
  dice(mutable);
  return output;
}
// prints module specific information
function INFO(doc: infoInterface) {
  // version
  console.log(keyY("version", doc.version));
  // description
  console.log(`\n${colors.green(lineLength(doc.description, 52, 4))}`);
  console.log(`\n${keyY("docs", doc.docs)}`);
  console.log(`${keyY("module", doc.module)}`);
}
// prints key/values to terminal in yellow with 2-space indent
function keyY(key: string, val?: string) {
  return `  ${colors.yellow(colors.italic(key))}:  ${val || ""}`;
}
// prints key/values to terminal in green with 4-space indent
function keyG(key: string, val?: string) {
  return `    ${colors.green(colors.italic(key))}:  ${val || ""}`;
}

function CMDS(doc: infoInterface) {
  // commands
  console.log(`\n${keyY("commands")}`);
  doc.commands.forEach((obj) => {
    const { action, cmd, about } = obj;
    console.log(`\n${keyG(action)}`);
    cmd.forEach((el) => {
      console.log(`${lineLength(`${colors.yellow(">>")}  ${el}`, 61, 6)}`);
    });
    console.log(`${lineLength(about, 60, 6)}`);
  });
}

function OPTIONS(doc: infoInterface) {
  // options flags
  console.log(`\n${keyY("options")}`);
  doc.options.forEach((obj) => {
    const { cmd, about } = obj;
    cmd.forEach((el) => {
      console.log(`\n${keyG(el)}`);
    });
    console.log(`      ${colors.yellow(">>")}  ${about}`);
  });
  console.log("\n");
}

export default { ASCII, INFO, CMDS, QUIET, LISTEN, WARN, OPTIONS, keyY, keyG };
