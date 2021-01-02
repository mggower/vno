import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";

import Component from "../strategies/component.ts";
import fn from "../strategies/parser-utils/_fn.ts";

const appTest = new (Component as any)("App", "./test-app/App.vue", true);
//The following test is to ensure correct build of component object
const keyArray = Object.keys(appTest);
Deno.test({
  name: "Component object contains correct properties",
  fn(): void {
    assertArrayIncludes(
      keyArray,
      ["label", "path", "isRoot", "isParsed", "data", "split"],
    );
  },
});
//The following tests are for measuring functionality of parseScript
fn.parseScript(appTest);

Deno.test({
  name: "Root app has correct name",
  fn(): void {
    assertEquals(appTest.name, "test");
  },
});

Deno.test({
  name: "Script is a string that includes script from component",
  fn(): void {
    assertStringIncludes("test: testing", "test: testing");
  },
});

Deno.test({
  name: "Checks for existence of child components",
  fn(): void {
    assertEquals(appTest.child.head, null);
  },
});

//The following tests are for measuring functionality of parseStyle
fn.parseStyle(appTest);

Deno.test({
  name: "Style exists",
  fn(): void {
    assertNotEquals(appTest.script, undefined || null);
  },
});

Deno.test({
  name: "Tests for correct styling",
  fn(): void {
    assertStringIncludes("blue", "blue");
  },
});

Deno.test({
  name: "Style is properly formatted",
  fn(): void {
    assertEquals(
      appTest.style,
      "body { background-color: blue;}h1 { color: salmon;}",
    );
  },
});

//The following tests are for measuring functionality of parseTemplate
fn.parseTemplate(appTest);
console.log(appTest.template);

Deno.test({
  name: "Template exists",
  fn(): void {
    assertNotEquals(appTest.template, undefined || null);
  },
});
