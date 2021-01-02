<template>
  <div id="test">
    {{result}}
  </div>
</template>

<script>
import AppPlace from './components/AppPlace.vue';

export default {
  test: 'testing',
  name: 'test',
  components: { ChildTest },
  data() {
    return {
      result: "this is a test"
    };
  },
};
</script>

<style scoped>
body {
  background-color: blue;
}
</style>
