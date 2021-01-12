import { ComponentInterface } from "../../lib/types.ts";

// #region componentStringify
// is responsible for using a component's parsed data and
// compiling it into a vue "instance" in javascript to be
// written to the build
// #endregion
export default function componentStringify(current: ComponentInterface) {
  try {
    const { label, data } = current;
    console.log(data);
    const temp = Deno.makeTempFileSync();
    // application root is written as a new Vue instance
    if (current.isRoot) {
      current.instance =
        `\nconst ${label} = new Vue({template: \`${data.descriptor.template.content}\`,${data.descriptor.script.content}});\n`;
    } else {
      // all children components are registered to the instance
      current.instance =
        `\nconst ${label} = Vue.component("${label}", {template: \`${data.descriptor.template.content}\`,${data.descriptor.script.content}});`;
    }
  } catch (error) {
    console.error(
      "Error inside of componentStringify()=>:",
      { error },
    );
  }
}
