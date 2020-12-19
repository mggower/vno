import { component } from "./types.ts";

interface storage {
  [key: string]: component;
 
}
interface StorageConstructor {};

const Storage = function (this: storage): storage {
};
