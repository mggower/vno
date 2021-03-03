import type { Component, Config, Vue } from "../dts/factory.d.ts";
import { configReader } from "../lib/config_reader.ts";
import { vueLogger } from "../lib/vue_logger.ts";
import { assertEquals, assertNotEquals } from "../utils/deps.ts";

// configReader tests:
Deno.test({
  name: "configReader returns object with valid props",

  async fn(): Promise<void> {
    await Deno.writeTextFile(
      "./vno.config.json",
      JSON.stringify({
        "root": "App",
        "entry": "../../example/test_demo/",
        "vue": 3,
        "options": {
          "title": "benchmark test project",
        },
      }),
    );

    const config: Config | unknown = await configReader();
    assertNotEquals((config as Config), undefined);
    assertEquals((config as Config).vue, 3);
    assertEquals((config as Config).entry, "../../example/test_demo/");
    assertEquals((config as Config).root, "App");
    assertNotEquals((config as Config).options, undefined);
    assertEquals(
      (config as Config).options?.title,
      "benchmark test project",
    );

    await Deno.remove("./vno.config.json");
  },
});

// vueLogger tests:
const component = <Component> { label: "TestRoot", name: "test-root" };

Deno.test({
  name: "vueLogger returns object with valid props for Vue2",

  fn(): void {
    const V2: Vue.State = vueLogger(
      2 as Vue.Version,
      component,
      "label",
    );

    assertNotEquals((V2 as Vue.State), undefined);

    const dep = "import Vue from ";
    assertEquals((V2 as Vue.State).dep, dep);

    const mount = `\nTestRoot.$mount("#test-root")`;
    assertEquals((V2 as Vue.State).mount, mount);
  },
});

Deno.test({
  name: "vueLogger returns object with valid props for Vue3",

  fn(): void {
    const V3: Vue.State = vueLogger(
      3 as Vue.Version,
      component,
      "label",
    );

    assertNotEquals((V3 as Vue.State), undefined);

    const dep = "import * as Vue from ";
    assertEquals((V3 as Vue.State).dep, dep);

    const mount = `\nlabel.mount("#test-root")`;
    assertEquals((V3 as Vue.State).mount, mount);
  },
});
