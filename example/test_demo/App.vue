<template>
  <div id="app">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />
    <HelloVno msg="you are building: your project with vno" />
  </div>
</template>

<script>
import HelloVno from './components/HelloVno.vue';

export default {
  name: 'app',
  components: {HelloVno},
};

</script>

<style>
html {
  background-color: #203A42;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>