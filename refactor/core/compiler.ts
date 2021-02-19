import { hasValidInstance } from "./lib/types/typegaurds.ts";

import _def from "./lib/defaults.ts";
import { fs } from "./lib/deps.ts";
import { App, Factory } from "./lib/types/interfaces.ts";

export default function compileApp(storage: Factory.Storage): void {
  const mount = `\n${storage.root.label}.$mount("#${storage.root.name}");`;
  const vue = `import Vue from '${storage.vue}';\n`;

  fs.ensureDirSync(_def.VNO_PATH);
  
  if (fs.existsSync(_def.STYLE_PATH)) {
    Deno.removeSync(_def.STYLE_PATH);
  }
  
  Deno.writeTextFileSync(_def.BUILD_PATH, _def.IGNORE + vue);
  
  traverseGraph(storage.root);
  
  Deno.writeTextFileSync(_def.BUILD_PATH, mount, {
    append: true
  });
}

function traverseGraph(current: App.Component): void {
  if (hasValidInstance(current) === false) {
    throw new TypeError(`${current.label} has no instance prop`);
  }

  if (current.type === "composite" && current.child.head) {
    traverseGraph(current.child.head);
  }

  if (current.sibling) {
    traverseGraph(current.sibling);
  }

  if (current.instance) {
    Deno.writeTextFileSync(_def.BUILD_PATH, current.instance, {
      append: true,
    });
  }

  if (current.style) {
    Deno.writeTextFileSync(_def.STYLE_PATH, current.style, {
      append: true,
    });
  }
}

