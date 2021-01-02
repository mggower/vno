<template>
  <div id="deno">
    <h1>Deno</h1>
    <a href="https://imgbb.com/"
      ><img src="https://i.ibb.co/b6jR0d1/deno-logo.png" alt="deno" border="0"
    /></a>
    <p>
      Deno is a runtime for JavaScript and TypeScript that is based on the V8
      JavaScript engine and the Rust programming language. It was created by
      Ryan Dahl, original creator of Node.js, and is focused on productivity. It
      was announced by Dahl in 2018 during his talk "10 Things I Regret About
      Node.js
    </p>
    <LilOrange />
  </div>
</template>

<script>
import LilOrange from './components/LilOrange';

export default {
  name: 'deno',
  data() {
    return {
      color: 'deno',
    };
  },
  components: { LilOrange },
};
</script>

<style>
#deno {
  background-color: white;
  color: black;
}
</style>
