import { Fctry } from "../dts/factory.d.ts";
import { fs, path } from "../utils/deps.ts";
import { checkVueVersion } from "../utils/type_gaurds.ts";

const configPath = path.join(Deno.cwd(), "./vno.config.json");

function configExists() {
  if (fs.existsSync(configPath)) return true;
  throw new Error(
    "vno requires a config file or options argument for Factory class",
  );
}

export async function configReader(): Promise<Fctry.Config> {
  configExists();

  const json = await Deno.readTextFile(configPath);
  const res = JSON.parse(json);
  const config = checkVueVersion(res) ? res : { ...res, vue: 2 };
  return config as Fctry.Config;
}
