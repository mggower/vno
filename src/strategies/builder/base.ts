import { BuilderInterface, ComponentInterface } from "../../lib/types.ts";

const Builder = function (this: BuilderInterface, root: ComponentInterface, cache: object) {
  this.root = root;
  this.cache = cache;
};

export default Builder;