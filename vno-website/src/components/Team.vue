<template>
  <div class="team">
    <div class="flip-box">
      <div class="flip-box-inner">
        <div class="flip-box-front">
          <img
            class="hoverImg"
            :src="picture"
            alt="image"
            border="0"
            width="450"
            height="450"
          />
        </div>

        <div class="flip-box-back">
          <h2>{{ name }}</h2>
          <h2>{{ email }}</h2>

          <h2>{{ linkedIn }}</h2>
          <h2>{{ github }}</h2>
        </div>
      </div>
    </div>
    <h2 id="about">
      About: <br />
      {{ about }}
    </h2>
  </div>
</template>
<script>
export default {
  props: ['name', 'email', 'github', 'linkdIn', 'about', 'picture'],
  name: 'Team',
};
</script>
<style>
.flip-box {
  flex-direction: row;
  background-color: transparent;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  border-radius: 50%;
}
.hoverImg {
  background-color: transparent;
  border-radius: 50%;
  animation: mymove 5s infinite;
}

.flip-box-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}
.flip-box-front {
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 80%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.flip-box-back {
  margin-top: 14rem;
  flex-direction: column;
  position: absolute;
  width: 31rem;
  height: 8rem;
  margin-right: 20rem;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 50%;
  background-color: #30322f;
  color: #57d3af;
  transform: rotateY(180deg);
}
#meetTeam {
  font-size: 6rem;
}
h2 {
  margin-top: 0.2rem;
}
#about {
  position: absolute;
  margin-bottom: 2rem;
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
.team {
  display: flex;
  flex: 0 50%;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
</style>