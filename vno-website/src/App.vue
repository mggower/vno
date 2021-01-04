<template>
  <div id="app">
    <header>
      <ul>
        <li @click="handelClick('Home')">Home</li>
        <li @click="handelClick('Team')">Team</li>
        <li @click="handelClick('Demo')">Demo</li>
        <li @click="handelClick('Docs')">Docs</li>
      </ul>
    </header>
    <a href="https://ibb.co/mHwdLSK"
      ><img
        src="https://i.ibb.co/4jGC6JL/image.png"
        alt="image"
        border="0"
        width="450"
        height="450"
    /></a>
    <home msg="A vue / Deno Integration" />

    <body v-if="displayedComponent === 'Home'">
      <Home />
    </body>
    <body v-if="displayedComponent === 'Team'">
      <Team />
    </body>
    <body v-else-if="displayedComponent === 'Docs'">
      <Docs />
    </body>
    <body v-else-if="displayedComponent === 'Demo'">
      <Demo />
    </body>
    <!-- <body v-else>
    <h1>Welcome to vno</h1>
  </body> -->
  </div>
</template>

<script>
import home from './components/Home';
import navigation from './components/Navigation';
import team from './components/Team';
import docs from './components/Docs';
import demo from './components/Demo';

export default {
  name: 'app',
  data() {
    return {
      displayedComponent: '',
    }
  }
  components: {
    Home,
    Navigation,
    Team,
    Docs,
    Demo,
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>