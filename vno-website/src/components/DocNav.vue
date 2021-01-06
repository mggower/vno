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
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>