import AppChild from './components/AppChild.vue';
  const thisBadBoy = Vue.component('thisBadBoy', {
  template: "<div id="app">  <div class="unit" v-for="unit in manifest" :key="unit.item">    <app-child :item="unit.item" :url="unit.url"></app-child>  </div></div>",
  
 components: {
    AppChild,
  },
  data() {
    return {
      manifest: [
        {
          item: 'backpack',
          url:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/backpack.jpg',
        },
        {
          item: 'tshirt',
          url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/tshirt.jpg',
        },
        {
          item: 'sweatshirt',
          url:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/sweatshirt.jpg',
        },
      ],
    };
  },
})