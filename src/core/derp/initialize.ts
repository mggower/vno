// import { Options, Storage } from "../lib/newtypes.ts";
// import { createComponent, saveAsRoot } from "./component.ts";
// import _def from "../lib/defaults.ts";
// import { fs, path } from "../lib/deps.ts";


// function isValidOptions(obj: unknown): obj is Options {
//   return obj !== null &&
//     typeof (obj as Options).entry === "string" &&
//     typeof (obj as Options).root === "string";
// }

// async function createStorage(options: Options): Promise<Storage> {
//   if (isValidOptions(options) === false) {
//     throw new TypeError("recieved incorrect options");
//   }

//   const storage = {} as Storage;

//   for await (const file of fs.walk(`${options.entry}`, { exts: ["vue"] })) {
//     /** create a new component for each .vue file */
//     const label = path.parse(file.path).name;

//     storage[label] = createComponent(label, file.path);

//     if (label === options.root) {
//       /** label as root in storage */
//       storage.root = saveAsRoot(storage[label], options.vue || _def.CDN);
//     }
//   }

//   return storage as Storage;
// }

// export default createStorage;