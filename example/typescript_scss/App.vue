<template>
  <div id="app">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />
    <Home :msg="message" />
  </div>
</template>

<script lang="ts">
import Home from "./components/Home.vue";

export default {
  name: "app",
  components: { Home },
  data(): { message: string } {
    const message: string = "you are building: Vue App with vno";

    return {
      message,
    };
  },
};
</script>

<style lang="scss">
$bg-color: #203a42;
$text-color: #79d0b2;

html {
  background-color: $bg-color;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  margin-top: 60px;
}
</style>