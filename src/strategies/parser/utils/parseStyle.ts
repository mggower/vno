import { ComponentInterface } from "../../../lib/types.ts";
import { sarahJessicaParker } from "../../../lib/funx.ts";

const parseStyle = function pSt(current: ComponentInterface) {
  try {
    if (!current.split) {
      throw "an error occured access split property of " + current.label;
    }

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

    current.style = sarahJessicaParker(split, open + 1, close, /(\s)/g);

    return "parseStyle()=> succesful";
  } catch (error) {
    console.error("Error inside of Parser.style:", { error });
  }
};

export default parseStyle;
