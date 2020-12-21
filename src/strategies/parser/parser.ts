import Parser from "./base.ts";
import Compiler from "../compiler/compiler.ts";

import { ComponentInterface } from "../../lib/types.ts";
import { _CDN } from "../../lib/defaults.ts";

import parseTemplate from "./utils/parseTemplate.ts";
import parseScript from "./utils/parseScript.ts";
import parseStyle from "./utils/parseStyle.ts";

import componentStringify from "./utils/componentStringify.ts";

Parser.prototype.parse = async function () {
  while (this.queue.length) {
    const current: ComponentInterface = this.queue.shift();

    parseTemplate(current);
    parseScript(current);
    parseStyle(current);
    componentStringify(current);

    // console.log("current in while().parse", current);
  }

  // const write = new (Compiler as any)(this.root, this.cache);
  // console.log("cash", this.cache);
  // return write.build();
};

// Parser.prototype.init = async function (current: ComponentInterface) {
//   try {
//     const { path } = current;

//     if (!path) {
//       throw `There was an error identifying the path for ${current.label}`;
//     }

//     const data = await Deno.readTextFile(path);

//     if (!data) {
//       throw `There was an error reading the file for path ${path}`;
//     }

//     const split = data.split(/\n/);
//     return this.template({ ...current, split });
//   } catch (error) {
//     console.error("Error inside of Parser.init:", { ERROR: error });
//   }
// };

// Parser.prototype.instance = function (current: ComponentInterface) {
//   try {
//     const { label, name, template, script, style } = current;

//     // if (!label || !name || !template || !script || !style) {
//     //   throw `There was an error identifying data from ${current.label}`;
//     // }

//     if (label === this.root.label) {
//       const instance: string =
//         `\nvar ${label} = new Vue({template: \`${template}\`,${script}});\n`;

//       this.root = { label, name, instance, style };
//       return this.root;
//     } else {
//       const instance: string =
//         `\nvar ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;

//       this.cache[label] = { label, name, instance, style };

//       if (!this.cache[label]) {
//         throw `There was an error writing ${label} to the cache`;
//       }

//       return this.cache[label];
//     }
//   } catch (error) {
//     console.error("Error inside of Parser.instance:", { error });
//   }
// };

// Parser.prototype.script = function (current: ComponentInterface) {
//   try {
//     const { split } = current;
//     if (!split) {
//       throw `There was an error locating 'split' data for ${current.label} component`;
//     }
//     const open: number | undefined = split.indexOf("<script>");
//     const close: number | undefined = split.indexOf("</script>");

//     if (typeof open !== "number" || typeof close !== "number") {
//       throw `There was an error isolating content inside of <script> tags for ${current.label}.vue`;
//     }

//     const script = split.slice(open + 1, close);

//     if (!script) {
//       throw `There was an error while reading through the script tag in ${current.label}.vue`;
//     }

//     const nameRegEx = /(name)/;
//     let name: string[] | string = script.filter((element: any) =>
//       nameRegEx.test(element)
//     );

//     if (!name.length) {
//       throw `There was an error while identifying the name property inside ${current.label}.vue`;
//     }

//     name = name[0].split(/[`'"]/)[1];

//     const exportRegEx = /^(export)/;
//     let start: number | undefined = script
//       .findIndex((element) => exportRegEx.test(element));

//     let end: number | undefined = script.lastIndexOf("}");

//     if (typeof start !== "number" || typeof end !== "number") {
//       throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
//     }

//     const exports = script
//       .slice(start + 1, end)
//       .join("")
//       .replace(/(\s)/g, "");

//     const componentRegEx = /(components:)/;
//     start = script.findIndex((element) => componentRegEx.test(element));
//     const fromComp = script.slice(start + 1);
//     end = fromComp.findIndex((el) => el.includes("}"));
//     // end = fromComp.indexOf("}");
//     console.log("SLICDCOMPON", fromComp);
//     console.log("sliceddd", fromComp.slice(0, end));

//     return this.style({ ...current, split, name, script: exports });
//   } catch (error) {
//     console.error("Error inside of Parser.script:", { error });
//   }
// };

// Parser.prototype.style = function (current: ComponentInterface) {
//   try {
//     if (!current.split) {
//       throw "an error occured access split property of " + current.label;
//     }
//     const open: number | undefined = current.split.indexOf("<style>");
//     const close: number | undefined = current.split.indexOf("</style>");

//     if (open < 0 || close < 0) return this.instance({ ...current });

//     if (typeof open !== "number" || typeof close !== "number") {
//       return this.instance({ ...current });
//     }

//     const style: string | undefined = current.split
//       .slice(open + 1, close)
//       .join("")
//       .replace(/(\s)/g, "");

//     return this.instance({ ...current, style });
//   } catch (error) {
//     console.error("Error inside of Parser.style:", { error });
//   }
// };

// Parser.prototype.template = function (current: ComponentInterface) {
//   try {
//     if (!current.split) {
//       throw `There was an error locating 'split' data for ${current.label} component`;
//     }

//     const open: number | undefined = current.split.indexOf("<template>");
//     const close: number | undefined = current.split.indexOf("</template>");

//     if (typeof open !== "number" || typeof close !== "number") {
//       throw `There was an error isolating content inside of <template> tags for ${current.label}.vue`;
//     }
//     const split = current.split.slice(close + 1);
//     const template = current.split.slice(open + 1, close)
//       .join("")
//       .replace(/(\s{2,})/g, "");

//     return this.script({ ...current, split, template });
//   } catch (error) {
//     console.error("Error inside of template()=>:", { error });
//   }
// };

export default Parser;
