/* eslint-disable */
// prettier-ignore
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const Home = Vue.component("Home", {template: ` <div class="home"> <h1>{{ msg }}</h1> <p> For github documentation:<br /> <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener" >&nbsp;vno documentation</a >. </p> <h3>Installed CLI Plugin</h3> <ul> <li> <a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener" >Click Here</a > </li> <br /> </ul> </div>`, name: 'Home', props: { msg: String, },});
const Navigation = Vue.component("Navigation", {template: ` <div class="navBar"> <ul> <li>Home</li> <li>Team</li> <li>Demo</li> <li>Docs</li> </ul> </div>`, name: 'Navigation', props: { msg: String, },});
const Team = Vue.component("Team", {template: ` <div id="team"></div>`, name: 'Team',});
const Docs = Vue.component("docs", {template: ` <div id="docs"> `, name: 'docs',});
const Demo = Vue.component("Demo", {template: ` <div id="demo"></div>`, name: 'Demo',});
const App = new Vue({template: ` <div id="app"> <Navigation /> <a href="https://ibb.co/mHwdLSK" ><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450" /></a> <home msg="A vue / Deno Integration" /> </div>`, name: 'app', components: { Home, Navigation, Team, Docs, Demo, },});

App.$mount("#app");
export default App;
