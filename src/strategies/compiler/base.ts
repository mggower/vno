import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";

const Compiler = function (this: CompilerInterface, root: ComponentInterface) {
  this.root = root;
};

export default Compiler;
