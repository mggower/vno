import {
  bench,
  runBenchmarks,
} from "https://deno.land/std@0.83.0/testing/bench.ts";

import Factory from "../factory/Factory.ts";

const vnoTest = new Factory();

bench({
  name: "completeBundleInitBenchmark",
  runs: 1,
  func(x): void {
    x.start();
    vnoTest.build();
    x.stop();
  },
});

runBenchmarks().then((res) => console.log(res));