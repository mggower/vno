<template>
<div id="purple">
  <h1>Kyle</h1>
  <a href="https://imgbb.com/"
    ><img src="https://i.ibb.co/6rxv4gC/kyle.png" alt="kyle" border="0"
  /></a>
  <p>Kyle (aka Grandpa Kyle) is here to party</p>
</div>
</template>

<script>
import LilOrange from './components/LilOrange';

export default {
name: 'purple',
data() {
  return {
    color: 'purple',
  };
},
components: {
  LilOrange,
}
};
</script>

<style>
#purple {
background-color: blueviolet;
}
</style>
