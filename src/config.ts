import vno from "./vno-parser.ts";

const root = {
  label: "App",
  path: vno.locate("./App.vue"),
};

const results = await vno.parse(root);
// console.log("CHECK BUILD --> ");

import { walk } from "https://deno.land/std@0.80.0/fs/mod.ts";

// import { exists } from "https://deno.land/std@0.80.0/fs/mod.ts";

// console.log(await exists("./App.vue"));

// async function printFileNames() {
//   const files = [];
//   for await (const entry of walk(".")) {
//     const extenstion = entry.path.split(".")[1];
//     if (extenstion === "vue") {
//       files.unshift(entry.path);
//     }
//   }
//   return files;
// }

// const vueFiles = await printFileNames();
// printFileNames().then(() => console.log("Done!"));
// console.log(vueFiles);
// vno.build();
