// deno-lint-ignore-file
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

const Home = Vue.component("home", {
  template: /* html */
    `
  <div id="home">
  </div>
`,
  name: "home",
});

const Travel = Vue.component("travel", {
  template: /* html */
    `
  <div id="travel">
  </div>
`,
  name: "travel",
});

const App = new Vue({
  template: /* html */
    `
  <div id="app">
  </div>
`,
  name: "app",
  components: { Home, Travel },
});

App.$mount("#app");
