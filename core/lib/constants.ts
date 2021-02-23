export enum ComponentType {
  Primitive = "PRIMTIVE",
  Composite = "COMPOSITE",
}

export enum VueCDN {
  Vue2 = "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
  Vue3 = "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js",
}

// relative paths for vno-build/ bundle
export enum VnoPath {
  Dir = "vno-build",
  Build = "vno-build/build.js",
  Style = "vno-build/style.css",
}

// ignore linting in build
export const LintIgnore = `/* eslint-disable */
/* eslint-disable prettier/prettier */
// deno-lint-ignore-file
`;
