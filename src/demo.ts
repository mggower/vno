import Initialize from "./strategies/initialize/initialize.ts";

const demo = new (Initialize as any)();

await demo.config({
  root: "App",
  entry: "../example",
});
