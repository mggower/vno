/**
 * 
 * i built this to try to link a css page to the html being served via ssr
 * i think it's maybe not so useful, but the logic is sound i just can't
 * get the import right, and i think it's likely becuase of deno...
 * 
 */

import vno from "./strategies/parser.ts";
import { ensureFile } from "https://deno.land/std@0.80.0/fs/mod.ts";

const root = {
  label: "App",
  path: vno.locate("./App.vue"),
};

const help = await vno.parse(root);
const appObj: any = help.filter((obj: any) => obj.name === "App")[0];

const style = appObj.style;

await ensureFile("./bonusCSS.css");
await Deno.writeTextFile("./bonusCSS.css", style);

//it seems as if Deno can't import CSS files directly yet -- so i'm not
//sure how that impacts our thoughts on doing a global CSS file ?
//that doesn't track with what i remember seeing -- but from what i've
//read on the internet tonight, CSS support is forthcoming...?
