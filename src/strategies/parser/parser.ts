import Parser from "./base.ts";

import Compiler from "../compiler/compiler.ts";
import { Queue } from "../../lib/utils.ts";

import {
  componentStringify,
  parseScript,
  parseStyle,
  parseTemplate,
} from "./utils/_funx.ts";

Parser.prototype.parse = function () {
  while (Queue.length) {
    const current = Queue.shift();

    if (current) {
      parseTemplate(current);
      parseScript(current);
      parseStyle(current);
      componentStringify(current);
    }
  }

  return new (Compiler as any)(this.root, this.vue).build();
};

export default Parser;
