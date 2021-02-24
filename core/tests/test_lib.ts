import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { configReader } from "../lib/config_reader.ts";
import { vueLogger } from "../lib/vue_logger.ts";
import type { Component, Fctry } from "../dts/factory.d.ts";

const config: Fctry.Config | unknown = await configReader();
console.log(typeof config);

Deno.test({
  name: "configReader returns object that is not null",
  fn(): void {
    assertNotEquals((config as Fctry.Config), undefined);
  },
});

Deno.test({
  name: "configReader locates vue version",
  fn(): void {
    assertEquals((config as Fctry.Config).vue, 3);
  },
});

Deno.test({
  name: "configReader locates entry point",
  fn(): void {
    assertEquals((config as Fctry.Config).entry, "../../example/test_demo/");
  },
});

Deno.test({
  name: "configReader locates root label",
  fn(): void {
    assertEquals((config as Fctry.Config).root, "App");
  },
});

Deno.test({
  name: "configReader contains options",
  fn(): void {
    assertNotEquals((config as Fctry.Config).options, undefined);
  },
});

Deno.test({
  name: "configReader options has project title",
  fn(): void {
    assertEquals(
      (config as Fctry.Config).options?.title,
      "benchmark test project",
    );
  },
});

const component = <Component> { label: "TestRoot", name: "test-root" };
const vueLogV2: Fctry.Vue = vueLogger(
  2 as Fctry.Version,
  component,
  "variable",
);
const depV2 = "import Vue from ";
const mountV2 = `\nTestRoot.$mount("#test-root")`;

Deno.test({
  name: "vueLogger returns object",
  fn(): void {
    assertNotEquals((vueLogV2 as Fctry.Vue), undefined);
  },
});

Deno.test({
  name: "vueLogger returns valid import statement",
  fn(): void {
    assertEquals((vueLogV2 as Fctry.Vue).dep, depV2);
  },
});

Deno.test({
  name: "vueLogger returns valid vue mount statement",
  fn(): void {
    assertEquals((vueLogV2 as Fctry.Vue).mount, mountV2);
  },
});
