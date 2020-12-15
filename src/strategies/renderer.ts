/* eslint-disable no-restricted-syntax */
import { walk } from "https://deno.land/std@0.80.0/fs/mod.ts";
import { component, html, options, ssr } from "./types.ts";
import Parser from "./parser.ts";

function Renderer(this: ssr) {
  this.root = null;
  this.children = [];
  this.html = "";
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

Renderer.prototype.htmlStringify = function (
  options: html,
  component: (component | undefined),
) {
  const { language, title, root, meta, vue, build, link, script } = options;

  let links = "";
  if (link) {
    for (const rel in link) {
      links += `<link rel="${rel}" href="${link[rel]}">`;
    }
  }

  let scripts = "";
  if (script) {
    for (const type in script) {
      scripts += `<script type="${type}" src='${script[type]}'></script>`;
    }
  }

  return `<!DOCTYPE html>
  <html lang="${language}">
  <head>
    <meta charset="${meta.charset}" />
    <meta http-equiv="${meta.httpEquiv[0]}" content="${meta.httpEquiv[1]}" />
    <meta name="viewport" content="${meta.viewport}" />
    <link rel="stylesheet" href="${build.style}">
    ${links ? links : ""}
    <title>${title}</title>
  </head>
  <body>
    <div id="${root}"></div>
    <script src="${vue}"></script>
    <script type="module" src='${build.bundle}'></script>
    ${component && `<script> ${component.instance} </script>`}
    ${scripts ? scripts : ""}
  </body>
  </html>`.replace(/\n|\s{2,}/gm, "");
};

Renderer.prototype.createRenderer = async function (
  obj: object,
  component: component | null,
) {
  this.html = this.htmlStringify(
    { ...this.defaults, ...obj },
    component && component,
  );
  return this.html;
};

export default new (Renderer as any)();
