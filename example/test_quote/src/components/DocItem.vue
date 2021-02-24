<template>
  <div :id="element">
    <li class="docItemContainer">
      <code v-if="code" class="codeblock"> {{ code }}</code>
      <div class="desc">
        <p>{{ bullet }}</p>
      </div>
      <img v-if="gif" class="gif" :src="gif" :alt="element" />
    </li>
  </div>
</template>

<script>
export default {
  name: 'doc-item',
  props: ['element', 'bullet', 'code', 'gif'],
};
</script>

<style>
.docItemContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10% 0;
}
.codeblock {
  background-color: #1a1a1a;
  color: rgb(250, 231, 231);
  padding-top: 25px;
  display: block;
  text-align: left;
  padding: 1.75%;
  margin-bottom: 25px;
  margin-top: 55px;
  min-height: fit-content;
  width: 25vw;
  min-width: 300px;
  max-width: 500px;
  animation: glowing 3000ms infinite;
}
@keyframes glowing {
  0% {
    background-color: #1a1a1a;
    box-shadow: 0 0 5px #79d0b2;
  }
  50% {
    background-color: #1a1a1a;
    box-shadow: 0 0 20px #79d0b2;
  }
  100% {
    background-color: #1a1a1a;
    box-shadow: 0 0 5px #79d0b2;
  }
}

.gif {
  width: 98%;
  max-width: fit-content;
}
.desc {
  width: 40vw;
  min-height: fit-content;
  min-width: 250px;
  max-width: 500px;
  text-align: justify;
  margin: 25px;
  line-height: 1.3;
}
.desc p {
  letter-spacing: 1.1;
}
</style>
