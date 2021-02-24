import Factory from "../../core/factory/Factory.ts";

const vno = new Factory();
await vno.build();
const App = vno.storage.get("App");

console.log(App);