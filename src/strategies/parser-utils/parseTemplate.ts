import { ComponentInterface, TemplateInterface } from "../../lib/types.ts";
import Utils, { removeCarriageReturn } from "../../lib/utils.ts";

// parseTemplate is responsible for parsing template tags
function parseTemplate(current: ComponentInterface, ast: any): TemplateInterface {
    const close: number = Utils.indexOfRegExp(
      /<\/template>/gi,
      current?.split as string[],
    );

    // remove /r & <!-- --> from template
    const template = removeCarriageReturn(ast.content).replace(
      Utils.htmlCommentPattern,
      "",
    );
    const split = current?.split?.slice(close + 1);

    return {
      ...current,
      template,
      split,
    }
}

export default parseTemplate;