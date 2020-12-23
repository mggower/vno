import { ensureDirSync, existsSync } from "../../lib/deps.ts";
import { ComponentInterface } from "../../lib/types.ts";
import Utils from "../../lib/utils.ts";

import Compiler from "./base.ts";

import {
  _BUILD_PATH,
  _IGNORE,
  _STYLE_PATH,
  _VNO_PATH,
} from "../../lib/defaults.ts";

Compiler.prototype.build = function () {
  try {
    ensureDirSync(_VNO_PATH);

    if (existsSync(_STYLE_PATH)) Deno.removeSync(_STYLE_PATH);
    Deno.writeTextFileSync(_BUILD_PATH, _IGNORE + this.vue);

    this.traverse(this.root);
    Deno.writeTextFileSync(_BUILD_PATH, this.mount, { append: true });

    return Utils.print();
  } catch (error) {
    return console.error(`Error inside of Compiler.build:`, { error });
  }
};

Compiler.prototype.write = function w(current: ComponentInterface) {
  if (!current.instance) throw `${current.label} is missing it's instance data`;

  Deno.writeTextFileSync(_BUILD_PATH, current.instance, { append: true });

  if (current.style) {
    Deno.writeTextFileSync(_STYLE_PATH, current.style, { append: true });
  }
};

Compiler.prototype.traverse = function trav(current: ComponentInterface) {
  if (current.child) this.traverse(current.child.head);
  if (current.sibling) this.traverse(current.sibling);

  this.write(current);
};

export default Compiler;
