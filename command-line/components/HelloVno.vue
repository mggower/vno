<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <p>
    For a guide and preview of our osLabs repo<br>
    check out 
    <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.
  </p>
  <h3>Installed CLI Plugins</h3>
  <ul>
  <li><a href="https://github.com/jgrubb16/vnocli" target="_blank" rel="noopener">babel</a></li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'HelloVno',
  props: {
    msg: String
  },
}
</script>
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #79D0B2;
}
</style>