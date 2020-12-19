<template>
  <div id="orange">
    <h1>Jordan</h1>
    <a href="https://imgbb.com/"
      ><img src="https://i.ibb.co/m46njhp/jordan.png" alt="jordan" border="0"
    /></a>
    <p>Jordan has worked on Broadway! So, yes, he has much sass!</p>
  </div>
</template>

<script>
import LilOrange from './components/LilOrange';

export default {
  name: 'orange',
  data() {
    return {
      color: 'orange',
    };
  },
  components: {
    LilOrange,
  },
};
</script>

<style>
.orange {
  color: orange;
}
</style>
