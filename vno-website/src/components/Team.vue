<template>
  <div class="flip-box">
    <div class="flip-box-inner">
      <img
        class="flip-box-front"
        :src="picture"
        alt="image"
        border="0"
        width="250"
        height="250"
      />
      <!--  -->
      <div class="flip-box-back">
        <h2>{{ name }}</h2>
        <div class="links">
          <a class="email" :href="email"
            ><i class="fas fa-envelope fa-3x"></i
          ></a>
          <a :href="github" target="_blank">
            <i class="fab fa-github fa-3x"></i
          ></a>
          <a :href="linkedIn" target="_blank">
            <i class="fab fa-linkedin-in fa-3x"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['name', 'email', 'github', 'linkedIn', 'about', 'picture'],
  name: 'Team',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap');

a {
  color: #ffffff;
}

.links {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
}

.flip-box {
  background-color: transparent;
  width: 100%;
  margin: 16px;
  padding: 16px;
  height: 300px;
  width: 300px;
  perspective: 1000px;
}

.flip-box-inner {
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
.flip-box-front,
.flip-box-back {
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-box-back {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  box-shadow: -5px 5px 20px 3px #57d3b082;
  color: white;
  transform: rotateY(180deg);
}

.flip-box-front {
  background-color: transparent;
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
#meetTeam {
  font-size: 6rem;
  text-align: left;
  margin-left: 20px;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 200;
}
</style>