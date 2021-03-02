import { assertEquals, fs } from "../utils/deps.ts";
import { yellow } from "../cli/fns.ts";

Deno.test({
  name: "\n\ntesting success of create command\n",
  fn(): void {
    const args = [
      "create",
      "cli-test",
      "TestApp",
      "8080",
      "TestOne",
      "TestTwo",
      "TestThree",
    ];

    yellow("\n>> project directory was created");
    assertEquals(
      fs.existsSync("./cli-test"),
      true,
    );

    yellow("\n>> root component file was created");
    assertEquals(
      fs.existsSync("./cli-test/TestApp.vue"),
      true,
    );

    yellow("\n>> config file was created");
    assertEquals(
      fs.existsSync("./cli-test/vno.config.json"),
      true,
    );

    const json = Deno.readTextFileSync("./cli-test/vno.config.json");
    const res = JSON.parse(json);

    yellow("\n>> project root labeled in vno.config");
    assertEquals(res.root, args[2]);

    yellow("\n>> server port labeled in vno.config");
    assertEquals(res.options.port, Number(args[3]));

    yellow("\n>> project title in vno.config");
    assertEquals(res.options.title, args[1]);

    yellow("\n>> 1/3 child components created");
    assertEquals(
      fs.existsSync("./cli-test/components/TestOne.vue"),
      true,
    );

    yellow("\n>> 2/3 child components created");
    assertEquals(
      fs.existsSync("./cli-test/components/TestTwo.vue"),
      true,
    );

    yellow("\n>> 3/3 child components created");
    assertEquals(
      fs.existsSync("./cli-test/components/TestThree.vue"),
      true,
    );
  },
});

Deno.test({
  name: "\n\ntesting success of build command\n",
  fn(): void {
    yellow("\n>> vno-build directory exists");
    assertEquals(
      fs.existsSync("./cli-test/vno-build"),
      true,
    );

    yellow("\n>> build.js file compiled");
    assertEquals(
      fs.existsSync("./cli-test/vno-build/build.js"),
      true,
    );

    yellow("\n>> style.css file compiled");
    assertEquals(
      fs.existsSync("./cli-test/vno-build/style.css"),
      true,
    );
  },
});
