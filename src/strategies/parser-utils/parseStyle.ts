import { ComponentInterface } from "../../lib/types.ts";
import { scssCompiler } from "../../lib/deps.ts";
import Utils from "../../lib/utils.ts";

// parseStyle is responsible for parsing data inside of <style> tags
export default function parseStyle(current: ComponentInterface) {
  try {
    let useScss = false;
    if (current.split) {
      // isolate the content inside <style>
      const open = Utils.indexOfRegExp(/<style.*>/gi, current.split);
      const close = Utils.indexOfRegExp(/<\/style>/gi, current.split);
      // return if the component has no added styling
      if (open < 0 || close < 0) {
        current.style = undefined;
        return "parseStyle()=> successful (no component styling)";
      }
      // stringify, trim, and save style to component object
      current.style = Utils.sliceAndTrim(current.split, open + 1, close);
      current.style = current.style.replace(Utils.multilineCommentPattern, "");

      // detect scss style lang
      for (const chunk of current.split) {
        if (chunk.includes('lang="scss"')) {
          useScss = true;
        }
      }

      // stringify, trim, and save style to component object
      current.style = Utils.sliceAndTrim(current.split, open + 1, close);

      // compile scss to css
      if (useScss) {
        current.style = scssCompiler(current.style as string);
      }
    }
  } catch (error) {
    console.error(
      "Error inside of parseStyle()=>:",
      { error },
    );
  }
}
