import { Component } from "../dts/factory.d.ts";

export enum ComponentType {
  Primitive = "PRIMITIVE",
  Composite = "COMPOSITE",
}

export const Vue = {
  version2: {
    dep: "import Vue from ",
    cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
    mount: (root: Component) => `${root.label}.$mount("${root.name}")`,
  },
  version3: {
    dep: "import * asVue from ",
    cdn: "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js",
    mount: (root: Component) => `app.mount("${root.name}")`,
  },
};

// relative paths for vno-build/ bundle
export const VnoPath: Record<string, string> = {
  Dir: "vno-build",
  Build: "vno-build/build.js",
  Style: "vno-build/style.css",
};

// ignore linting in build
export const lintignore = `/* eslint-disable */
/* eslint-disable prettier/prettier */
// deno-lint-ignore-file
`;

// reoccuring patterns
export const patterns: Record<string, RegExp> = {
  multilineComment: /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm,
  htmlComment: /<!--([\s\S]*?)-->/gm,
  import:
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gm,
  url:
    /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm,
  whitespace: /(\s{2,})/g,
};
