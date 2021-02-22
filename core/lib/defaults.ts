// defaults
// CDN (as of [01/05/21] this is the only stable vue CDN that works in Deno)
export const CDN = "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

// relative paths for vno-build/ in compiler.ts
export const VNO_PATH = "vno-build";
export const BUILD_PATH = "vno-build/build.js";
export const STYLE_PATH = "vno-build/style.css";

// ignore linting in build
export const IGNORE = `// deno-lint-ignore-file\n`;

// HTML for server-side rendering
export const HTML = {
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
