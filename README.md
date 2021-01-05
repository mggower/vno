<img src="./assets/vnologo.svg"
     alt="vno logo"
     style="float: left; margin-right: 10px;" />
Logo Design by [Mikey's Friend]

### the first build tool for compild and bundling [Vue](https://github.com/vuejs) components in a [Deno](https://github.com/denoland) runtime environment

## Why we built it
- Vue is an approachable javascript framework with an exciting ecosystem with remarkable versatility. Deno is a runtime environment intent on improving the shortcomings of node.js. We wanted to be able to leverage the vue framework in a deno runtime environment, but could not find a tool that made this possible. So we decided to make it ourselves. 

## How to use vno
- You can use the vno Command Line Interface to quickly create a new vue project in a deno runtime
- OR you can use the vno build method to compile an existing vue file structure into a deno-legible .js file 

#### Create a new project with vno CLI
- Create a directory for your project
- CD into the aforementioned directory
- Copy the following code into your terminal
````
deno install -A --unstable -n vno https://deno.land/x/vno@v1.0-beta.5/dist/mod.ts
````
- Copy the export path your terminal returns and paste it into your terminal
- add a gif here?

## Parser

- VNO Parser parses Vue single file components for deno.

## Dist

- This mod.ts file will ultimately be what people import AS vno to have access to all of the methods we have built throughout the file structure.
