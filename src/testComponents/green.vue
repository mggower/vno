<template>
  <div id="green">
    <h1>greenie in a bottle baby</h1>
  </div>
</template>

<script>
import Orange from './testComponents/Orange.vue';

export default {
  data() {
    return {
      color: 'green',
    };
  },
  components: {
    Orange,
  },
};
</script>

<style>
body {
  background-color: chartreuse;
}
</style>
