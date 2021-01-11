import { terminalOptions } from "../lib/types.ts";
import { _ } from "../lib/deps.ts";

// template literal strings for HTML/Components/Server/Deps
const childComponent = (childName: string) => {
  return (
`<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <br />
    </p>
    <h3>
      <a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> &
      <a
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener">
        github
      </a>
    </h3>
    <ul>
      <br />
    </ul>
  </div>
</template>

<script>
export default {
  name: '${_.kebabCase(childName)}',
  props: {
    msg: String,
  },
};
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
  a {
  color: #79d0b2;
}
</style>`);
};

const rootComponent = (userOptions: terminalOptions) => {
  return (
`<template>
  <div id="${userOptions.root.toLowerCase()}">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />
    <${userOptions.child} msg="you are building: ${userOptions.title} with vno" />
  </div>
</template>

<script>
import ${userOptions.child} from './components/${userOptions.child}.vue';

export default {
  name: '${_.kebabCase(userOptions.root)}',
  components: {${userOptions.child}},
}
</script>

<style>
html {
  background-color: #203A42;
}
#${userOptions.root.toLowerCase()} {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>`);
};

const genericComponent = () => {
  return `
<template>

</template>

<script>
  export default {
    name:
  };
</script>

<style>

</style>`;
};

const htmlTemplate = (userOptions: terminalOptions) => {
  return (
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script defer src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <link rel="stylesheet" href="./style.css" />
    <title>${userOptions.title}</title>
  </head>
  <body>
    <div id="${_.kebabCase(userOptions.root)}">
      <!-- built files will be auto injected -->
    </div>
    <script type="module" src="./build.js"></script>
  </body>
</html>
`);
};

const vnoConfig = (userOptions: terminalOptions) => {
  const { child, root, port, title } = userOptions;
  return JSON.stringify(
    { root, entry: "./", options: { child, port, title } },
    null,
    2
  );
};

export default {
  childComponent,
  rootComponent,
  genericComponent,
  htmlTemplate,
  vnoConfig,
};
