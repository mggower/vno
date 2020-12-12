/*


all functionality has been placed into vno-parser.ts
this file has been kept for reference but is not active


*/
// import { join } from "https://deno.land/std@0.74.0/path/mod.ts";

// const rootPath: string = "./App.vue";
// const findPath = (relative: string) => join(Deno.cwd(), `.${relative}`);
// // queue is components to be traversed
// const queue: Array<object> = [];
// // cache holds components after they have been parsed
// const cache: Array<object> = [];

// interface component {
//   name: string;
//   path: string;
//   template: string;
//   imports: Array<object>;
//   script: string;
//   style: string;
// }

// const parseImports = (data: string) => {
//   const lines = data.split(/\n/);
//   // console.log("lines --> ", lines);

//   const regex = /^(import)/;
//   const imports = lines.filter((n) => regex.test(n));
//   // console.log("imports --> ", imports);

//   return imports;
// };

// const traverse = async (component: component) => {
//   console.log(component, "component");
//   queue.push(component);

//   const { path } = component;
//   const root = await Deno.readTextFile(path);
//   // console.log("root -->", root);
  
//   const imports = parseImports(root);

//   imports.forEach((item) => {
//     const arr = item.split(" ");
//     const el = arr[1];
//     const path = findPath(arr[3].split("'")[1]);
//     const component = { el, path };
//     queue.push(component);
//   });

//   // while (queue.length) {
//   //   const current: any = queue.shift();
//   //   console.log(current);
//   //   traverse(current.path);
//   //   cache.push(current);
//   // }
//   console.log(cache, "cache");
// };

// const root = {
//   name: "App",
//   path: findPath(rootPath),
// };

// traverse(root);
