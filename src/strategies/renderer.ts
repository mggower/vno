import { component, html, ssr } from "../lib/types.ts";

function Renderer(this: ssr) {
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

Renderer.prototype.htmlStringify = function (
  options: html,
  route: (component | undefined),
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
    ${route && `<script> ${route.instance} </script>`}
    ${scripts ? scripts : ""}
  </body>
  </html>`.replace(/\n|\s{2,}/gm, "");
};

Renderer.prototype.createRenderer = async function (
  obj: object,
  route: component | null,
) {
  this.html = this.htmlStringify(
    { ...this.defaults, ...obj },
    route && route,
  );
  return this.html;
};

export default Renderer;
