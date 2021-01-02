import vno from "../src/dist/mod.ts";

vno.config({
  root: "App",
  entry: "../../example/",
});

console.log(Deno.cwd());
console.log("i love u honey");
