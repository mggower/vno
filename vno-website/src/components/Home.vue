<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <p>
      For github documentation:<br />

      <a
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener"
        >&nbsp;vno documentation</a
      >.
    </p>
    <h3>Installed CLI Plugin</h3>
    <ul>
      <li>
        <a
          href="https://github.com/oslabs-beta/vno/tree/main/command-line"
          target="_blank"
          rel="noopener"
          >Click Here</a
        >
      </li>
      <br />
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Home',
  props: {
    msg: String,
  },
};
</script>
<style>
</style>