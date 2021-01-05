import { colors } from "../lib/deps.ts";

function keyY(str1: string, str2?: string) {
  return `  ${colors.yellow(colors.italic(str1))}:  ${str2 || ""}`;
}
function keyG(str1: string, str2?: string) {
  return `    ${colors.green(colors.italic(str1))}:  ${str2 || ""}`;
}

interface cmd {
  [key: string]: any;
  cmd: string[];
  about: string;
}

interface cmdJson {
  version: string;
  description: string;
  docs: string;
  module: string;
  commands: cmd;
}
function docs(doc: cmdJson) {
  // version
  console.log(keyY("version", doc.version));
  // description
  console.log(`\n  ${colors.green(doc.description)}`);
  console.log(`\n${keyY("docs", doc.docs)}`);
  console.log(`${keyY("module", doc.module)}`);
  console.log(`\n${keyY("commands")}`);
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

export default docs;
