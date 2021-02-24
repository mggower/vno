<template>
  <a :href="link" class="docnav-element">{{ element }}</a>
</template>

<script>
export default {
  name: 'doc-item',
  props: ['element', 'methods', 'link'],
};
</script>

<style>
.docnav-element {
  margin: 5px;
  padding: 8px;
}
.docnav-element:hover {
  color: #57d3af;
}
</style>