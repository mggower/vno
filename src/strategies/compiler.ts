import { CompilerInterface, ComponentInterface } from "../lib/types.ts";
import { Storage } from "../lib/utils.ts";
import _def from "../lib/defaults.ts";
import { fs } from "../lib/deps.ts";

/**
 * Compiler
 * (3/3) in bundling cycle
 * Compiler writes component instances to build file
 * and writes styling to style css file
 */
class Compiler implements CompilerInterface {
  public mount: string; /** mounts the root component to the dom */
  public vue: string; /** imports vue in build file */
  constructor() {
    this.mount = `\n${Storage.root.label}.$mount("#${Storage.root.name}");`;
    this.vue = `import Vue from '${Storage.root.vue}';\n`;
  }

  /** build establishes the build path and overwrites any previous builds */
  public build(): void {
    try {
      fs.ensureDirSync(_def.VNO_PATH);
      if (fs.existsSync(_def.STYLE_PATH)) Deno.removeSync(_def.STYLE_PATH);
      // write to build, lint ignore and import vue with CDN
      Deno.writeTextFileSync(_def.BUILD_PATH, _def.IGNORE + this.vue);
      // invokes traverse to write the components in single threaded sequence
      this.traverse(Storage.root);
      // write to build, mount app to the dom to complete
      Deno.writeTextFileSync(_def.BUILD_PATH, this.mount, { append: true });
    } catch (error) {
      return console.error(
        `Error inside of Compiler.build:`,
        { error },
      );
    }
  }

  /** write is responsible for writing each instance to the build */
  public write(current: ComponentInterface): void {
    if (!current.instance) {
      throw (
        `${current.label} is missing its instance data`
      );
    }
    Deno.writeTextFileSync(_def.BUILD_PATH, current.instance, { append: true });
    if (current.style) {
      Deno.writeTextFileSync(_def.STYLE_PATH, current.style, { append: true });
    }
  }

  /**
   * traverse
   * traverse mimics a postorder tree traversal
   * it iterates through the component tree, and
   * writes from the least dependent to the root
   */
  public traverse(current: ComponentInterface): void {
    if (current.child?.head) this.traverse(current.child.head);
    if (current.sibling) this.traverse(current.sibling);
    this.write(current);
  }
}

export default Compiler;
