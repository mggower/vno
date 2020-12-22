import { CompilerInterface, ComponentInterface } from "../../lib/types.ts";
import print from "../../lib/console.ts";

import {
  _BUILD_PATH,
  _IGNORE,
  _STYLE_PATH,
  _VNO_PATH,
} from "../../lib/defaults.ts";

import {
  ensureDirSync,
  existsSync,
} from "https://deno.land/std@0.80.0/fs/mod.ts";
class Compiler implements CompilerInterface {
  root: ComponentInterface;
  mount: string;
  vue: string;

  constructor(root: ComponentInterface, vue: string) {
    this.mount = `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;
    this.vue = `import Vue from '${vue}';\n`;
    this.root = root;
  }

  build() {
    try {
      ensureDirSync(_VNO_PATH);
  
      if (existsSync(_STYLE_PATH)) Deno.removeSync(_STYLE_PATH);
      Deno.writeTextFileSync(_BUILD_PATH, _IGNORE + this.vue);
  
      this.traverse(this.root);
      Deno.writeTextFileSync(_BUILD_PATH, this.mount, { append: true });
  
      return print();
    } catch (error) {
      return console.error(`Error inside of Compiler.build:`, { error });
    }
  }

  write(current: ComponentInterface) {
    if (!current.instance) throw `${current.label} is missing it's instance data`;

    Deno.writeTextFileSync(_BUILD_PATH, current.instance, { append: true });
  
    if (current.style) {
      Deno.writeTextFileSync(_STYLE_PATH, current.style, { append: true });
    }
  }

  traverse(current: ComponentInterface) {
    if (current.child) {
      if (current.child.head) this.traverse(current.child.head);
    }
    if (current.sibling) {
      this.traverse(current.sibling);
    }
  
    this.write(current);
  }
}

export default Compiler;
