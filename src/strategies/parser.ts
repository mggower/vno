import Compiler from "./compiler.ts";

import { ParserInterface } from "../lib/types.ts";
import { Queue, Storage } from "../lib/utils.ts";

import fn from "./parser-utils/_fn.ts";

function Parser(this: ParserInterface) {
  Queue.push(Storage.root);
}

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
