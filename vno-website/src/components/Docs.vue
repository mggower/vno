<template>
  <div id="docs">
    <h1>Getting Started</h1>
    <DocNav 
      v-for="item in information"
      :key="'key' + item.element"
      :element="item.element"
    />
    <DocItem 
      v-for="item in information"
      :key="item.element"
      :element='item.element'
      :bullet='item.bullet'
      :code='item.code'
      :gif='item.gif'
    />
  </div>
</template>
<script>
import DocNav from './DocNav';
import DocItem from './DocItem';

export default {
  name: 'docs',
  components: {DocItem, DocNav},
  data () {
    return {
      information: [
        {
          element: 'install', 
          bullet: 'Deno install vno', 
          code: 'deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts', 
          gif: 'https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif'
        },
        {
          element: 'create',
          bullet: 'vno create',
          code: 'vno create [new project]',
          gif: 'https://i.ibb.co/Fw5Sp7n/vno-create.gif'
        },
        {
          element: 'build', 
          bullet: 'vno build', 
          code: 'vno build', 
          gif: 'https://cdn-images-1.medium.com/max/1600/1*-uhAIJMly9eTevEhgrulqw.gif'
        },
        {
          element: 'run dev', 
          bullet: 'vno run dev', 
          code: 'vno run dev', 
          gif: 'https://cdn-images-1.medium.com/max/1600/1*5vQGLXvmlzJacQpqFEJV-Q.gif'
        },
        {
          element: 'this bad boy',
          bullet: 'A very bad boy',
        },
      ]
    }
  },
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