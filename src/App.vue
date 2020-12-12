<template>
  <div id="app">
    <green> </green>
    <orange> </orange>
    <h1> in the root </h1>
  </div>
</template>

<script>
import Green from './testComponents/Green.vue';
import Red from './testComponents/Red.vue';

export default {
  name: 'app',
  data() {
    return {
      color: 'none',
    }
  },
  components: {
    Green,
    Red
  }
}
</script>

<style>
body {
  background-color: pink;
}
</style>