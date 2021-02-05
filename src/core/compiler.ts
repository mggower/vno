import { Storage, Component, Parsed } from "../lib/newtypes.ts";
import _def from "../lib/defaults.ts";
import { fs } from "../lib/deps.ts";

/**
 * Compiler
 * (3/3) in bundling cycle
 * Compiler writes component instances to build file
 * and writes styling to style css file
 */
function compileApp(storage: Storage): Storage {
  const mount = `\n${storage.root.label}.$mount("#${storage.root.name}");`;
  const vue = `import Vue from '${storage.root.vue}';\n`;

  fs.ensureDirSync(_def.VNO_PATH);
  if (fs.existsSync(_def.STYLE_PATH)) Deno.removeSync(_def.STYLE_PATH);
  // write to build, lint ignore and import vue with CDN
  Deno.writeTextFileSync(_def.BUILD_PATH, _def.IGNORE + vue);
  // invokes traverse to write the components in single threaded sequence

  traverseGraph(storage.root, (current: Parsed) => {
    Deno.writeTextFileSync(_def.BUILD_PATH, current.instance, { append: true });

    if (current.style) {
      Deno.writeTextFileSync(_def.STYLE_PATH, current.style, { append: true });
    }
  });
  // write to build, mount app to the dom to complete
  Deno.writeTextFileSync(_def.BUILD_PATH, mount, { append: true });

  return storage;
}


function traverseGraph(current: Component, callback: Function): void {
  if (current.child?.head) traverseGraph(current.child.head, callback);
  if (current.sibling) traverseGraph(current.sibling, callback);
  callback(current)
}

export default compileApp;
