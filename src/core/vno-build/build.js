// deno-lint-ignore-file
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
nullnull;
const App = new Vue({
  template: /* html */
    `
  <div id="app">
    <header class="header">
      <img
        class="logo"
        src="https://svgshare.com/i/SNz.svg"
        alt="logo"
        v-on:click="handelClick('home')"
      />
      <nav class="inner">
        <button v-on:click="handelClick('home')">Home</button>
        <button v-on:click="handelClick('vue')">About Vue</button>
        <button v-on:click="handelClick('deno')">About Deno</button>
        <button v-on:click="handelClick('travel')">Travel</button>
        <button v-on:click="handelClick('lighthouse')">Lighthouse</button>
        <a
          class="github"
          href="https://github.com/oslabs-beta/vno"
          target="_blank"
          ><button>Github</button>
        </a>
      </nav>
    </header>
    <body v-if="displayedComponent === 'home'">
      <Home />
    </body>
    <body v-else-if="displayedComponent === 'lighthouse'">
      <Lighthouse />
    </body>
    <body v-else-if="displayedComponent === 'travel'">
      <Travel />
    </body>
    <body v-else-if="displayedComponent === 'vue'">
      <VueJs />
    </body>
    <body v-else-if="displayedComponent === 'deno'">
      <Deno />
    </body>
    <body v-else>
      <h1>Welcome to Your vno Project</h1>
    </body>
  </div>
`,
  name: "app",
  data() {
    return { displayedComponent: "home" };
  },
  methods: {
    handelClick: function (event) {
      this.displayedComponent = event;
      console.log(this.displayedComponent);
    },
  },
  components: { Home, Travel },
});

App.$mount("#app");
