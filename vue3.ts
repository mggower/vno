import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js";

const App = {
  template: `<div id="app"><h1>This is my app with VUE3</h1></div>`,
  data() {
    return {
      message: "Hello Vue.js",
    };
  },
};

const app = Vue.createApp(App)

app.component("baby", {
  props: ["todo"],
  template: `<li>{{ todo.text }}</li>`,
});

  
app.mount("#app");
