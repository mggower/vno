import type { Component, Storage } from "../dts/factory.d.ts";
import { LintIgnore, VnoPath } from "../lib/constants.ts";
import { hasValidInstance } from "../lib/type_gaurds.ts";
import { fs } from "../lib/deps.ts";

export function writeBundle(storage: Storage): void {
  const Mount = `\n${storage.root.label}.$mount("#${storage.root.name}");`;
  const Vue = `import Vue from '${storage.vue}';\n`;

  fs.ensureDirSync(VnoPath.Dir);

  if (fs.existsSync(VnoPath.Style)) {
    Deno.removeSync(VnoPath.Style);
  }

  Deno.writeTextFileSync(VnoPath.Build, LintIgnore + Vue);

  traverseGraph(storage.root);

  Deno.writeTextFileSync(VnoPath.Build, Mount, {
    append: true,
  });
}

function traverseGraph(current: Component): void {
  if (hasValidInstance(current) === false) {
    throw new TypeError(`${current.label} has no instance prop`);
  }

  if (current.dependants != null && current.dependants.head) {
    traverseGraph(current.dependants.head);
  }

  if (current.sibling) {
    traverseGraph(current.sibling);
  }

  if (current.instance) {
    Deno.writeTextFileSync(VnoPath.Build, current.instance, {
      append: true,
    });
  }

  if (current.styles) {
    Deno.writeTextFileSync(VnoPath.Style, current.styles, {
      append: true,
    });
  }
}
