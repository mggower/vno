<template>
<div id="app">
  <header class="header">
      <img class="logo" src='https://svgshare.com/i/SNz.svg' alt="logo" />
      <br>
    <nav class="inner">
      <button v-on:click="handelClick('green')">Mikey</button>
      <button v-on:click="handelClick('orange')">Jordan</button>
      <button v-on:click="handelClick('purple')">Kyle</button>
      <button v-on:click="handelClick('red')">Andrew</button>
      <a class="github" href="https://github.com/oslabs-beta/vno" target="_blank"
        ><button>Github</button>
      </a>
    </nav>
  </header>
  <body v-if="displayedComponent === 'red'">
    <Red/>
  </body>
  <body v-else-if="displayedComponent === 'green'">
    <Green />
  </body>
  <body v-else-if="displayedComponent === 'orange'">
    <Orange />
  </body>
  <body v-else-if="displayedComponent === 'purple'">
    <Purple />
  </body>
  <body v-else>
    <h1>Welcome to Your vno Project</h1>
    <p>
    For a guide on project customization,<br>
    check out out GitHub repo at: 
    <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.
  </p>
  <h3>Installed CLI Plugins</h3>
  <ul>
  <li><a href="https://github.com/jgrubb16/vnocli" target="_blank" rel="noopener">babel</a></li>
  </ul>
    </body>
</div>
</template>

<script>
import Red from './components/Red'
import Green from './components/Green'
import Orange from './components/Orange'
import Purple from './components/Purple'
export default {
name: 'app',
data() {
  return {
    displayedComponent : ''
  };
},
methods: {
  handelClick: function(event) {
    this.displayedComponent = event;
    console.log(this.displayedComponent)
  }
},
components: {
  Red,
  Green,
  Orange,
  Purple,
}
};
</script>

<style>
#app {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #34495e;
color: aliceblue;
padding-bottom: 10px;
padding-top: 20px;
align-content: space-around;
}
.logo{
padding: 20px;
}
.inner {
display: flex;
flex-direction: row;
justify-content: center;
}
button {
color: #34495e;
background-color: #57D3AF;
padding: 5px;
text-size-adjust: auto;
border-radius: 15px;
margin: 10px;
}
#green {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
#red {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
#orange {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
#purple {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
};
</style>