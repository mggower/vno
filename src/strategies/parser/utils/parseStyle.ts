import { ComponentInterface } from "../../../lib/types.ts";
import Utils from "../../../lib/utils.ts";

const parseStyle = function pSt(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;

      const open: number | undefined = split.indexOf("<style>");
      const close: number | undefined = split.indexOf("</style>");

      if (
        (open < 0 || close < 0) ||
        (typeof open !== "number" || typeof close !== "number")
      ) {
        current.style = undefined;
        return "parseStyle()=> succesful (no component styling)";
      }

      current.style = Utils.sliceAndTrim(split, open + 1, close);

      return "parseStyle()=> succesful";
    }
  } catch (error) {
    console.error("Error inside of parseStyle()=>:", { error });
  }
};

export default parseStyle;
