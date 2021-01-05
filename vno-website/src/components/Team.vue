<template>
  <div id="team">
    <div class="flip">
      <div class="outterFlip">
        <div class="hoverContainer">
          <img
            class="hoverImg"
            :src="picture"
            alt="image"
            border="0"
            width="450"
            height="450"
          />
        </div>
      </div>

      <div class="innerFlip">
        <h2>{{ name }}</h2>
        <h2>{{ email }}</h2>
        <h2>
          About: <br />
          {{ about }}
        </h2>
        <h2>{{ linkedIn }}</h2>
        <h2>{{ github }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['name', 'email', 'github', 'linkdIn', 'about', 'picture'],
  name: 'Team',
};
</script>
<style>
.hoverImg {
  border-radius: 50%;
  animation: mymove 5s infinite;
}

@keyframes mymove {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}
</style>