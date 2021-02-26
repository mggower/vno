/* eslint-disable */
/* eslint-disable prettier/prettier */
// deno-lint-ignore-file
import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js";

const HelloVno = {
  template: /* html */ `
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <br />
    </p>
    <h3>
      <a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> &
      <a
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener">
        github
      </a>
    </h3>
    <ul>
      <br />
    </ul>
  </div>
`,
  name: 'hello-vno',
  props: {
    msg: String,
  },
};

const App = {
  template: /* html */ `
  <div id="app">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />
    <HelloVno msg="you are building: your project with vno" />
  </div>
`,
  name: 'app',
  components: {HelloVno},
};

const vno3957 = Vue.createApp(App)
vno3957.component("hello-vno", HelloVno)

vno3957.mount("#app")