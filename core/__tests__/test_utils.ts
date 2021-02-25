import { asrt } from "../lib/deps.ts";
import {
  indexOfRegExp,
  removeCarriageReturn,
  sliceAndTrim,
} from "../utils/utils.ts";

// testing accuracy for utility functions
const arr = [
  "aaa",
  "bbb",
  "ccc",
  "ddd",
  "eee",
];

const regex = /(a*)/i;
const index = indexOfRegExp(regex, arr);

Deno.test({
  name: "testing accuracy for indexOfRegExp",
  fn(): void {
    asrt.assertEquals(index, 0);
  },
});


