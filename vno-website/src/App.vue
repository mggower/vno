<template>
  <div id="app">
    <header>
      <ul class="nav">
        <a @click="handelClick('Home')"><li>Home</li></a>
        <a @click="handelClick('Team')"><li>Team</li></a>
        <a @click="handelClick('Demo')"><li>Demo</li></a>
        <a @click="handelClick('Docs')"><li>Docs</li></a>
      </ul>
    </header>

    <body v-if="displayedComponent === 'Home'">
      <Home />
    </body>
    <body v-else-if="displayedComponent === 'Team'">
      <Team
        v-for="person in team"
        :key="person.id"
        :name="person.name"
        :about="person.about"
        :picture="person.picture"
        :email="person.email"
        :github="person.github"
        :linkdIn="person.linkdIn"
      />
    </body>
    <body v-else-if="displayedComponent === 'Docs'">
      <Docs />
    </body>
    <body v-else-if="displayedComponent === 'Demo'">
      <Demo />
    </body>
  </div>
</template>

<script>
import home from './components/Home';
import team from './components/Team';
import docs from './components/Docs';
import demo from './components/Demo';

export default {
  name: 'app',
  data() {
    return {
      displayedComponent: 'Home',
      team: [
        {
          name: 'Michael Gower',
          email: 'gowermikey@gmail.com',
          picture: '/assets/Mikey.jpg',
          about: 'N/A',
          github: 'https://github.com/mggower',
          linkdIn: 'https://www.linkedin.com/in/mikeygower/',
        },
        {
          name: 'Jordan Grubb',
          email: 'ImJordanGrubb@gmail.com',
          picture: '/assets/Jordan.jpg',
          about: 'N/A',
          github: 'https://github.com/jgrubb16',
          linkdIn: 'https://www.linkedin.com/in/j-grubb',
        },
        {
          name: 'Kyle Jurassic',
          email: 'kjuresich@gmail.com',
          picture: '/assets/Kyle.jpg',
          about: 'N/A',
          github: 'http://github.com/kjurassic',
          linkdIn: 'http://linkedin.com/in/kyle-juresich/',
        },
        {
          name: 'Andrew Rehrig',
          email: 'arehrig@gmail.com',
          picture: '/assets/Andrew.jpg',
          about: 'N/A',
          github: 'https://github.com/andrew-rehrig',
          linkdIn: 'https://www.linkedin.com/in/andrew-rehrig/',
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
    Demo,
  },
};
</script>

<style>
@import url('https://db.onlinewebfonts.com/c/6d253426005e3fdcd9f69455050bd7d7?family=Chalet-NewYorkNineteenSixty');
html {
  background-color: #203a42;
}
.nav {
  list-style-type: none;
  display: flex;
  color: white;
  justify-content: space-around;
  margin-bottom: 5.5rem;
}
.nav li {
  color: white;
  cursor: pointer;
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
  display: flex;
  flex-direction: column;
  font-family: Chalet-NewYorkNineteenSixty, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
#denoLogo {
  width: 3rem;
  height: 3rem;
}
#gitLogo {
  width: 3rem;
  height: 3rem;
}
</style>