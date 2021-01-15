<template>
  <div class="hello">
    <h1 @click="Alert">{{ msg }}</h1>
    <p>
      <br />
    </p>
    <h3>
      <a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> &
      <a
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener"
      >
        github
      </a>
    </h3>
    <ul>
      <br />
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "home",
  props: {
    msg: String,
  },
  methods: {
    Alert(): void {
      alert("Hi!!!");
    },
  },
};
</script>

<style lang='scss'>
h3 {
  margin: 40px 0 0;
  a {
    color: pink;
  }
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