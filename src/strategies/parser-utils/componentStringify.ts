import { ComponentInterface } from "../../lib/types.ts";

// #region componentStringify
// is responsible for using a component's parsed data and
// compiling it into a vue "instance" in javascript to be
// written to the build
// #endregion
export default function componentStringify(current: ComponentInterface) {
  try {
    const { label, name, template, script } = current;
    // application root is written as a new Vue instance
    if (current.isRoot) {
      current.instance =
        `\nconst ${label} = new Vue({template: \`${template}\`,${script}});\n`;
    } else {
      // all children components are registered to the instance
      current.instance =
        `\nconst ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;
    }
  } catch (error) {
    console.error(
      "Error inside of componentStringify()=>:",
      { error },
    );
  }
}
