// deno std library
import * as fs from "https://deno.land/std@0.83.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.83.0/path/mod.ts";
import * as colors from "https://deno.land/std@0.83.0/fmt/colors.ts";
import * as http from "https://deno.land/std@0.83.0/http/mod.ts";
import * as asrt from "https://deno.land/std@0.83.0/testing/asserts.ts";

// third-party
import _ from "https://cdn.skypack.dev/lodash"; // lodash
import ProgressBar from "https://deno.land/x/progress@v1.2.3/mod.ts";
import { compile as scssCompiler } from "https://raw.githubusercontent.com/crewdevio/deno_sass2/master/mod.ts";

// oak
import * as oak from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { superoak } from "https://deno.land/x/superoak@3.0.0/mod.ts";

export {
  _,
  asrt,
  colors,
  fs,
  http,
  oak,
  path,
  ProgressBar,
  scssCompiler,
  superoak,
};

export * from "https://deno.land/x/vue_sfc_compiler@v1.0.0/mod.ts";
