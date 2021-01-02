<template>
<div id="app">
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<HelloVno msg="You are building: Your vno project with vno"/>
</div>
</template>
<script>
import 'HelloVno' from './components/HelloVno.vue'
export default {
  name: 'app',
  components: {
    HelloVno
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79D0B2;
  margin-top: 60px;
}
</style>