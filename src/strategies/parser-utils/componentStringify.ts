import { ComponentInterface } from "../../lib/types.ts";

export default function componentStringify(current: ComponentInterface) {
  try {
    const { label, name, template, script } = current;

    if (current.isRoot) {
      current.instance =
        `\nconst ${label} = new Vue({template: \`${template}\`,${script}});\n`;
    } else {
      current.instance =
        `\nconst ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;
    }

    return "componentStringify()=> successful";
  } catch (error) {
    console.error(
      "Error inside of componentStringify()=>:",
      { error },
    );
  }
}
