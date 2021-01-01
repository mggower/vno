import { CompilerInterface } from "../../lib/types.ts";
import { Storage } from "../../lib/utils.ts";

function Compiler(this: CompilerInterface) {
  this.mount = `\n${Storage.root.label}.$mount("#${Storage.root.name}");` +
    `\nexport default ${Storage.root.label};\n`;
  this.vue = `import Vue from '${Storage.root.vue}';\n`;
}

export default Compiler;
