// deno-lint-ignore-file
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const Home = Vue.component("home", {template: ` <div class="hello"> <h1 @click="Alert">{{ msg }}</h1> <p> <br /> </p> <h3> <a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> & <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener"> github </a> </h3> <ul> <br /> </ul> </div>`,name: 'home', props: { msg: String, }, methods: { Alert() { alert("Hi!!!"); } } });
const App = new Vue({template: ` <div id="app"> <img src="https://svgshare.com/i/SNz.svg" alt="image" border="0" width="450" height="450" /> <Home :msg="message" /> </div>`,name: "app", components: { Home }, data() { const message = "you are building: Vue App with vno"; return { message, }; }, });

App.$mount("#app");
export default App;
