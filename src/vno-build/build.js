/* eslint-disable */
// prettier-ignore
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

var LilOrange = Vue.component('lilorange', {
  template: ` <div id="lilorange"> <h1>i'm just a clementine</h1> </div>`,
  name: 'lilorange',
  data() {
    return { color: 'orange' };
  },
});
var Red = Vue.component('red', {
  template: `<div id="red"> <h1>Andrew</h1> <a href="https://imgbb.com/" ><img src="https://i.ibb.co/cxPPLvy/andrew.png" alt="andrew" border="0" /></a> <p> Andrew is a classically trained flutist. He's a boss ass bitch who don't &nbsp; take no shit </p></div>`,
  name: 'red',
  data() {
    return { color: 'red' };
  },
});
var Green = Vue.component('green', {
  template: `<div id="green"> <h1>Mikey</h1> <a href="https://imgbb.com/" ><img src="https://i.ibb.co/Lz6jw4b/mikey.png" alt="mikey" border="0" /></a> <p> Mikey is a certified Sommolier. That means he knows a lot more about wine &nbsp;than you do. Also Sake. </p></div>`,
  name: 'green',
  data() {
    return { color: 'green' };
  },
});
var Orange = Vue.component('orange', {
  template: ` <div id="orange"> <h1>Jordan</h1> <a href="https://imgbb.com/" ><img src="https://i.ibb.co/m46njhp/jordan.png" alt="jordan" border="0" /></a> <p>Jordan has worked on Broadway! So, yes, he has much sass!</p> </div>`,
  name: 'orange',
  data() {
    return { color: 'orange' };
  },
  components: { LilOrange },
});
var Purple = Vue.component('purple', {
  template: `<div id="purple"> <h1>Kyle</h1> <a href="https://imgbb.com/" ><img src="https://i.ibb.co/6rxv4gC/kyle.png" alt="kyle" border="0" /></a> <p>Kyle (aka Grandpa Kyle) is here to party</p></div>`,
  name: 'purple',
  data() {
    return { color: 'purple' };
  },
});
var App = new Vue({
