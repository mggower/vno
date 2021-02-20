import type {
  Component,
  Options,
  ParsedData,
  Storage,
} from "../dts/type.vno.d.ts";

export function isValidOptions(obj: unknown): obj is Options {
  return obj !== null &&
    typeof (obj as Options).entry === "string" &&
    typeof (obj as Options).root === "string";
}

export function checkVueCDN(obj: unknown): obj is Options {
  return typeof (obj as Options).vue === "string";
}

export function isStorageReady(obj: unknown): obj is Storage {
  return typeof (obj as Storage).root !== undefined &&
    typeof (obj as Storage).vue === "string";
}

export function hasValidInstance(obj: unknown): obj is Component {
  return obj !== null &&
    typeof (obj as Component).instance === "string";
}


