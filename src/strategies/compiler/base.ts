import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";

const Compiler = function (this: CompilerInterface, root: ComponentInterface) {
  this.mount = `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;
  this.root = root;
};

export default Compiler;
