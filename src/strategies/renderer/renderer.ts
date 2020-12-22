import {
  ComponentInterface,
  HtmlInterface,
  RendererInterface,
} from "../../lib/types.ts";
import { _HTML } from "../../lib/defaults.ts";

class Renderer implements RendererInterface {
  html: string;

  constructor() {
    this.html = "";
  }

  async createRenderer(obj: object, route: ComponentInterface | null) {
    this.html = this.htmlStringify(
      { ..._HTML, ...obj },
      route && route,
    );
    return this.html;
  }

  htmlStringify(options: HtmlInterface, route: ComponentInterface | null) {
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
  }
}

export default Renderer;
