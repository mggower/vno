import { Component, Vue } from "../dts/factory.d.ts";

export function vueLogger(
  vue: Vue.Version,
  root: Component,
  variable: string,
): Vue.State {
  switch (vue) {
    case 3:
      return {
        state: vue,
        dep: "import * as Vue from ",
        cdn: "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js",
        mount: `\n${variable}.mount("#${root.name}")`,
      };
    case 2:
      return {
        state: vue,
        dep: "import Vue from ",
        cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
        mount: `\n${root.label}.$mount("#${root.name}")`,
      };
  }
}
