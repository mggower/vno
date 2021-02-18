import { Factory } from "./interfaces.ts";

export function isValidOptions(obj: unknown): obj is Factory.Options {
  return obj !== null &&
    typeof (obj as Factory.Options).entry === "string" &&
    typeof (obj as Factory.Options).root === "string";
}

export function checkVueCDN(obj: unknown): obj is Factory.Options {
  return typeof (obj as Factory.Options).vue !== undefined;  
}


// export function hasValidInstance(obj: unknown): obj is Parsed {
//   return obj !== null &&
//     typeof (obj as Parsed).instance === "string"
// }
