<template>
  <div :id='element'>
    <li>
      <p>{{ bullet }}</p>
      <code
        class="codeblock"
      >
      {{code}}</code>
      <img 
      v-if="gif"
      class='gif'
      :src="gif"
      :alt="element" 
      />

    </li>
  </div>
</template>

<script>
export default {
  name: 'doc-item',
  props: ['element', 'bullet', 'code', 'gif'],  
}
</script>

<style>
.codeblock {
  background-color: #1a1a1a;
  color: rgb(250, 231, 231);
  border: 1px solid rgb(250, 231, 231);
  display: block;
  padding: 1.75%;
  margin-bottom: 25px;
  width: fit-content;
}
</style>