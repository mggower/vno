import { ComponentInterface } from "../../../lib/types.ts";

const componentStringify = function cS(current: ComponentInterface) {
  try {
    const { label, name, template, script } = current;

    if (current.isRoot) {
      current.instance =
        `\nvar ${label} = new Vue({template: \`${template}\`,${script}});\n`;
    } else {
      current.instance =
        `\nvar ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;
    }

    return "componentStringify()=> successful";
  } catch (error) {
    console.error("Error inside of componentStringify()=>:", { error });
  }
};

export default componentStringify;
