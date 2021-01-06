<template>
  <div class="home">
    <img id="vnoLogo" src="/assets/vnoLogo.png" />
    <h1>A Vue / Deno Adapter</h1>
    <br />
    <div class="logos">
      <a href="https://github.com/oslabs-beta/vno" target="_blank">
        <img id="gitLogo" src="/assets/git-logo.png"
      /></a>
      <a href="https://deno.land/x/vno@v1.0-beta.5" target="_blank">
        <img id="denoLogo" src="/assets/deno-logo.png"
      /></a>
    </div>
    <!-- <h3 id="cliText">CLI Plugin</h3>
    <a
      class="docTags"
      href="https://github.com/oslabs-beta/vno/tree/main/command-line"
      target="_blank"
      rel="noopener"
      >Click Here</a
    >

    <br /> -->
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
a:link {
  text-decoration: none;
}
.logos {
  display: flex;
  justify-content: center;
  padding: 24px;
}
.home h1 {
  padding-top: 16px;
}
#gitLogo {
  margin-right: 0.4rem;
}
#denoLogo {
  margin-left: 0.4rem;
}
#vnoLogo {
  max-width: 80%;
}
#logoText {
  justify-content: center;
}
#gitText {
  margin-right: 1.8rem;
  margin-left: 0.5rem;
}
#gitText:hover {
  color: #57d3af;
}
#denoText {
  margin-left: 0rem;
}
.docTags {
  color: white;
}
.docTags:hover {
  color: #57d3af;
}
</style>