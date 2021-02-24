/* eslint-disable */
/* eslint-disable prettier/prettier */
// deno-lint-ignore-file
import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js";

const DocItem = {
  template: /* html */ `
  <div :id="element">
    <li class="docItemContainer">
      <code v-if="code" class="codeblock"> {{ code }}</code>
      <div class="desc">
        <p>{{ bullet }}</p>
      </div>
      <img v-if="gif" class="gif" :src="gif" :alt="element" />
    </li>
  </div>
`,
  name: "doc-item",
  props: ["element", "bullet", "code", "gif"],
};

const DocNav = {
  template: /* html */ `
  <a :href="link" class="docnav-element">{{ element }}</a>
`,
  name: "doc-item",
  props: ["element", "methods", "link"],
};

const Home = {
  template: /* html */ `
  <div class="home">
    <a href="https://github.com/oslabs-beta/vno">
      <img id="vnoLogo" src="/assets/vnoLogo.png" />
    </a>
    <h1>A Vue / Deno Adapter</h1>
    <br />
    <div class="logos">
      <a href="https://github.com/oslabs-beta/vno" target="_blank">
        <img id="gitLogo" src="/assets/git-logo.png"
      /></a>
      <a href="https://deno.land/x/vno@v1.0-beta.5" target="_blank">
        <img id="denoLogo" src="/assets/deno-logo.png"
      /></a>
    </div>
  </div>
`,
  name: "Home",

  props: {
    msg: String,
  },
};

const Team = {
  template: /* html */ `
  <div class="flip-box">
    <div class="flip-box-inner">
      <div class="flip-box-front">
        <img :src="picture" alt="image" border="0" width="250" height="250" />
      </div>
      
      <div class="flip-box-back">
        <div class="bio">
          <h2>{{ name }}</h2>
        </div>
        <div class="bio">
          <a class="email" :href="email"
            ><i class="fas fa-envelope fa-3x"></i
          ></a>
          <a :href="github" target="_blank">
            <i class="fab fa-github fa-3x"></i
          ></a>
          <a :href="linkedIn" target="_blank">
            <i class="fab fa-linkedin-in fa-3x"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
`,
  props: ["name", "email", "github", "linkedIn", "about", "picture"],
  name: "Team",
};

const Docs = {
  template: /* html */ `
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
`,
  name: "docs",
  components: { DocItem, DocNav },
  data() {
    return {
      top: "",
      methods: {
        scrollMeTo(refName) {
          var element = this.$refs[refName];
          this.top = element.offsetTop;

          window.scrollTo(0, top);
        },
      },
      information: [
        {
          element: "install",
          bullet:
            `In order to run vno locally from your machine, you'll need to name and install the executable.`,
          code:
            "deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts",
          gif: "https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif",
        },
        {
          element: "create",
          bullet:
            `You can now utilize vno create in your terminal to instantiate a new Vue/Deno project using vno.`,
          code: "vno create [new project]",
          gif: "https://i.ibb.co/Fw5Sp7n/vno-create.gif",
        },
        {
          element: "build",
          bullet:
            `After successfully intalling and running create, you can use the vno build to initialize the parsing of your components. *this method can be utilized without using the create method described above so long as you provide a vno.config.json file containing {root: 'Name', path: 'relative path'}.`,
          code: "vno build",
          gif:
            "https://cdn-images-1.medium.com/max/1600/1*-uhAIJMly9eTevEhgrulqw.gif",
        },
        {
          element: "run dev",
          bullet:
            `To faciliate development, we have provided access to a dummy server/re-build process that will bypass the need for manual rebuild every time a change has occured during development. You will simply need to call vno run dev to spin up the server with a connection to your root component. If you would like to utilize this functionality but have bypassed the create method, you will need to add an "options": {"port": 3000} to your vno.config.json file.`,
          code: "vno run dev",
          gif:
            "https://cdn-images-1.medium.com/max/1600/1*5vQGLXvmlzJacQpqFEJV-Q.gif",
        },
        {
          element: "external dependencies",
          bullet:
            `If you would prefer to not install vno locally to your machine, you can import the module from deno.land into your project.`,
          code: `import vno from http://deno.land/x/vno/dist/mod.ts`,
        },
        {
          element: "config",
          bullet: `Simply call the config method inside your server.`,
          code: `vno.config({root:'App', entry:'./path'})`,
        },
      ],
    };
  },
};

