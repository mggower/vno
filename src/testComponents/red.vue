<template>
  <div id="red">
    <h1>I got a pocket full of sunshine</h1>
  </div>
</template>

<script>
import Orange from './testComponents/Orange.vue';
import Purple from './testComponents/Purple.vue';

export default {
  name: 'red',
  data() {
    return {
      color: 'red',
    };
  },
  components: {
    Orange,
    Purple,
  },
};
</script>

<style>
body {
  background-color: pink;
}
</style>
