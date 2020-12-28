import { ComponentInterface } from "../../../lib/types.ts";
import Utils from "../../../lib/utils.ts";

const parseTemplate = function pT(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;

      const open: number = split.indexOf("<template>");
      const close: number = split.indexOf("</template>");

      if (open < 0 || close < 0) {
        throw (
          `There was an error isolating content inside of <template> tags for ${current.label}.vue`
        );
      }

      current.template = Utils.sliceAndTrim(split, open + 1, close);
      current.split = split.slice(close + 1);

      return "parseTemplate()=> successful";
    }
  } catch (error) {
    console.error(
      "Error inside of parseTemplate()=>:",
      { error },
    );
  }
};

export default parseTemplate;
