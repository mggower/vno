<template>
  <div class="section">
    <Heading />
    <Piano />
    <Links />
  </div>
</template>

<script>
import Heading from './pianoComps/Heading';
import Piano from './pianoComps/Piano';
import Links from './pianoComps/Links';
export default {
  name: 'Music',
  components: { Heading, Piano, Links },
  methods: {},
};
</script>

<style>
.section {
  min-height: 100vh !important;
  background-color: #e3f6f5;
}
</style>
