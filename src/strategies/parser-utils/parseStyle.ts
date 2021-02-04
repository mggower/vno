import { ComponentInterface, StyleInterface } from "../../lib/types.ts";
import { colors, scssCompiler, sfcCompiler } from "../../lib/deps.ts";
import Utils, { removeCarriageReturn } from "../../lib/utils.ts";

// parseStyle is responsible for parsing data inside of <style> tags
export default function parseStyle(
  current: ComponentInterface,
  styles: any,
): StyleInterface | ComponentInterface {
  // isolate the content inside <style>
  const open = Utils.indexOfRegExp(/<style.*>/gi, current.split);
  const close = Utils.indexOfRegExp(/<\/style>/gi, current.split);
  // return if the component has no added styling
  if (open < 0 || close < 0) {
    return current;
  }
  // stringify, trim, and save style to component object
  let style = styles[0].content.replace(
    Utils.multilineCommentPattern,
    "",
  );

  if (styles[0].lang === "scss") {
    try {
      style = scssCompiler(style as string);
    } // show codeframe of the error
    catch (error: any) {
      console.error(colors.yellow("\n[Scss compiler]:"));
      console.error(colors.red("Syntax error within styles\n"));
      console.log(
        colors.green(
          sfcCompiler.generateCodeFrame(
            removeCarriageReturn(style as string),
          ),
        ),
      );

      return current;
    }
  }

  return {
    ...current,
    style
  }
}
