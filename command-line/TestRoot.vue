<template>
<div id="testroot">
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<TestChild msg='You are building: Test Project with vno'/>
</div>
</template>
<script>
import TestChild from './components/TestChild.vue'
export default {
  name: 'testroot',
  components: {
    TestChild
  }
}
</script>
<style>
#testroot {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79D0B2;
  margin-top: 60px;
}
</style>