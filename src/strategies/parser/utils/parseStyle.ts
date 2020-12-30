import { ComponentInterface } from "../../../lib/types.ts";
import Utils from "../../../lib/utils.ts";

const parseStyle = function pSt(current: ComponentInterface) {
  try {
    if (current.split) {
      const open = Utils.indexOfRegExp(/<style.*>/gi, current.split);
      const close = Utils.indexOfRegExp(/<\/style>/gi, current.split);

      if (open < 0 || close < 0) {
        current.style = undefined;
        return "parseStyle()=> succesful (no component styling)";
      }

      current.style = Utils.sliceAndTrim(current.split, open + 1, close);

      return "parseStyle()=> succesful";
    }
  } catch (error) {
    console.error(
      "Error inside of parseStyle()=>:",
      { error },
    );
  }
};

export default parseStyle;
