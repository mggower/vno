import { _BUILD_PATH } from "../../lib/defaults.ts";
import Builder from "./base.ts";

/**
 * mount method finishes the build by writing the Application mount & root instance
 * @params: the root component object and _BUILD_PATH from build method
 */

Builder.prototype.mount = async function () {
  try {
    const mount =
      `\n${this.root.label}.$mount("#${this.root.name}");\nexport default ${this.root.label};\n`;

    if (this.root.instance) {
      await Deno.writeTextFile(
        _BUILD_PATH,
        this.root.instance,
        { append: true },
      );
    } else throw `${this.root.label} is missing an instance property`;

    await Deno.writeTextFile(_BUILD_PATH, mount, { append: true });

    return true;
  } catch (error) {
    console.error("Error inside of Parser.mount:", { error });
  }
};

export default Builder;