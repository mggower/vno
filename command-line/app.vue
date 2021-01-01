<template>
  <div id="app">
    <a href="https://ibb.co/mHwdLSK"
      ><img
        src="https://i.ibb.co/4jGC6JL/image.png"
        alt="image"
        border="0"
        width="450"
        height="450"
    /></a>
    <childOne msg="You are building: Jordan's Test Project with vno" />
  </div>
</template>
<script>
import childone from './components/childone.vue';
export default {
  name: 'app',
  components: {
    childone,
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