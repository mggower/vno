import Config from "./strategies/config.ts";
import Storage from "./strategies/storage.ts";

const demo = new (Config as any)();

await demo.config({
  label: "App",
  entry: "../example",
});



// console.log("storage in DEMO", Storage);
