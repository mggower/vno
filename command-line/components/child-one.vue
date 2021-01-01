<template>
  <div class="hello">
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
          >babel</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'child-one',
  props: {
    msg: String,
  },
};
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
  color: #79d0b2;
}
</style>