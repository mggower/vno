import { _ } from "./src/lib/deps.ts";

const log = _.replace(
  '<div class="yummy">    i     love   you    food    yummy    tummy    </div>',
  "  ",
  " ",
);

console.log(log);


