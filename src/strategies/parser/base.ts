import { ComponentInterface, ParserInterface } from "../../lib/types.ts";
import { Queue, Storage } from "../../lib/utils.ts";
import _ from "../../lib/defaults.ts";

function Parser(
  this: ParserInterface,
  vue: string = _.CDN,
) {
  Queue.push(Storage.root);
  this.vue = vue;
}

export default Parser;
