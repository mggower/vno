import {
  assert,
  assertEquals,
  fail,
} from "https://deno.land/std/testing/asserts.ts";
import vno from "./vno-parser.ts";

Deno.test({
  name: "Assert",
  fn() {
    assert(1);
  },
});
