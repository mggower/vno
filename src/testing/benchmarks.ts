import {
  bench,
  runBenchmarks,
} from "https://deno.land/std@0.83.0/testing/bench.ts";
import _$ from "../lib/defaults.ts";
import Initialize from "../strategies/initialize.ts";

const test = new (Initialize as any)();

bench({
  name: "completeBundleInitBenchmark",
  runs: 1,
  func(x): void {
    x.start();
    test.config({ entry: "../../example", root: "App" });
    x.stop();
  },
});

runBenchmarks().then((res) => console.log(res));
