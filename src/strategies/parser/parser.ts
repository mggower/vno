import Parser from "./base.ts";
import Compiler from "../compiler/compiler.ts";

import Queue from "../queue.ts";

import { ComponentInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";

import parseTemplate from "./utils/parseTemplate.ts";
import parseScript from "./utils/parseScript.ts";
import parseStyle from "./utils/parseStyle.ts";

import componentStringify from "./utils/componentStringify.ts";

Parser.prototype.parse = async function () {
  while (Queue.length) {
    const current: ComponentInterface | undefined = Queue.shift();

    if (current) {
      parseTemplate(current);
      parseScript(current);
      parseStyle(current);
      componentStringify(current);
    }
  }

  const demo = new (Compiler as any)(this.root);
  // console.log("cash", this.cache);
  demo.recurse(demo.root);
};

export default Parser;
