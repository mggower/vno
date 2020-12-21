import { ComponentInterface, ParserInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";

function Parser(
  this: ParserInterface,
  root: ComponentInterface,
  queue: [],
  vue: string = _CDN,
) {
  this.queue = queue;
  this.root = root;
  this.cache = {};
  this.vue = vue;
}


export default Parser;
