<template>
  <div class="flip-box">
    <div class="flip-box-inner">
      <div class="flip-box-front">
        <img :src="picture" alt="image" border="0" width="250" height="250" />
      </div>
      <!--  -->
      <div class="flip-box-back">
        <div class="bio">
          <h2>{{ name }}</h2>
        </div>
        <div class="bio">
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

.bio {
  width: 100%;
  height: 20%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}
.bio a {
  padding: 8px;
}

.flip-box {
  background-color: transparent;
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
.flip-box-front img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.flip-box-back {
  display: flex;
  flex-flow: column;
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
    transform: translatey(20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}
#meetTeam {
  display: inline-block;
  text-align: center;
  font-size: 6rem;
}

h2 {
  font-family: Chalet-NewYorkNineteenSixty, 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 24px;
}
</style>