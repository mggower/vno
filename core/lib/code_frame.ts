import * as utils from "../utils/utils.ts";
import type { Util } from "../dts/factory.d.ts";
import { colors, sfcCompiler } from "../utils/deps.ts";

export const showCodeFrame: Util.SCF = function (content, errors) {
  const { filename, source, template } = content;

  const templateAnalysis = sfcCompiler.compileTemplate(
    { source: utils.removeCarriageReturn(template.content), filename },
  );

  // detect if the error is in the template
  if (templateAnalysis.errors.length) {
    console.log(colors.red(`\nTemplate Error in: ${colors.green(filename)}\n`));
    templateAnalysis.errors.forEach((error: Error) => {
      console.log(colors.yellow(`${error.toString()}\n`));
    });
    console.log(
      colors.green(
        sfcCompiler.generateCodeFrame(
          (templateAnalysis.source as string).trimStart(),
        ),
      ),
    );
    // show component error
  } else {
    const messages = new Set();
    console.log(
      colors.red(`\nComponent Error in: ${colors.green(filename)}\n`),
    );
    errors?.forEach((error: string) => {
      // do not show the same message twice
      messages.add(`${error.toString()}`);
    });
    console.log(colors.yellow([...messages].join("\n")));
    console.log(colors.yellow("\n"));
    // show code frame
    console.log(
      colors.green(
        sfcCompiler.generateCodeFrame(utils.removeCarriageReturn(source)),
      ),
    );
  }
};
