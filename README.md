<img src="./assets/vnologo.svg"
     alt="vno logo"
     style="float: left; margin-right: 10px;" />

<p align='right'> - Logo Design by <a href='https://www.behance.net/bmccabe'>Brendan McCabe</a></p>
<h1 align="center">
	<a href='https://vno.land'>vno</a> <img alt="twitter" src="https://img.shields.io/twitter/follow/vno_land?label=%40vno_land&logoColor=%2357d3af&style=social"></h1>
	<h4 align='center'> The first <a href='https://deno.land/x/vno'>build tool</a> for compiling and bundling <a href='https://github.com/vuejs'>Vue</a> components in a <a href='https://github.com/denoland'>Deno</a> runtime environment</h4>

<p align="center">
  <img alt="license" src="https://img.shields.io/github/license/oslabs-beta/vno?color=%2357d3af">
  <img alt="issues" src="https://img.shields.io/github/issues-raw/oslabs-beta/vno?color=yellow">
  <img alt="last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/vno?color=%2357d3af">
  <img alt="Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/vno?logoColor=%2334495e&style=social"> 
</p>


## Features

- Parser
- Compiler
- Bundler
- Adapter
- Server Side Renderer (coming soon)

## Overview

- Vue is an approachable javascript framework with an exciting ecosystem with remarkable versatility. Deno is a runtime environment intent on improving the shortcomings of node.js. We wanted to be able to leverage the vue framework in a deno runtime environment, but could not find a tool that made this possible. So we decided to make it ourselves.

## How to use vno

- You can use the vno Command Line Interface to quickly create a new vue project in a deno runtime
- OR you can use the vno build method to compile an existing vue file structure into a deno-legible .js file

### Create a new project with vno CLI

- Create a directory for your project
- CD into the aforementioned directory
- Copy the following code into your terminal

```
deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno/dist/mod.ts
```

- Copy the export path your terminal returns and paste it into your terminal
  ![install gif](https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif)

- Use vno's CLI to create a new project:

```
vno create [project name]
```

![vno create](https://i.ibb.co/Fw5Sp7n/vno-create.gif)

- _OR_ If you'd rather not install:

```
deno run --allow-read --allow-write --allow-run --allow-net --unstable https://deno.land/x/vno/dist/mod.ts create [project name]
```

- **note: If you would like to avoid writing out all the permissions, you can also use the '-A' tag**
- Like so:

```
deno run --A --unstable https://deno.land/x/vno/dist/mod.ts create [project name]
```

### Using the build method

- To invoke the build method and dynamically create bundled .js and .css files for your application type the following into the terminal:

```
vno build
```

_OR_

```
deno run --allow-read --allow-write --allow-run --allow-net --unstable https://deno.land/x/vno/dist/mod.ts build
```

![vno build](https://i.ibb.co/jgRFXvc/vno-build.gif)

**It is important to know that as of now, scoped styling is not supported**

### The vno dev server

- Running the dev server dynamically creates a new build folder and runs the application on a cloud hosted server
- Invoke the dev server like so:

```
vno run dev
```

_OR_

```
deno run --allow-read --allow-write --allow-run --allow-net --unstable https://deno.land/x/vno/dist/mod.ts run dev
```

![vno run dev](https://i.ibb.co/RckD0Tm/vno-run-dev.gif)

### Vno run server

- Add a server property in your vno.config.json file
```
{
  "root": "App",
  "entry": "./path/to/rootcomponent",
  "options": {
    "title": "an example application"
  },
  "server": "./path/to/server.ts"
}
```
- And execute this command in the terminal
```
vno run server
```

![vno run server](https://i.ibb.co/xFZPM1L/vno-run-server.gif)
