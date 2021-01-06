<template>
  <div id="docs">
    <h1>Getting Started</h1>
    <DocNav>
    </div>
    <!-- <div id="info-list">
    <ul>
      <li> {{facts}} </li>
    </ul>   
    </div>  -->
  </div>
</template>
<script>
export default {
  name: 'docs',
  components: [DocItem, DocNav],
  information: [{id: 'vnoinstall', bullet: 'Deno install vno', code: 'deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts', gif: 'https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif'}],
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    }
  },
  
};
</script>
<style></style>