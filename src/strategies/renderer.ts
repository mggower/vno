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
  defaults: html;
}

interface options {
  entry: string;
  label: string;
  cdn?: string;
  title?: string;
  style?: string;
  meta?: string[];
  name?: string;
  build?: string;
}

interface html {
  language: string;
  title: string;
  root: string;
  meta: object;
  vue: string;
  link: object;
  script: object;
  build: object;
}

function Renderer(this: ssr) {
  this.root = null;
  this.children = [];
  this.defaults = {
    language: "en",
    title: "vno application",
    root: "app",
    meta: {
      charset: "utf-8",
      httpEquiv: ["X-UA-Compatible", "IE=edge"],
      viewport: "width=device-width,initial-scale=1.0",
    },
    vue: "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
    link: {},
    script: {},
    build: { bundle: "./build.js", style: "./style.css" },
  };
}

Renderer.prototype.config = async function (options: options) {
  const { entry, label, cdn } = options;

  await this.walk(entry, label);

  const { root, children } = this;
  const vno = new (Parser as any)(root, [root, ...children], cdn);

  await vno.parse();
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
};

Renderer.prototype.htmlStringify = async function (obj: html) {
  const { title, root, meta, vue, link, script, build } = obj;
  const html = await Deno.readTextFile("../templates/index.template.html");
  const test = `${html}`;
  console.log("html ->", html);
  console.log("test ->", test);
};

Renderer.prototype.createRenderer = async function (obj: object) {
  const merge = { ...this.defaults, ...obj };
  this.htmlStringify(merge);
  // console.log("merge -->", merge);
};

const demo = new (Renderer as any)();

demo.createRenderer({
  title: "test",
  root: "root",
  script: { module: "sassy.scss" },
});

// demo.config({
//   label: "App",
//   entry: "../",
//   cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
// });
