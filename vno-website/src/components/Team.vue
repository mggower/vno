<template>
  <div id="team">
    <img :src="picture" alt="image" border="0" width="450" height="450" />
    <h2>{{ name }}</h2>
    <h2>{{ email }}</h2>
    <h2>
      About: <br />
      {{ about }}
    </h2>
    <h2>{{ linkedIn }}</h2>
    <h2>{{ github }}</h2>
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