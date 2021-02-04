<template>
  <div id="app">
    <h1> HEY GIRL HEY </h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      displayedComponent: 'home',
    };
  }
};
</script>

<style>
body {
  background-color: #34495e;
}
.header {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
