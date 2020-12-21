import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";

function Compiler (this: CompilerInterface, root: ComponentInterface, vue: string) {
  this.mount = `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;
  this.vue = `import Vue from '${vue}';\n`;;
  this.root = root;
};

export default Compiler;
