import { Fctry } from "../dts/factory.d.ts";
import { fs, path } from "../utils/deps.ts";
import { checkVueVersion } from "../utils/type_gaurds.ts";

export async function configReader(): Promise<Fctry.Config> {
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
    const res = JSON.parse(json) as Fctry.Config;
    const config = checkVueVersion(res) ? res : { ...res, vue: 2 };
    return config as Fctry.Config;
  } else {
    throw new Error(
      "vno requires a config file or options argument for Factory class",
    );
  }
}
