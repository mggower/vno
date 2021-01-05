<template>
  <div class="home">
    <img id="vnoLogo" src="/assets/vnoLogo.png" />
    <h1>A Vue / Deno Adapter</h1>
    <br />

    <img id="gitLogo" src="/assets/git-logo.png" />
    <a
      class="docTags"
      href="https://github.com/oslabs-beta/vno"
      target="_blank"
      rel="noopener"
      >&nbsp;Github docs</a
    >
    <img id="denoLogo" src="/assets/deno-logo.png" />
    <a
      class="docTags"
      href="https://deno.land/x/vno@v1.0-beta.5"
      target="_blank"
      rel="noopener"
      >Deno.land</a
    >
    <h3 id="cliText">Installed CLI Plugin</h3>
    <a
      class="docTags"
      href="https://github.com/oslabs-beta/vno/tree/main/command-line"
      target="_blank"
      rel="noopener"
      >Click Here</a
    >
    <!-- <h3>
      For github documentation:<br />

      <a
        class="docTags"
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener"
        >&nbsp;vno documentation</a
      >.
    </h3>
    <h3 id="cliText">Installed CLI Plugin</h3>
    <a
      class="docTags"
      href="https://github.com/oslabs-beta/vno/tree/main/command-line"
      target="_blank"
      rel="noopener"
      >Click Here</a
    >
<h3 id="cliText">Deno.land</h3>
    <a
      class="docTags"
      href="https://github.com/oslabs-beta/vno/tree/main/command-line"
      target="_blank"
      rel="noopener"
      >Click Here</a
    > -->
    <br />
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
#vnoLogo {
  max-width: 800px;
}
.docTags {
  color: white;
}
</style>