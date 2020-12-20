import { ensureDir, exists } from "https://deno.land/std@0.80.0/fs/mod.ts";

import { _BUILD_PATH, _CDN, _STYLE_PATH, _VNO_PATH } from "../../lib/defaults.ts";
import { component } from "../../lib/types.ts";
import print from "../../lib/console.ts";

interface builder {
  root: component;
  cache: object;
}

const Builder = function (this: builder, root: component, cache: object) {
  this.root = root;
  this.cache = cache;
};

export default Builder;