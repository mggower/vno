import { ParserInterface, ComponentInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";

/**
 * parser object interface vno contains the methods used during the parsing
 * process. all methods are called inside of 'parse', which then constructs
 * our cache of components and are sent through the build process.
 */
/**
 * The queue is used to line up component files that have not yet been parsed.
 * After parsing, the componet object is pushed into the cache for build.
 */


function Parser(this: ParserInterface, root: ComponentInterface, queue: [], vue: string = _CDN) {
  this.queue = queue;
  this.root = root;
  this.cache = {};
  this.vue = vue;
}

export default Parser;
