<template>
<div id="hey">
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<Love msg="You are building: Bruh with vno"/>
</div>
</template>
<script>
import 'Love' from './components/Love.vue'
export default {
  name: 'hey',
  components: {
    Love
  }
}
</script>
<style>
#hey {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79D0B2;
  margin-top: 60px;
}
</style>