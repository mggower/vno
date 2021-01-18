import { ComponentInterface } from "../../lib/types.ts";
import { colors, sfcCompiler, scssCompiler } from "../../lib/deps.ts";
import Utils, { removeCarriageReturn } from "../../lib/utils.ts";

// parseStyle is responsible for parsing data inside of <style> tags
export default function parseStyle(current: ComponentInterface, styles: any) {
  try {
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
      current.style = styles[0].content.replace(
        Utils.multilineCommentPattern,
        "",
      );

      if (styles[0].lang === "scss") {
        try {
          current.style = scssCompiler(current.style as string);
        }
        // show codeframe of the error
        catch (error: any) {
          console.error(colors.yellow("\n[Scss compiler]:"));
          console.error(colors.red("Syntax error within styles\n"));
          console.log(
            colors.green(
              sfcCompiler.generateCodeFrame(removeCarriageReturn(current.style as string)),
            ),
          );

          current.style = "";
        }
      }
    }
  } catch (error) {
    console.error(
      "Error inside of parseStyle()=>:",
      { error },
    );
  }
}
