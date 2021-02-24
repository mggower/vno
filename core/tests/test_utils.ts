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

// Deno.test({
//   name: "Root component has created new Vue instance",
//   fn(): void {
//     asrt.assertStringIncludes(appTest.instance, "new Vue");
//   },
// });

// Deno.test({
//   name: "Instance contains a template",
//   fn(): void {
//     asrt.assertStringIncludes(appTest.instance, "template:");
//   },
// });

// // The following test is to ensure correct build of component object
// const keyArray = Object.keys(appTest);

// Deno.test({
//   name: "Component object contains correct properties",
//   fn(): void {
//     asrt.assertArrayIncludes(
//       keyArray,
//       ["label", "path", "isRoot", "isParsed", "split"],
//     );
//   },
// });

// // The following tests are for measuring functionality of parseScript
// fn.parseScript(appTest);

// Deno.test({
//   name: "Root app has correct name",
//   fn(): void {
//     asrt.assertEquals(appTest.name, "test");
//   },
// });

// Deno.test({
//   name: "Script is a string that includes script from component",
//   fn(): void {
//     asrt.assertStringIncludes("test: testing", "test: testing");
//   },
// });

// Deno.test({
//   name: "Child components should not exist yet in the child list",
//   fn(): void {
//     asrt.assertEquals(appTest.child.head, null);
//   },
// });

// // The following tests are for measuring functionality of parseStyle
// fn.parseStyle(appTest);

// Deno.test({
//   name: "Style exists",
//   fn(): void {
//     asrt.assertNotEquals(appTest.script, undefined || null);
//   },
// });

// Deno.test({
//   name: "Tests for correct styling",
//   fn(): void {
//     asrt.assertStringIncludes("blue", "blue");
//   },
// });

// Deno.test({
//   name: "Style is properly formatted",
//   fn(): void {
//     asrt.assertEquals(
//       appTest.style,
//       "body { background-color: blue;}h1 { color: salmon;}",
//     );
//   },
// });

// // The following tests are for measuring functionality of parseTemplate
// fn.parseTemplate(appTest);

// Deno.test({
//   name: "Template exists",
//   fn(): void {
//     asrt.assertNotEquals(appTest.template, undefined || null);
//   },
// });

// Deno.test({
//   name: "Should contain HTML tags",
//   fn(): void {
//     asrt.assertStringIncludes(appTest.template, "div");
//   },
// });

// Deno.test({
//   name: "Template is properly formatted",
//   fn() {
//     asrt.assertNotMatch(appTest.template, /<\/?template>/);
//   },
// });
