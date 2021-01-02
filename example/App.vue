<template>
  <div id="app">
    <header class="header">
      <img
        class="logo"
        src="https://svgshare.com/i/SNz.svg"
        alt="logo"
        v-on:click="handelClick('')"
      />
      <nav class="inner">
        <button v-on:click="handelClick('')">Home</button>
        <button v-on:click="handelClick('deno')">Deno</button>
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
    <body v-if="displayedComponent === 'lighthouse'">
      <Lighthouse />
    </body>
    <body v-else-if="displayedComponent === 'travel'">
      <Travel />
    </body>
    <body v-else-if="displayedComponent === 'deno'">
      <Deno />
    </body>
    <body v-else>
      <h1>Welcome to Your vno Project</h1>
      <p>
        For a guide on project customization,<br />
        check out out GitHub repo at:
        <a
          href="https://github.com/oslabs-beta/vno"
          target="_blank"
          rel="noopener"
          >vno documentation</a
        >
      </p>
      <ul>
        <li>
          <a
            href="https://github.com/jgrubb16/vnocli"
            target="_blank"
            rel="noopener"
            >Open Source CLI Tool</a
          >
        </li>
      </ul>
      <LilOrange />
    </body>
  </div>
</template>

<script>
import Travel from './components/Travel';
import Lighthouse from './components/Lighthouse';
import Deno from './components/Deno';
import LilOrange from './components/LilOrange';
export default {
  name: 'app',
  data() {
    return {
      displayedComponent: '',
    };
  },
  methods: {
    handelClick: function (event) {
      this.displayedComponent = event;
      console.log(this.displayedComponent);
    },
  },
  components: {
    LilOrange,
    Deno,
    Travel,
    Lighthouse,
  },
};
</script>

<style>
body {
  background-color: #34495e;
}
.header {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #34495e;
  color: aliceblue;
  padding-bottom: 10px;
  padding-top: 20px;
  align-content: space-around;
}
.logo {
  padding: 20px;
}
.inner {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
button {
  color: #34495e;
  background-color: #57d3af;
  padding: 5px;
  text-size-adjust: auto;
  border-radius: 15px;
  margin: 10px;
}
#green {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#red {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#orange {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#purple {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
