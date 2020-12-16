/* eslint-disable */
// prettier-ignore
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

var AppChild = Vue.component("app-child", {template: `<div class="item"><h2>{{ item }}</h2><img :src="url" width="235" height="300" /><div class="quantity"><button class="inc" @click="counter > 0 ? (counter -= 1) : 0">-</button><span class="quant-text">Quantity: {{ counter }}</span><button class="inc" @click="counter += 1">+</button></div><button class="submit">Submit</button></div>`,name:'app-child',data(){return{counter:0,};},props:['item','url'],});
var App = new Vue({template: `<div id="app"><div class="unit" v-for="unit in manifest" :key="unit.item"><app-child :item="unit.item" :url="unit.url"></app-child></div></div>`,name:'app',components:{AppChild,},data(){return{manifest:[{item:'backpack',url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/backpack.jpg',},{item:'tshirt',url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/tshirt.jpg',},{item:'sweatshirt',url:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/sweatshirt.jpg',},],};},});

App.$mount("#app");
export default App;
