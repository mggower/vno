import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";

const Compiler = function (this: CompilerInterface, root: ComponentInterface, vue: string) {
  this.mount = `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;
  this.root = root;
  this.vue = vue;
};

export default Compiler;
