import { ensureDir, exists } from "https://deno.land/std@0.80.0/fs/mod.ts";

import { _BUILD_PATH, _CDN, _STYLE_PATH, _VNO_PATH } from "../lib/defaults.ts";
import { component } from "../lib/types.ts";
import print from "../lib/console.ts";

interface builder {
  root: component;
  cache: object;
}

const Builder = function (this: builder, root: component, cache: object) {
  this.root = root;
  this.cache = cache;
};

/**
  * build method will iterate through the cache and write the
  * components as Vue instances into a single file for production.
  */

Builder.prototype.build = async function () {
  try {
    await ensureDir(_VNO_PATH);

    const ignore = `/* eslint-disable */\n// prettier-ignore\n`;
    const vue = `import Vue from '${_CDN}';\n`;

    if (await exists(_BUILD_PATH)) await Deno.remove(_BUILD_PATH);
    await Deno.writeTextFile(_BUILD_PATH, ignore + vue, { append: true });

    if (await exists(_STYLE_PATH)) await Deno.remove(_STYLE_PATH);
    await Deno.writeTextFile(_STYLE_PATH, this.root.style, { append: true });

    await Object.keys(this.cache)
      .forEach(
        async (child) => {
          const { instance } = this.cache[child];

          if (!instance) {
            throw `${this.cache[child].label} is missing it's instance data`;
          }

          await Deno.writeTextFile(_BUILD_PATH, instance, { append: true });

          if (this.cache[child].style) {
            const { style } = this.cache[child];
            await Deno.writeTextFile(_STYLE_PATH, style, { append: true });
          }
        },
      );

    const mounted = await this.mount();

    if (mounted) return print();
    else {
      throw `an error occured mounting your application's root`;
    }
  } catch (error) {
    return console.error(`Error inside of Builder.build:`, { error });
  }
};

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
