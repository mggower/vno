import { App, Factory } from "./interfaces.ts";

export function isValidOptions(obj: unknown): obj is Factory.Options {
  return obj !== null &&
    typeof (obj as Factory.Options).entry === "string" &&
    typeof (obj as Factory.Options).root === "string";
}

export function checkVueCDN(obj: unknown): obj is Factory.Options {
  return typeof (obj as Factory.Options).vue !== undefined;  
}

export function isStorageReady(obj: unknown): obj is Factory.Storage {
  return typeof (obj as Factory.Storage).root !== undefined &&
    typeof (obj as Factory.Storage).vue === 'string';
}

export function hasValidInstance(obj: unknown): obj is App.Component {
  return obj !== null &&
    typeof (obj as App.Component).instance === "string"
}
