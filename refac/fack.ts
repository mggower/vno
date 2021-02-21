import Factory from "../core/factory/Factory.ts";

const vno = new Factory();
// await vno.init();
// console.log(vno.config?.vue);
await vno.build();