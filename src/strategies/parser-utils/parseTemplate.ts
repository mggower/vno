import { ComponentInterface, TemplateIF } from "../../lib/types.ts";
import Utils, { removeCarriageReturn } from "../../lib/utils.ts";

// parseTemplate is responsible for parsing template tags
export default function parseTemplate(
  current: ComponentInterface,
  ast: any,
) /**: TemplateIF*/ {
  try {
    // remove '\r' from the chunks
    current.split = current.split?.map((text) => text.replace("\r", ""));

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

    // remove '\r' before inject template
    current.template = removeCarriageReturn(ast.content).replace(
      // remove <!-- ---> from template
      Utils.htmlCommentPattern,
      "",
    );

    current.split = current?.split?.slice(close + 1);

    // const template = removeCarriageReturn(ast.content).replace(
    //   // remove <!-- ---> from template
    //   Utils.htmlCommentPattern,
    //   "",
    // );
    // const split = current?.split?.slice(close + 1);
    // return {
    //   ...current,
    //   template,
    //   split,
    // }
  } catch (error) {
    console.error(
      "Error inside of parseTemplate()=>:",
      { error },
    );
  }
}
