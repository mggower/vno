import { ParserInterface } from "../../lib/types.ts";
import { Queue, Storage } from "../../lib/utils.ts";

function Parser(this: ParserInterface) {
  Queue.push(Storage.root);
}

export default Parser;
