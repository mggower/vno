import { colors } from "../lib/deps.ts";
import { infoJSON } from "../lib/types.ts";

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
// prints module specific information
function INFO(doc: infoJSON) {
  // version
  console.log(keyY("version", doc.version));
  // description
  console.log(`\n  ${colors.green(doc.description)}`);
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

function CMDS(doc: infoJSON) {
  // commands
  console.log(`\n${keyY("commands")}`);
  Object.keys(doc.commands).forEach((action: string) => {
    const { cmd, about } = doc.commands[action];
    console.log(`\n${keyG(action)}`);
    console.log(`      ${colors.yellow(">>")}  ${cmd[0]}`);
    console.log(`\n      ${colors.yellow(">>")}  ${cmd[1]}`);
    console.log(`\n      ${about}`);
  });
}

function OPTIONS(doc: infoJSON) {
  console.log(`\n${keyY("options")}`);
  Object.keys(doc.options).forEach((action: string) => {
    const { about } = doc.options[action];
    console.log(`\n${keyG(action)}`);
    console.log(`      ${colors.yellow(">>")}  ${about}`);
  });
  console.log(`\n`);
}

export default { ASCII, INFO, CMDS, QUIET, LISTEN, WARN, OPTIONS };
