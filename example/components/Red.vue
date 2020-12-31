<template>
<div id="red">
  <h1>Andrew</h1>
  <a href="https://imgbb.com/"
    ><img src="https://i.ibb.co/cxPPLvy/andrew.png" alt="andrew" border="0"
  /></a>
  <p>
    Andrew is a classically trained flutist. He's a boss ass bitch who don't
    &nbsp; take no shit
  </p>
</div>
</template>

<script>
import LilOrange from './components/LilOrange';

export default {
name: 'red',
data() {
  return {
    color: 'red',
  };
},
components: {
  LilOrange,
}
};
</script>

<style>
#red {
background-color: red;
}
</style>