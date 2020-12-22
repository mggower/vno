export const _CDN =
  "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

export const _HTML = {
  language: "en",
  title: "vno application",
  root: "app",
  meta: {
    charset: "utf-8",
    httpEquiv: ["X-UA-Compatible", "IE=edge"],
    viewport: "width=device-width,initial-scale=1.0",
  },
  vue: _CDN,
  link: {},
  script: {},
  build: { bundle: "./build.js", style: "./style.css" },
};

export const _VNO_PATH = "vno-build";
export const _BUILD_PATH = "vno-build/build.js";
export const _STYLE_PATH = "vno-build/style.css";

export const _IGNORE = `/* eslint-disable */\n// prettier-ignore\n`;
