import Parser from "./base.ts";
import Compiler from "../compiler/compiler.ts";

import { Queue } from "../../lib/utils.ts";
import fn from "./parser-utils/_fn.ts";

Parser.prototype.parse = function () {
  while (Queue.length) {
    const current = Queue.shift();

    if (current && !current.isParsed) {
      fn.parseTemplate(current);
      fn.parseScript(current);
      fn.parseStyle(current);
      fn.componentStringify(current);

      current.isParsed = true;
    }
  }

  return new (Compiler as any)().build();
};

export default Parser;
