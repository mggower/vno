/* eslint-disable no-restricted-syntax */
import { join } from "https://deno.land/std@0.74.0/path/mod.ts";
import {
  ensureDir,
  exists,
  walk,
} from "https://deno.land/std@0.80.0/fs/mod.ts";
import Parser from "./parser.ts";
import { component } from "./types.ts";

interface ssr {
  root: component | null;
  children: object[];
}

function Renderer(this: ssr) {
  this.root = null;
  this.children = [];
}

Renderer.prototype.config = async function (options: any) {
  const { entry, label } = options;
  this.walk(entry, label);
};

Renderer.prototype.walk = async function (entry: string, id: string) {
  for await (const file of walk(`${entry}`, { exts: ["vue"] })) {
    const { path } = file;

    if (path.includes(id)) this.root = { label: id, path };
    else {
      const regex = new RegExp(/\/(?<label>\w*)(\.vue)$/);
      const label = path.match(regex)?.groups?.label;
      this.children.push({ label, path });
    }
  }
  const vno = new (Parser as any)(
    this.root,
    [this.root, ...this.children],
    "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
  );

  const results = await vno.parse();
  console.log("REZULTZ ->", results);
};

const demo = new (Renderer as any)();

demo.config({
  label: "App",
  entry: "../",
});

/**
 * config -->
 * {
 * root --> {
 *  label: "App"
 *  entry: "client"
 * }
 * }
 */
