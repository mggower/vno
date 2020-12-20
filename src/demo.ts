import Config from "./strategies/config/config.ts";

const demo = new (Config as any)();

await demo.config({
  label: "App",
  entry: "../example",
});
