import { ComponentInterface } from "../../../lib/types.ts";

const parseTemplate = function pT(current: ComponentInterface) {
  try {
    if (!current.split) {
      throw `There was an error locating 'split' data for ${current.label} component`;
    }

    const open: number | undefined = current.split.indexOf("<template>");
    const close: number | undefined = current.split.indexOf("</template>");

    if (typeof open !== "number" || typeof close !== "number") {
      throw `There was an error isolating content inside of <template> tags for ${current.label}.vue`;
    }
    current.template = current.split.slice(open + 1, close)
      .join("")
      .replace(/(\s{2,})/g, "");

    current.split = current.split.slice(close + 1);

    return "parseTemplate()=> successful";
  } catch (error) {
    console.error("Error inside of parseTemplate()=>:", { error });
  }
};

export default parseTemplate;
