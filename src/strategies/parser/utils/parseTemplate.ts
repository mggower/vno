import { ComponentInterface } from "../../../lib/types.ts";
import { sarahJessicaParker } from "../../../lib/funx.ts";

const parseTemplate = function pT(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;
      const open: number | undefined = split.indexOf("<template>");
      const close: number | undefined = split.indexOf("</template>");

      if (typeof open !== "number" || typeof close !== "number") {
        throw `There was an error isolating content inside of <template> tags for ${current.label}.vue`;
      }

      current.template = sarahJessicaParker(
        split,
        open + 1,
        close,
        /(\s{2,})/g,
        " ",
      );

      current.split = split.slice(close + 1);

      return "parseTemplate()=> successful";
    }
  } catch (error) {
    console.error("Error inside of parseTemplate()=>:", { error });
  }
};

export default parseTemplate;
