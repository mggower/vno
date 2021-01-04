<template>
  <div id="app">
    <Navigation />
    <a href="https://ibb.co/mHwdLSK"
      ><img
        src="https://i.ibb.co/4jGC6JL/image.png"
        alt="image"
        border="0"
        width="450"
        height="450"
    /></a>
    <home msg="A vue / Deno Integration" />
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
  components: {
    Home,
    Navigation,
    Team,
    Docs,
    Demo,
  },
};
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