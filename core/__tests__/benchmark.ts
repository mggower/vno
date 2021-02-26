import {
  bench,
  runBenchmarks,
} from "https://deno.land/std@0.83.0/testing/bench.ts";

import Factory from "../factory/Factory.ts";

bench({
  name: "complete vno runtime benchmark",
  runs: 1,
  func(x: { start: () => void; stop: () => void; }): void {
    x.start();
    const vnoTest = new Factory();
    vnoTest.build();
    x.stop();
  },
});

const res = await runBenchmarks();
console.log(res);



/*

// benchmark tests { Feb25, 2021 } with Vno v1.1.1

const results = [ // ms
  1.1306320000003325,
  1.0482279999996535,
  0.9737719999993715,
  1.1142459999991843,
  1.3043730000008509,
  1.0332610000004934,
  3.4674230000000534,
  1.0084569999999076,
  1.0324909999999363,
  1.1479699999999866,
];

// average runtime: 1.326085299999977 ms


*/
