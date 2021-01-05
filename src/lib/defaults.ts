// defaults

// CDN (as of [01/05/21] this is the only stable vue CDN that works in Deno)
const CDN = "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

// HTML for server-side rendering
const HTML = {
  language: "en",
  title: "vno application",
  root: "app",
  meta: {
    charset: "utf-8",
    httpEquiv: ["X-UA-Compatible", "IE=edge"],
    viewport: "width=device-width,initial-scale=1.0",
  },
  vue: CDN,
  link: {},
  script: {},
  build: { bundle: "./build.js", style: "./style.css" },
};

// relative paths for vno-build/ in compiler.ts
const VNO_PATH = "vno-build";
const BUILD_PATH = "vno-build/build.js";
const STYLE_PATH = "vno-build/style.css";
// ignore linting in build
const IGNORE = `// deno-lint-ignore-file\n`;

export default { CDN, HTML, VNO_PATH, BUILD_PATH, STYLE_PATH, IGNORE };
