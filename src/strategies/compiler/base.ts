import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";
import { Storage } from '../../lib/utils.ts';


function Compiler(
  this: CompilerInterface,
  vue: string,
) {
  this.mount =
    `\n${Storage.root.label}.$mount("#${Storage.root.name}");\nexport default ${Storage.root.label};\n`;
  this.vue = `import Vue from '${vue}';\n`;
  this.cache = {};
}

export default Compiler;
