import { colors } from "../lib/deps.ts";
import { helpJSON } from "../lib/types.ts";

const logo = (` 
  __   ___ __   ___  
  \\ \\ / / '_ \\ / _ \\ 
   \\ V /| | | | (_) |
    \\_/ |_| |_|\\___/         

  `);

function ASCII() {
  console.log(colors.green(logo));
}

function QUIET() {
  console.log(colors.green("\nvno build complete...\n"));
}

function LISTEN(port: number, hostname?: string) {
  console.log(
    colors.green(
      colors.italic(`dev server is listening on ${hostname}:${port}\n`),
    ),
  );
}

function WARN(msg: string = "") {
  console.warn(`\n${colors.yellow(msg)}\n`);
}

function INFO(doc: helpJSON) {
  // version
  console.log(keyY("version", doc.version));
  // description
  console.log(`\n  ${colors.green(doc.description)}`);
  console.log(`\n${keyY("docs", doc.docs)}`);
  console.log(`${keyY("module", doc.module)}`);
}

function keyY(str1: string, str2?: string) {
  return `  ${colors.yellow(colors.italic(str1))}:  ${str2 || ""}`;
}
function keyG(str1: string, str2?: string) {
  return `    ${colors.green(colors.italic(str1))}:  ${str2 || ""}`;
}

function CMDS(doc: helpJSON) {
  // commands
  Object.keys(doc.commands).forEach((action: string) => {
    const { cmd, about } = doc.commands[action];
    console.log(`\n${keyG(action)}`);
    console.log(`\n      ${colors.yellow(">>")}  ${cmd[0]}`);
    console.log(`\n            ${colors.italic("--or--")}`);
    console.log(`\n      ${colors.yellow(">>")}  ${cmd[1]}`);
    console.log(`\n      ${about}`);
  });
  console.log(`\n`);
}

export default { ASCII, INFO, CMDS, QUIET, LISTEN, WARN };
