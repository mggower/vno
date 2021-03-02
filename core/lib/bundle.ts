import type { Component, Storage } from "../dts/factory.d.ts";
import { lintignore, VnoPath } from "../utils/constants.ts";
import { hasValidInstance } from "../utils/type_gaurds.ts";
import { fs } from "../utils/deps.ts";

export function writeBundle(storage: Storage): void {
  fs.ensureDirSync(VnoPath.Dir);

  if (fs.existsSync(VnoPath.Style)) {
    Deno.removeSync(VnoPath.Style);
  }

  Deno.writeTextFileSync(
    VnoPath.Build,
    lintignore + `${storage.vue.dep}"${storage.vue.cdn}";\n`,
  );

  postorderTraverse(storage.root);
  if (storage.vue.state === 3) {
    inorderTraverse(storage.root);
  }

  Deno.writeTextFileSync(VnoPath.Build, storage.vue.mount, {
    append: true,
  });
}

function postorderTraverse(current: Component): void {
  hasValidInstance(current);

  if (current.dependants != null && current.dependants.head) {
    postorderTraverse(current.dependants.head);
  }

  if (current.sibling) {
    postorderTraverse(current.sibling);
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

function inorderTraverse(current: Component): void {
  if (current.registration) {
    Deno.writeTextFileSync(VnoPath.Build, current.registration, {
      append: true,
    });
  }

  if (current.dependants != null && current.dependants.head) {
    inorderTraverse(current.dependants.head);
  }

  if (current.sibling) {
    inorderTraverse(current.sibling);
  }
}
