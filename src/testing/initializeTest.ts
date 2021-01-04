import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertNotMatch,
  assertStringIncludes,
  assertThrows,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";

import { Storage } from "../lib/utils.ts";
import Initialize from "../strategies/initialize.ts";

const vno = new (Initialize as any)();

Deno.test({
  name: "vno runs config method",
  async fn(): Promise<void> {
    await vno.config({
      root: "App",
      entry: "./test-app",
    });
    assert(Storage);
  },
});

Deno.test({
  name: "Throws correct error if no root given",
  fn(): void {
    assertThrows(
      vno.config({
        root: "App",
        entry: "./test-app",
      }),
      Error,
      "an entry path is required inside of your config method",
    );
  },
});
