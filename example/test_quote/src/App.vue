<template>
  <div id="app">
    <header>
      <ul class="nav">
        <a @click="handelClick('Home')"><li>Home</li></a>
        <a @click="handelClick('Team')"><li>Team</li></a>
        <a @click="handelClick('Docs')"><li>Docs</li></a>
      </ul>
    </header>

    <div v-if="displayedComponent === 'Home'">
      <Home />
    </div>
    <div class="teamTest" v-else-if="displayedComponent === 'Team'">
      <h1 id="meetTeam">Meet The Team</h1>
      <div class="teamWrapper">
        <Team
          v-for="person in team"
          :key="person.id"
          :name="person.name"
          :about="person.about"
          :picture="person.picture"
          :email="person.email"
          :github="person.github"
          :linkedIn="person.linkedIn"
        />
      </div>
      <div class="teamBottom">
        <div class="teamLowgos">
          <a href="https://github.com/oslabs-beta/vno" class="linkies"
            ><img id="gitLogo" class="logo" src="/assets/git-logo.png"
          /></a>
          <a href="https://deno.land/x/vno" class="linkies"
            ><img id="denoLogo" class="logo" src="/assets/deno-logo.png"
          /></a>
        </div>
      </div>
    </div>

    <div v-else-if="displayedComponent === 'Docs'">
      <Docs />
    </div>
    <div v-else-if="displayedComponent === 'Demo'">
      <Demo />
    </div>
  </div>
</template>

<script>
import home from './components/Home';
import team from './components/Team';
import docs from './components/Docs';

export default {
  name: 'app',
  data() {
    return {
      displayedComponent: 'Home',
      team: [
        {
          name: 'Mikey Gower',
          email: 'mailto:gowermikey@gmail.com',
          picture: '/assets/Mikey.jpg',
          about: 'Mikey loves wine. He also loves to party with said wine.',
          github: 'https://github.com/mggower',
          linkedIn: 'https://www.linkedin.com/in/mikeygower/',
        },
        {
          name: 'Jordan Grubb',
          email: 'mailto:ImJordanGrubb@gmail.com',
          picture: '/assets/Jordan.jpg',
          about: 'Her drag name is Miss Diagnosed. She loves whiskey.',
          github: 'https://github.com/jgrubb16',
          linkedIn: 'https://www.linkedin.com/in/j-grubb',
        },
        {
          name: 'Kyle Jurassic',
          email: 'mailto:kjuresich@gmail.com',
          picture: '/assets/Kyle.jpg',
          about: 'He made our ReadMe, and he can read you for filth.',
          github: 'http://github.com/kjurassic',
          linkedIn: 'http://linkedin.com/in/kyle-juresich/',
        },
        {
          name: 'Andrew Rehrig',
          email: 'mailto:arehrig@gmail.com',
          picture: '/assets/Andrew.jpg',
          about:
            "She's beauty. She's grace. She loves a coding test. She can win any sewing challenge.",
          github: 'https://github.com/andrew-rehrig',
          linkedIn: 'https://www.linkedin.com/in/andrew-rehrig/',
        },
      ],
    };
  },
  methods: {
    handelClick: function (event) {
      this.displayedComponent = event;
      console.log(this.displayedComponent);
    },
  },
  components: {
    Home,
    Team,
    Docs,
  },
};
</script>

<style>
@import url('https://db.onlinewebfonts.com/c/6d253426005e3fdcd9f69455050bd7d7?family=Chalet-NewYorkNineteenSixty');
html {
  scroll-behavior: smooth;
}
body {
  background-color: #203a42;
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.teamWrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}

#meetTeam {
  font-size: 9vw;
}

.nav {
  box-shadow: 0px 0px 10px 0px #132429;
  padding: 20px 6vw;
  margin: 0;
  background-color: #1a3037;
  list-style-type: none;
  display: flex;
  color: white;
  justify-content: space-between;
}
.nav li {
  color: white;
  cursor: pointer;
  padding: 5px;
}
.nav a {
  font-size: 2rem;
  font-weight: bold;
  font-family: Chalet-NewYorkNineteenSixty, Avenir, Helvetica, Arial, sans-serif;
}
.nav a:active {
  text-decoration: none;
}
.nav li:hover {
  color: #57d3af;
  text-decoration: none;
}
#app {
  height: fit-content;
  display: flex;
  flex-direction: column;
  font-family: Chalet-NewYorkNineteenSixty, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin: 0;
}

#denoLogo {
  width: 3.1rem;
  height: 3rem;
}
#gitLogo {
  width: 3rem;
  height: 3rem;
}
#built {
  font-size: 16px;
  font-style: italic;
  margin-top: 10px;
  position: fixed;
  left: 15px;
  bottom: 15px;
  z-index: -5;
}

.teamLowgos {
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #15131342;
  bottom: 0;
  padding: 10px 0 6px;
}
</style>
