<template>
  <div id="docs">
    <nav id="doc-nav">
      <DocNav methods: methods v-for="item in information" :key="'key' +
      item.element" :element="item.element" :href="'#' + item.element" />
    </nav>
    <h1 class="pad">Getting Started</h1>
    <DocItem
      v-for="item in information"
      :key="item.element"
      :element="item.element"
      :bullet="item.bullet"
      :code="item.code"
      :gif="item.gif"
    />
    <div class="moreinfo">
      <div class="lowgos">
        <a href="https://github.com/oslabs-beta/vno" class="linkies"
          ><img id="gitLogo" class="logo" src="/assets/git-logo.png"
        /></a>
        <a href="https://deno.land/x/vno" class="linkies"
          ><img id="denoLogo" class="logo" src="/assets/deno-logo.png"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
import DocNav from './DocNav';
import DocItem from './DocItem';

export default {
  name: 'docs',
  components: { DocItem, DocNav },
  data() {
    return {
      top: '',
      methods: {
        scrollMeTo(refName) {
          var element = this.$refs[refName];
          this.top = element.offsetTop;

          window.scrollTo(0, top);
        },
      },
      information: [
        {
          element: 'install',
          bullet: `In order to run vno locally from your machine, you'll need to name and install the executable.`,
          code:
            'deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts',
          gif: 'https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif',
        },
        {
          element: 'create',
          bullet: `You can now utilize vno create in your terminal to instantiate a new Vue/Deno project using vno.`,
          code: 'vno create [new project]',
          gif: 'https://i.ibb.co/Fw5Sp7n/vno-create.gif',
        },
        {
          element: 'build',
          bullet: `After successfully intalling and running create, you can use the vno build to initialize the parsing of your components. *this method can be utilized without using the create method described above so long as you provide a vno.config.json file containing {root: 'Name', path: 'relative path'}.`,
          code: 'vno build',
          gif:
            'https://cdn-images-1.medium.com/max/1600/1*-uhAIJMly9eTevEhgrulqw.gif',
        },
        {
          element: 'run dev',
          bullet: `To faciliate development, we have provided access to a dummy server/re-build process that will bypass the need for manual rebuild every time a change has occured during development. You will simply need to call vno run dev to spin up the server with a connection to your root component. If you would like to utilize this functionality but have bypassed the create method, you will need to add an "options": {"port": 3000} to your vno.config.json file.`,
          code: 'vno run dev',
          gif:
            'https://cdn-images-1.medium.com/max/1600/1*5vQGLXvmlzJacQpqFEJV-Q.gif',
        },
        {
          element: 'external dependencies',
          bullet: `If you would prefer to not install vno locally to your machine, you can import the module from deno.land into your project.`,
          code: `import vno from http://deno.land/x/vno/dist/mod.ts`,
        },
        {
          element: 'config',
          bullet: `Simply call the config method inside your server.`,
          code: `vno.config({root:'App', entry:'./path'})`,
        },
      ],
    };
  },
};
</script>
<style>
.docs {
  padding: 25px;
}

h1.pad {
  font-size: 8vh;
  letter-spacing: 2px;
}
#doc-nav {
  margin-bottom: 40px;
  padding: 0 6vw;
  position: sticky;
  top: 0;
  background: #15131342;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.moreinfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #15131342;
  bottom: 0;
  padding: 10px 0 6px;
}

.linkies:hover {
  color: #57d3af;
}

#denoLogo {
  width: 3.1rem;
  height: 3rem;
}
#gitLogo {
  width: 3rem;
  height: 3rem;
}
</style>