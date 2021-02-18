import { Parsed, Options } from '../lib/newtypes.ts';

export function isValidOptions(obj: unknown): obj is Options {
  return obj !== null &&
    typeof (obj as Options).entry === "string" &&
    typeof (obj as Options).root === "string";
}

export function hasValidInstance(obj: unknown): obj is Parsed {
  return obj !== null &&
    typeof (obj as Parsed).instance === "string"
}
