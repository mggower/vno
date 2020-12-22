/* eslint-disable */
// prettier-ignore
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

var Red = Vue.component("undefined", {template: `undefined`,undefined});
var Green = Vue.component("undefined", {template: `undefined`,undefined});
var Orange = Vue.component("undefined", {template: `undefined`,undefined});
var Purple = Vue.component("undefined", {template: `undefined`,undefined});
var App = new Vue({template: ` <div id="app"> <header class="header"> <img class="logo" src="https://svgshare.com/i/SNz.svg" alt="logo" /> <nav class="inner"> <button v-on:click="handelClick('green')">Mikey</button> <button v-on:click="handelClick('orange')">Jordan</button> <button v-on:click="handelClick('purple')">Kyle</button> <button v-on:click="handelClick('red')">Andrew</button> <a class="github" href="https://github.com/oslabs-beta/vno" target="_blank" ><button>Github</button> </a> </nav> </header> <body v-if="displayedComponent === 'red'"> <Red /> </body> <body v-else-if="displayedComponent === 'green'"> <Green /> </body> <body v-else-if="displayedComponent === 'orange'"> <Orange /> </body> <body v-else-if="displayedComponent === 'purple'"> <Purple /> </body> <body v-else> <h1>Welcome to Your vno Project</h1> <p> For a guide on project customization,<br /> check out out GitHub repo at: <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener" >vno documentation</a > </p> <ul> <li> <a href="https://github.com/jgrubb16/vnocli" target="_blank" rel="noopener" >Open Source CLI Tool</a > </li> </ul> </body> </div>`,name:'app',data(){return{displayedComponent:'',};},methods:{handelClick:function(event){this.displayedComponent=event;console.log(this.displayedComponent);},},components:{Red,Green,Orange,Purple,},});

App.$mount("#app");
export default App;
