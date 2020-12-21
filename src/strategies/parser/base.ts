import { ComponentInterface, ParserInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";
import Queue from "../queue.ts";

function Parser(
  this: ParserInterface,
  root: ComponentInterface,
  vue: string = _CDN,
) {
  Queue.push(root);
  this.root = root;
  this.vue = vue;
}

export default Parser;
