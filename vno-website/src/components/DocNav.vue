<template>
      <a class='docnav-element' @click="scrollMeTo('element')">{{element}}</a>
</template>

<script>
export default {
  name: 'doc-item',
  props: ['element', 'methods'],  
}
</script>

<style>
.docnav-element {
  margin: 5px;
}
</style>