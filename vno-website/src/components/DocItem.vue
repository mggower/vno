<template>
  <div :id='element'>
    <li class="docItemContainer">
      <p>{{ bullet }}</p>
      <code
        v-if="code"
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

.docItemContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.codeblock {
  background-color: #1a1a1a;
  color: rgb(250, 231, 231);
  border: 1px solid #57d3af;
  box-shadow: 0px 0px 8px 1px #57d3af;
  display: block;
  padding: 1.75%;
  margin-bottom: 25px;
  width: fit-content;
}
.gif {
  width: 98%;
  max-width: fit-content;
}
p {
  max-width: 800px;
}
</style>