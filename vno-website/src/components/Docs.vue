<template>
  <div id="docs">
    <h1>Getting Started</h1>
    <nav id='doc-nav'>
    <DocNav 
      methods: methods
      v-for="item in information"
      :key="'key' + item.element"
      :element="item.element"
    />
    </nav>
    <DocItem 
      v-for="item in information"
      :key="item.element"
      :element='item.element'
      :bullet='item.bullet'
      :code='item.code'
      :gif='item.gif'
    />
    <div id="moreinfo">
      <p></p>
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
      top: '',
      methods: {
        scrollMeTo(refName) {
          var element = this.$refs[refName];
          this.top = element.offsetTop;

          window.scrollTo(0, top);
        }
      },
      information: [
        {
          element: 'install', 
          bullet: `In order to run vno locally from your machine, you'll need to name and install the executable.`, 
          code: 'deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts', 
          gif: 'https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif'
        },
        {
          element: 'create',
          bullet: `You can now utilize vno create in your terminal to instantiate a new Vue/Deno project using vno.`,
          code: 'vno create [new project]',
          gif: 'https://i.ibb.co/Fw5Sp7n/vno-create.gif'
        },
        {
          element: 'build', 
          bullet: `After successfully intalling and running create, you can use the vno build to initialize the parsing of your components. *this method can be utilized without using the create method described above so long as you provide a vno.config.json file containing {root: 'Name', path: 'relative path'}.`, 
          code: 'vno build', 
          gif: 'https://cdn-images-1.medium.com/max/1600/1*-uhAIJMly9eTevEhgrulqw.gif'
        },
        {
          element: 'run dev', 
          bullet: `To faciliate development, we have provided access to a dummy server/re-build process that will bypass the need for manual rebuild every time a change has occured during development. You will simply need to call vno run dev to spin up the server with a connection to your root component. If you would like to utilize this functionality but have bypassed the create method, you will need to add an "options": {"port": 3000} to your vno.config.json file.`, 
          code: 'vno run dev', 
          gif: 'https://cdn-images-1.medium.com/max/1600/1*5vQGLXvmlzJacQpqFEJV-Q.gif'
        },
        {
          element: 'external dependency', 
          bullet: `If you would prefer to not install vno locally to your machine, you can import the module from deno.land into your project.`, 
          code: `import vno from http://deno.land/x/vno/dist/mod.ts`, 
        },
        {
          element: 'config', 
          bullet: `Simply call the config method inside your server.`, 
          code: `vno.config({ root: 'App', entry: './relative/path' })`, 
        },
      ]
    }
  },
};
</script>
<style>
#doc-nav {
  background: #1a1a1a;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
</style>