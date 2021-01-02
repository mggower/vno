import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

import Component from "../strategies/component.ts";
import fn from "../strategies/parser-utils/_fn.ts";

const appTest = new (Component as any)("App", "./test-app/App.vue", true);
fn.parseScript(appTest);

Deno.test({
  name: "appName",
  fn(): void {
    assertEquals(appTest.name, "test");
  },
});

Deno.test({
  name: "appScript",
  fn(): void {
    const script = appTest.script.includes("test: 'testing'");
    assertEquals(script, true);
  },
});

Deno.test({
  name: "appChild",
  fn(): void {
    assertEquals(appTest.child.head, null);
  },
});

/*

parseScript(appTest);

appTest.name is 'test'
appTest.script starts with test:
appTest.child.head = null
*/
