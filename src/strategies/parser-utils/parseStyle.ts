import { ComponentInterface } from "../../lib/types.ts";
import Utils from "../../lib/utils.ts";

// parseStyle is responsible for parsing data inside of <style> tags
export default function parseStyle(current: ComponentInterface) {
  try {
    if (current.split) {
      // isolate the content inside <style>
      const open = Utils.indexOfRegExp(/<style.*>/gi, current.split);
      const close = Utils.indexOfRegExp(/<\/style>/gi, current.split);
      // return if the component has no added styling
      if (open < 0 || close < 0) {
        current.style = undefined;
        return "parseStyle()=> succesful (no component styling)";
      }
      // stringify, trim, and save style to component object
      current.style = Utils.sliceAndTrim(current.split, open + 1, close);
    }
  } catch (error) {
    console.error(
      "Error inside of parseStyle()=>:",
      { error },
    );
  }
}
