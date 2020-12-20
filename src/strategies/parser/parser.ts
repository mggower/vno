import Parser from "./read.ts";
import { _CDN } from "../../lib/defaults.ts";
import { component } from "../../lib/types.ts";
import Builder from "../builder/builder.ts";

/**
   * parse is an async method that will be invoked with the application root
   * to begin app parsing. Parse calls all vno methods.
   * @param root ;; a component object { name, path }
   */
Parser.prototype.parse = async function () {
  while (this.queue.length) {
    const current: component = this.queue.shift();
    const cached = await this.init(current);

    if (!cached) {
      throw `There was an error parsing ${current.label}`;
    }
  }

  const write = new (Builder as any)(this.root, this.cache);
  console.log("cash", this.cache);
  return write.build();
};

export default Parser;
