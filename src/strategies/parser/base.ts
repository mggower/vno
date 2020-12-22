import { ComponentInterface, ParserInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";
import Queue from "../queue.ts";
/*
function Parser(
  this: ParserInterface,
  root: ComponentInterface,
  vue: string = _CDN,
) {
  Queue.push(root);
  this.root = root;
  this.vue = vue;
}
*/

class Parser implements ParserInterface {
  root: ComponentInterface;
  vue: string;


  constructor(root: ComponentInterface, vue: string = _CDN) {
    this.root = root;
    this.vue = vue;

    Queue.push(root);
  }


}
export default Parser;
