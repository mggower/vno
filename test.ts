import * as path from "https://deno.land/std/path/mod.ts";

const mod = await fetch("http://deno.land/x/vno/dist/mod.ts");
const regex = /\/x\/vno@(.*)\/dist/gi;
const version = regex.exec(mod.url)?.[1];
console.log(version);

