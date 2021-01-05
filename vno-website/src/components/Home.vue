<template>
  <div class="home">
    <img id="vnoLogo" src="/assets/vnoLogo.png" />
    <h1>A Vue / Deno Adapter</h1>
    <h3>
      For github documentation:<br />

      <a
        class="docTags"
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener"
        >&nbsp;vno documentation</a
      >.
    </h3>
    <h3>Installed CLI Plugin</h3>
    <ul>
      <li>
        <a
          class="docTags"
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
@import url('https://db.onlinewebfonts.com/c/6d253426005e3fdcd9f69455050bd7d7?family=Chalet-NewYorkNineteenSixty');

#vnoLogo {
  max-width: 800px;
}
.docTags {
  color: white;
}
</style>