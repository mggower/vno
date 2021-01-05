<template>
  <div id="team">
    <div class="flip">
      <div class="flip-box-inner">
        <div class="flipFront">
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

      <div class="flipBack">
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
/* .flip {
  background-color: transparent;
} */
.hoverImg {
  background-color: transparent;
  perspective: 1000px;
  border-radius: 50%;
  animation: mymove 5s infinite;
}
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.hoverImg:hover .flip-box-inner {
  transform: rotateY(180deg);
}
.flipFront,
.flipBack {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
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