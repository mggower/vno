import { ComponentInterface, ParserInterface } from "../../lib/types.ts";
import { Queue } from "../../lib/utils.ts";
import _ from "../../lib/defaults.ts";

function Parser(
  this: ParserInterface,
  root: ComponentInterface,
  vue: string = _.CDN,
) {
  Queue.push(root);
  this.root = root;
  this.vue = vue;
}

export default Parser;
