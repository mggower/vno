import type {
  Component,
  Options,
  ParsedData,
  Storage,
} from "../dts/type.vno.d.ts";
import { VueCDN } from "./constants.ts";

export function isValidOptions(obj: unknown): obj is Options {
  return obj !== null &&
    typeof (obj as Options).entry === "string" &&
    typeof (obj as Options).root === "string";
}

export function vueLogger(input: Options) {
  switch (input.vue) {
    case 3:
      return VueCDN.Vue3;
    case 2:
      return VueCDN.Vue2;
    default:
      return VueCDN.Vue2;
  }
}

export function isStorageReady(obj: unknown): obj is Storage {
  return obj != null &&
    typeof (obj as Storage).root !== undefined &&
    typeof (obj as Storage).vue === "string";
}

export function hasValidInstance(obj: unknown): obj is Component {
  return obj !== null &&
    typeof (obj as Component).parsed_data.instance === "string";
}

