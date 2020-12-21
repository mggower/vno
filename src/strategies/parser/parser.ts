import Parser from "./base.ts";

import Queue from "../queue.ts";
import Compiler from "../compiler/compiler.ts";

import { ComponentInterface } from "../../lib/types.ts";

import componentStringify from "./utils/componentStringify.ts";
import parseTemplate from "./utils/parseTemplate.ts";
import parseScript from "./utils/parseScript.ts";
import parseStyle from "./utils/parseStyle.ts";

Parser.prototype.parse = function () {
  while (Queue.length) {
    const current: ComponentInterface | undefined = Queue.shift();

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
