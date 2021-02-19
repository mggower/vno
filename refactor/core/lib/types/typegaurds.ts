import { App, Fctry } from "./interfaces.ts";

export function isValidOptions(obj: unknown): obj is Fctry.Options {
  return obj !== null &&
    typeof (obj as Fctry.Options).entry === "string" &&
    typeof (obj as Fctry.Options).root === "string";
}

export function checkVueCDN(obj: unknown): obj is Fctry.Options {
  return typeof (obj as Fctry.Options).vue !== undefined;  
}

export function isStorageReady(obj: unknown): obj is App.Storage {
  return typeof (obj as App.Storage).root !== undefined &&
    typeof (obj as App.Storage).vue === 'string';
}

export function hasValidInstance(obj: unknown): obj is App.Component {
  return obj !== null &&
    typeof (obj as App.Component).parsed_data?.instance === "string"
}
