import Parser from "./base.ts";
import Compiler from "../compiler/compiler.ts";

import { Queue } from "../../lib/utils.ts";
import fn from "./utils/_fn.ts";

Parser.prototype.parse = function () {
  while (Queue.length) {
    const current = Queue.shift();

    if (current) {
      fn.parseTemplate(current);
      fn.parseScript(current);
      fn.parseStyle(current);
      fn.componentStringify(current);
    }
  }

  return new (Compiler as any)(this.root, this.vue).build();
};

export default Parser;
