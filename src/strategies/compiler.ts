import { fs } from "../lib/deps.ts";
import { CompilerInterface, ComponentInterface } from "../lib/types.ts";
import Utils, { Storage } from "../lib/utils.ts";

import _ from "../lib/defaults.ts";

function Compiler(this: CompilerInterface) {
  this.vue = `import Vue from '${Storage.root.vue}';\n`;
  this.mount =
    `\n${Storage.root.label}.$mount("#${Storage.root.name}");\nexport default ${Storage.root.label};\n`;
}

Compiler.prototype.build = function () {
  try {
    fs.ensureDirSync(_.VNO_PATH);

    if (fs.existsSync(_.STYLE_PATH)) Deno.removeSync(_.STYLE_PATH);
    Deno.writeTextFileSync(_.BUILD_PATH, _.IGNORE + this.vue);

    this.traverse(Storage.root);
    Deno.writeTextFileSync(_.BUILD_PATH, this.mount, { append: true });

    return Utils.print();
  } catch (error) {
    return console.error(
      `Error inside of Compiler.build:`,
      { error },
    );
  }
};

Compiler.prototype.write = function w(current: ComponentInterface) {
  if (!current.instance) {
    throw (
      `${current.label} is missing its instance data`
    );
  }
  Deno.writeTextFileSync(_.BUILD_PATH, current.instance, { append: true });
  if (current.style) {
    Deno.writeTextFileSync(_.STYLE_PATH, current.style, { append: true });
  }
};

Compiler.prototype.traverse = function trav(current: ComponentInterface) {
  if (current.child?.head) this.traverse(current.child.head);
  if (current.sibling) this.traverse(current.sibling);
  this.write(current);
};

export default Compiler;
