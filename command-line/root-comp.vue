<template>
<div id="rootcomp">
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<childCompOne msg='You are building: Jordan's Test Project! with vno'/>
</div>
</template>
<script>
import childCompOne from './components/childCompOne.vue'
export default {
  name: 'rootcomp',
  components: {
    childCompOne
  }
}
</script>
<style>
#rootcomp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79D0B2;
  margin-top: 60px;
}
</style>