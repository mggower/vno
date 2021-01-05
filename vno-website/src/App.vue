<template>
  <div id="app">
    <header>
      <img src="/assets/git-logo.png" />
      <ul>
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
          picture: 'N/A',
          about: 'N/A',
          github: 'N/A',
          linkdIn: 'N/A',
        },
        {
          name: 'Jordan Grubb',
          email: 'ImJordanGrubb@gmail.com',
          picture: '/assets/Jordan.jpg',
          about: 'N/A',
          github: 'N/A',
          linkdIn: 'N/A',
        },
        {
          name: 'Kyle Jurassic',
          email: 'kjuresich@gmail.com',
          picture: 'N/A',
          about: 'N/A',
          github: 'N/A',
          linkdIn: 'N/A',
        },
        {
          name: 'Andrew Rehrig',
          email: 'arehrig@gmail.com',
          picture: 'N/A',
          about: 'N/A',
          github: 'N/A',
          linkdIn: 'N/A',
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
html {
  background-color: #203a42;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>