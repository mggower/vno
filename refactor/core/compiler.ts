import { hasValidInstance } from "./lib/types/typegaurds.ts";
import _def from "./lib/defaults.ts";
import { fs } from "./lib/deps.ts";
import { App } from "./lib/types/interfaces.ts";

export default function compileApp(storage: App.Storage): void {
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

  if (current.dependants !== null && current.dependants.head) {
    traverseGraph(current.dependants.head);
  }

  if (current.sibling) {
    traverseGraph(current.sibling);
  }

  if (current.parsed_data?.instance) {
    Deno.writeTextFileSync(_def.BUILD_PATH, current.parsed_data?.instance, {
      append: true,
    });
  }

  if (current.parsed_data?.styles) {
    Deno.writeTextFileSync(_def.STYLE_PATH, current.parsed_data?.styles, {
      append: true,
    });
  }
}

