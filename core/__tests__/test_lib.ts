import type { Component, Fctry } from "../dts/factory.d.ts";
import { configReader } from "../lib/config_reader.ts";
import { vueLogger } from "../lib/vue_logger.ts";
import { assertEquals, assertNotEquals } from "../lib/deps.ts";

// configReader tests:
Deno.test({
  name: "configReader returns object with valid props",

  async fn(): Promise<void> {
    const config: Fctry.Config | unknown = await configReader();
    assertNotEquals((config as Fctry.Config), undefined);
    assertEquals((config as Fctry.Config).vue, 3);
    assertEquals((config as Fctry.Config).entry, "../../example/test_demo/");
    assertEquals((config as Fctry.Config).root, "App");
    assertNotEquals((config as Fctry.Config).options, undefined);
    assertEquals(
      (config as Fctry.Config).options?.title,
      "benchmark test project",
    );
  },
});

// vueLogger tests:
const component = <Component> { label: "TestRoot", name: "test-root" };

Deno.test({
  name: "vueLogger returns object with valid props for Vue2",

  fn(): void {
    const V2: Fctry.Vue = vueLogger(
      2 as Fctry.Version,
      component,
      "label",
    );

    assertNotEquals((V2 as Fctry.Vue), undefined);

    const dep = "import Vue from ";
    assertEquals((V2 as Fctry.Vue).dep, dep);

    const mount = `\nTestRoot.$mount("#test-root")`;
    assertEquals((V2 as Fctry.Vue).mount, mount);
  },
});

Deno.test({
  name: "vueLogger returns object with valid props for Vue3",

  fn(): void {
    const V3: Fctry.Vue = vueLogger(
      3 as Fctry.Version,
      component,
      "label",
    );

    assertNotEquals((V3 as Fctry.Vue), undefined);

    const dep = "import * as Vue from ";
    assertEquals((V3 as Fctry.Vue).dep, dep);

    const mount = `\nlabel.mount("#test-root")`;
    assertEquals((V3 as Fctry.Vue).mount, mount);
  },
});
