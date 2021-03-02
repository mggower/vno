import * as parse from "../lib/parser.ts";
import Component from "../factory/Component.ts";
import Storage from "../factory/Storage.ts";
import Queue from "../factory/Queue.ts";
import { assertEquals, assertNotEquals, path } from "../utils/deps.ts";
import { patterns } from "../utils/constants.ts";
import { yellow } from "../cli/fns.ts";

const testRoot = new Component("Test", path.join(Deno.cwd(), "./core/__tests__/test-components/Test.vue"));
const testChild = new Component("TestChild", path.join(Deno.cwd(), "./core/__tests__/test-components/TestChild.vue"));

const storage = new Storage();
const queue = new Queue();
storage.root = testRoot;
storage.cache(testChild.label, testChild);

Deno.test({
  name: "\n\nparse.template successfully adds a 'template' property\n",
  fn() {
    parse.template(testRoot);

    yellow("\n>> Component's template has a value && typeof string\n");

    assertNotEquals(testRoot.template, null || undefined);
    assertEquals(typeof testRoot.template, "string");

    yellow(">> Component's template contains not HTML comments\n");

    assertEquals(testRoot.template?.match(patterns.htmlComment), null);

    yellow(">> Component's template contains no carriage returns\n");

    assertEquals(testRoot.template?.indexOf("\r"), -1);
  },
});

Deno.test({
  name: "\n\nparse.script successfully adds a 'script' property\n",
  async fn() {
    await parse.script(testRoot, storage, queue);

    yellow("\n>> Component's script has a value && typeof string\n");

    assertNotEquals(testRoot.script, null || undefined);
    assertEquals(typeof testRoot.script, "string");

    yellow(">> parse.script removes comments\n");
    assertEquals(
      testRoot.script?.match("// this is a javascript comment\n"),
      null,
    );

    yellow(">> parse.script does not remove URLs\n");
    assertNotEquals(
      testRoot.script?.match("http://thisurl.com/will/not/be/deleted"),
      null,
    );

    yellow(">> testRoot has a child reference to its dependant\n");
    assertEquals(
      testRoot.dependants?.head,
      testChild,
    );
  },
});

Deno.test({
  name: "\n\nparse.style successfully adds a 'styles' property\n",
  fn() {
    parse.style(testRoot);

    yellow("\n>> Component's styles has a value && typeof string\n");

    assertNotEquals(testRoot.styles, null || undefined);
    assertEquals(typeof testRoot.styles, "string");

    yellow(">> parse.style removes comments\n");
    assertEquals(
      testRoot.script?.match("some CSS comments"),
      null,
    );

    yellow(">> parse.style detects scss from source\n");
    assertEquals(
      testRoot.style_data[0].lang,
      "scss",
    );
  },
});
