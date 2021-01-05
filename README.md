<img src="./assets/vnologo.svg"
     alt="vno logo"
     style="float: left; margin-right: 10px;" />
<p align='right'> - Logo Design by <a href='https://www.behance.net/bmccabe'>Brendan McCabe</a></p>
<h1 align="center">
	<a href='https://vno.land'>vno</a>
<h4 align='center'> The first build tool for compiling and bundling <a href='https://github.com/vuejs'>Vue</a> components in a <a href='https://github.com/denoland'>Deno</a> runtime environment</h4>

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
````
deno install --allow-read --allow-write --allow-run --allow-net --unstable -f -n vno https://deno.land/x/vno@v1.0-beta.5/dist/mod.ts
````
- Copy the export path your terminal returns and paste it into your terminal
![install gif](https://media.giphy.com/media/LVokebNuReGJuwU13R/giphy.gif)

### Using the build method
There are 2 ways to use the build method
- Method one

![vno create](https://i.ibb.co/Fw5Sp7n/vno-create.gif)

![vno build](https://i.ibb.co/jgRFXvc/vno-build.gif)


## Parser

- VNO Parser parses Vue single file components for deno.

## Dist

- This mod.ts file will ultimately be what people import AS vno to have access to all of the methods we have built throughout the file structure.
