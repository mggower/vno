/* eslint-disable */
// prettier-ignore
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const HelloVno = Vue.component("hello-vno", {template: `<div class="hello"> <h1>{{ msg }}</h1> <p> For github documentation:<br> <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>. </p> <h3>Installed CLI Plugin</h3> <ul> <li><a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener">Click Here</a></li> <br> </ul></div>`, name: 'hello-vno', props: { msg: String },});
const App = new Vue({template: `<div id="app"><a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a><HelloVno msg="You are building: Your vno project with vno"/></div>`, name: 'app', components: { HelloVno }});

App.$mount("#app");
export default App;
