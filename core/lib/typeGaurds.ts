import * as type from "./types.ts";

export function isValidOptions(obj: unknown): obj is type.Options {
  return obj !== null &&
    typeof (obj as type.Options).entry === "string" &&
    typeof (obj as type.Options).root === "string";
}

export function checkVueCDN(obj: unknown): obj is type.Options {
  return typeof (obj as type.Options).vue === "string";
}

export function isStorageReady(obj: unknown): obj is type.Storage {
  return typeof (obj as type.Storage).root !== undefined &&
    typeof (obj as type.Storage).vue === "string";
}

export function hasValidInstance(obj: unknown): obj is type.Component {
  return obj !== null &&
    typeof (obj as type.Component).parsed_data?.instance === "string";
}
