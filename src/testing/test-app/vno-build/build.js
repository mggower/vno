// deno-lint-ignore-file
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const ChildTest = Vue.component("child-test", {template: ` <div class="place"> <img :src="location.img" width="235" height="300" /> <slot></slot> <p>{{ location.desc }}</p> </div>`, props: ['location'],});
const App = new Vue({template: ` <div id="test"> {{result}} </div>`, test: 'testing', name: 'test', components: { ChildTest }, data() { return { result: "this is a test" }; },});

App.$mount("#test");
export default App;
