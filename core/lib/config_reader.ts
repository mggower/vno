import { Fctry } from "../dts/factory.d.ts";
import { fs, path } from "./deps.ts";

export async function configReader(): Promise<void | Fctry.Config> {
  let configFile;
  for await (const file of fs.walk(Deno.cwd())) {
    const currFile = path.parse(file.path);
    if (currFile.name === "vno.config") {
      configFile = currFile;
    }
  }

  if (configFile) {
    const configPath = `${Deno.cwd()}/${configFile.base}`;
    const json = await Deno.readTextFile(configPath);
    const res = JSON.parse(json);
    res.vue = res.vue ?? 2;
    return res as Fctry.Config;
  }
}
