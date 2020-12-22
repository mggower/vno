import { ComponentInterface, ParserInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";
import Queue from "../queue.ts";
import Compiler from "../compiler/compiler.ts";

import componentStringify from "./utils/componentStringify.ts";
import parseTemplate from "./utils/parseTemplate.ts";
import parseScript from "./utils/parseScript.ts";
import parseStyle from "./utils/parseStyle.ts";

class Parser implements ParserInterface {
  root: ComponentInterface;
  vue: string;

  constructor(root: ComponentInterface, vue: string = _CDN) {
    this.root = root;
    this.vue = vue;

    Queue.push(root);
  }

  parse() {
    while (Queue.length) {
      const current = Queue.shift();
  
      if (current) {
        parseTemplate(current);
        parseScript(current);
        parseStyle(current);
        componentStringify(current);
      }
    }
  
    return new Compiler(this.root, this.vue).build();
  }

}
export default Parser;
