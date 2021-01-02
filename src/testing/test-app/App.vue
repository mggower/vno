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

<style>
body {
  background-color: blue;
}
h1 {
  color: salmon;
}
</style>
