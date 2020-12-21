import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";

const Compiler = function (this: CompilerInterface, root: ComponentInterface, cache: object) {
  this.root = root;
  this.cache = cache;
};

export default Compiler;