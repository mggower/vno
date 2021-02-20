import StorageClass from "../factory/Storage.ts";
import QueueClass from "../factory/Queue.ts";
import DepsListClass from "../factory/DepsList.ts";

export type Storage = StorageClass;
export type Queue = QueueClass;
export type DepsList = DepsListClass;

interface OptionsBase {
  entry: string;
  root: string;
}
interface OptionsVue {
  vue: string;
}
interface OptionsTerminal {
  terminal: boolean;
}

export type Options =
  | OptionsBase & OptionsVue & OptionsTerminal
  | OptionsBase & OptionsTerminal
  | OptionsBase & OptionsVue
  | OptionsBase;
