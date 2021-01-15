import { ComponentInterface } from "../../lib/types.ts";

// #region componentStringify
// is responsible for using a component's parsed data and
// compiling it into a vue "instance" in javascript to be
// written to the build
// #endregion
export default function componentStringify(current: ComponentInterface) {
  try {
    const { label, name, template, script, middlecode } = current;
    // application root is written as a new Vue instance
    if (current.isRoot) {
      current.instance = `${middlecode ??
        ""}\nconst ${label} = new Vue({template: /* html */\n\`${template}\`, ${script}});\n`;
    } else {
      // all children components are registered to the instance
      current.instance = `${middlecode ??
        ""}\nconst ${label} = Vue.component("${name}", {template: /* html */\n\`${template}\`,\n ${script}});\n`;
    }
  } catch (error) {
    console.error(
      "Error inside of componentStringify()=>:",
      { error },
    );
  }
}
