import { Util } from "../dts/factory.d.ts";
import { _ } from "../lib/deps.ts";

// template literal strings for HTML/Components/Server/Deps
export const childComponent = (componentsName: string) => {
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
  name: '${_.kebabCase(componentsName)}',
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
</style>`
  );
};

export const rootComponent = (options: Util.CreateInputs) => {
  return (
    `<template>
  <div id="${options.root.toLowerCase()}">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />
    <${
      options.components[0]
    } msg="you are building: ${options.title} with vno" />
  </div>
</template>

<script>
import ${options.components[0]} from './components/${
      options.components[0]
    }.vue';

export default {
  name: '${_.kebabCase(options.root)}',
  components: {${options.components[0]}},
};

</script>

<style>
html {
  background-color: #203A42;
}
#${options.root.toLowerCase()} {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>`
  );
};

export const genericComponent = () => {
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

export const htmlTemplate = (options: Util.CreateInputs) => {
  return (
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <title>${options.title}</title>
  </head>
  <body>
    <div id="${_.kebabCase(options.root)}">
      <!-- built files will be auto injected -->
    </div>
    <script type="module" src="./build.js"></script>
  </body>
</html>
`
  );
};

export const vnoConfig = (options: Util.CreateInputs) => {
  const { root, port, title } = options;
  return JSON.stringify(
    { root, entry: "./", options: { port, title } },
    null,
    2,
  );
};
