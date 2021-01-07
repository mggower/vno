import { terminalOptions } from "../lib/types.ts";
import { _ } from "../lib/deps.ts";

// template literal strings for HTML/Components/Server/Deps
const childComponent = (childName: string) => {
  return (
    `<template>\n<div class="hello">\n<h1>{{ msg }}</h1>\n<p>\n<br>
</p>\n<h3><a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> & <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">github</a></h3>\n<ul>
<br>\n</ul>\n</div>\n\n</template>\n\n<script>\n\nexport default {\nname: '${
      _.kebabCase(childName)
    }',\nprops: {\nmsg: String
},\n}\n\n</script>\n\n<style>\nh3 {\nmargin: 40px 0 0;\n}\nul {\nlist-style-type: none;\npadding: 0;\n}\nli {\ndisplay: inline-block;\n
\nmargin: 0 10px;\n}\na {\ncolor: #79D0B2;\n}\n\n</style>`
  );
};

const rootComponent = (userOptions: terminalOptions) => {
  return (
    `<template>\n<div id="${userOptions.root.toLowerCase()}">\n<img src="https://svgshare.com/i/SNz.svg" alt="image" border="0" width="450" height="450">\n<${userOptions.child} msg="you are building: ${userOptions.title} with vno"/>
    \n</div>\n</template>\n\n<script>\nimport '${userOptions.child}' from './components/${userOptions.child}.vue';\n
\nexport default {\nname: '${
      _.kebabCase(userOptions.root)
    }',\ncomponents: {${userOptions.child}}\n}\n
\n</script>\n\n<style>\n\nhtml {background-color:#203A42}\n#${userOptions.root.toLowerCase()} {
font-family: Avenir, Helvetica, Arial, sans-serif;\n-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;\ntext-align: center;\ncolor: #79D0B2;\nmargin-top: 60px;
}\n\n</style>`
  );
};

const genericComponent = () => {
  return (
    `<template>\n\n</template>\n\n<script>\n\nexport default {\nname: };\n\n</script>\n\n<style>\n\n</style>`
  );
};

const htmlTemplate = (userOptions: terminalOptions) => {
  return (
    `
<!DOCTYPE html>
 <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <link rel="stylesheet" href="./style.css">
    <title>${userOptions.title}</title>
  </head>
  <body>
    <div id="${_.kebabCase(userOptions.root)}">
      <!-- built files will be auto injected -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <script type="module" src='./build.js'></script>
  </body>
 </html>`
  );
};

const vnoConfig = (userOptions: terminalOptions) => {
  const { child, root, port, title } = userOptions;
  return (JSON.stringify(
    { root, entry: "./", options: { child, port, title } },
  ));
};

export default {
  childComponent,
  rootComponent,
  genericComponent,
  htmlTemplate,
  vnoConfig,
};