const App = {
  template: /* html */ `
  <div id="app">
    <header>
      <ul class="nav">
        <a @click="handelClick('Home')"><li>Home</li></a>
        <a @click="handelClick('Team')"><li>Team</li></a>
        <a @click="handelClick('Docs')"><li>Docs</li></a>
      </ul>
    </header>

    <div v-if="displayedComponent === 'Home'">
      <Home />
    </div>
    <div class="teamTest" v-else-if="displayedComponent === 'Team'">
      <h1 id="meetTeam">Meet The Team</h1>
      <div class="teamWrapper">
        <Team
          v-for="person in team"
          :key="person.id"
          :name="person.name"
          :about="person.about"
          :picture="person.picture"
          :email="person.email"
          :github="person.github"
          :linkedIn="person.linkedIn"
        />
      </div>
      <div class="teamBottom">
        <div class="teamLowgos">
          <a href="https://github.com/oslabs-beta/vno" class="linkies"
            ><img id="gitLogo" class="logo" src="/assets/git-logo.png"
          /></a>
          <a href="https://deno.land/x/vno" class="linkies"
            ><img id="denoLogo" class="logo" src="/assets/deno-logo.png"
          /></a>
        </div>
      </div>
    </div>

    <div v-else-if="displayedComponent === 'Docs'">
      <Docs />
    </div>
    <div v-else-if="displayedComponent === 'Demo'">
      <Demo />
    </div>
  </div>
`,
  name: "app",
  data() {
    return {
      displayedComponent: "Home",
      team: [
        {
          name: "Mikey Gower",
          email: "mailto:gowermikey@gmail.com",
          picture: "/assets/Mikey.jpg",
          about: "Mikey loves wine. He also loves to party with said wine.",
          github: "https://github.com/mggower",
          linkedIn: "https://www.linkedin.com/in/mikeygower/",
        },
        {
          name: "Jordan Grubb",
          email: "mailto:ImJordanGrubb@gmail.com",
          picture: "/assets/Jordan.jpg",
          about: "Her drag name is Miss Diagnosed. She loves whiskey.",
          github: "https://github.com/jgrubb16",
          linkedIn: "https://www.linkedin.com/in/j-grubb",
        },
        {
          name: "Kyle Jurassic",
          email: "mailto:kjuresich@gmail.com",
          picture: "/assets/Kyle.jpg",
          about: "He made our ReadMe, and he can read you for filth.",
          github: "http://github.com/kjurassic",
          linkedIn: "http://linkedin.com/in/kyle-juresich/",
        },
        {
          name: "Andrew Rehrig",
          email: "mailto:arehrig@gmail.com",
          picture: "/assets/Andrew.jpg",
          about:
            "She's beauty. She's grace. She loves a coding test. She can win any sewing challenge.",
          github: "https://github.com/andrew-rehrig",
          linkedIn: "https://www.linkedin.com/in/andrew-rehrig/",
        },
      ],
    };
  },
  methods: {
    handelClick: function (event) {
      this.displayedComponent = event;
      console.log(this.displayedComponent);
    },
  },
  components: {
    Home,
    Team,
    Docs,
  },
};

const vno293108 = Vue.createApp(App);
vno293108.component("docs", Docs);
vno293108.component("doc-item", DocNav);
vno293108.component("doc-item", DocItem);
vno293108.component("Team", Team);
vno293108.component("Home", Home);

vno293108.mount("#app");
