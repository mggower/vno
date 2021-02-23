import type { Component, Fctry, Storage } from "../dts/factory.d.ts";

export function isValidOptions(obj: unknown): obj is Fctry.Config {
  return obj !== null &&
    typeof (obj as Fctry.Config).entry === "string" &&
    typeof (obj as Fctry.Config).root === "string";
}

export function checkVueVersion(obj: unknown): obj is Fctry.Config {
  return (obj as Fctry.Config).vue != null &&
      (obj as Fctry.Config).vue === 2 ||
    (obj as Fctry.Config).vue === 3;
}

export function isStorageReady(obj: unknown): obj is Storage {
  return obj != null &&
    typeof (obj as Storage).root !== undefined;
}

export function hasValidInstance(obj: unknown): obj is Component {
  return obj !== null &&
    typeof (obj as Component).parsed_data.instance === "string";
}
