import { ComponentInterface } from "../../lib/types.ts";
import Utils from "../../lib/utils.ts";
import { compileTemplate } from "../../lib/deps.ts";

// parseTemplate is responsible for parsing template tags
export default function parseTemplate(ast: any, current: ComponentInterface) {
  try {
    current.split = current.split?.map((text) => text.replace("\r", ""));

    const analysis = compileTemplate(
      { source: ast.content, filename: `${current.label}.vue`, isProd: true },
    );

    if (analysis.errors.length) {
      throw new Error(`${analysis.errors.join("\n")}`);
    }

    const open: number = Utils.indexOfRegExp(
      /<template.*>/gi,
      current?.split as string[],
    );
    const close: number = Utils.indexOfRegExp(
      /<\/template>/gi,
      current?.split as string[],
    );

    if (open < 0 || close < 0) {
      throw (
        `There was an error isolating content inside of <template> tags for ${current.label}.vue`
      );
    }

    current.template = analysis.source.replace(Utils.htmlCommentPattern, "")
      .trim("");
    current.split = current?.split?.slice(close + 1);
  } catch (error) {
    console.error(
      "Error inside of parseTemplate()=>:",
      { error },
    );
  }
}
