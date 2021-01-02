/* eslint-disable */
// prettier-ignore
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

const One = Vue.component(
  "one",
  {
    template:
      `<div class="hello"> <h1>{{ msg }}</h1> <p> For github documentation:<br> <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>. </p> <h3>Installed CLI Plugin</h3> <ul> <li><a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener">Click Here</a></li> <br> </ul></div>`,
    name: "one",
    props: { msg: String },
  },
);
const App = new Vue(
  {
    template:
      `<div id="app"><a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a><One msg="You are building: DemoBaby with vno"/></div>`,
    name: "app",
    components: { One },
  },
);

App.$mount("#app");
export default App;
