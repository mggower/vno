// import Factory from '../core/factory/Factory.ts';

// const vno = new Factory({
//   root: "App",
//   entry: "./"
// })

// vno.build();

import { configReader } from '../core/utils/config.ts';

console.log(await configReader());