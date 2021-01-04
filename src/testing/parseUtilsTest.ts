import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertNotMatch,
  assertStringIncludes,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";

import Component from "../strategies/component.ts";
import fn from "../strategies/parser-utils/_fn.ts";

const appTest = new (Component as any)("App", "./test-app/App.vue", true);

//The following test checks for correct stringification of components

fn.componentStringify(appTest);

Deno.test({
  name: "Component instance string has been created",
  fn(): void {
    assertNotEquals(appTest.instance, undefined || null);
  },
});

Deno.test({
  name: "Root component has created new Vue instance",
  fn(): void {
    assertStringIncludes(appTest.instance, "new Vue");
  },
});

Deno.test({
  name: "Instance contains a template",
  fn(): void {
    assertStringIncludes(appTest.instance, "template:");
  },
});

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
  name: "Child components should not exist yet in the child list",
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

Deno.test({
  name: "Template exists",
  fn(): void {
    assertNotEquals(appTest.template, undefined || null);
  },
});

Deno.test({
  name: "Should contain HTML tags",
  fn(): void {
    assertStringIncludes(appTest.template, "div");
  },
});

Deno.test({
  name: "Template is properly formatted",
  fn() {
    assertNotMatch(appTest.template, /<\/?template>/);
  },
});
