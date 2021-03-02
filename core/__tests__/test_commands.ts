import { assertEquals, fs } from "../lib/deps.ts";
import { create, build, run } from "../cli/commands.ts";


Deno.test({
  name: "\n\ntesting success of create command\n",
  fn(): void {
    assertEquals(fs.existsSync("./cli-test"), true);
  },
});
