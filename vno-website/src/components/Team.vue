<template>
  <div id="team">
    <h2>{{ name }}</h2>
    <h2>{{ email }}</h2>
    <img :src="picture" alt="image" border="0" width="450" height="450" />
  </div>
</template>
<script>
export default {
  props: ['name', 'email', 'github', 'linkdIn', 'about', 'picture'],
  name: 'Team',
};
</script>
<style>
</style>