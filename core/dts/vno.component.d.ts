import ComponentClass from "../factory/Component.ts";
import { Tag, Storage, Queue } from "./type.vno.d.ts";

export type Component = ComponentClass;
export type ComponentList = Component[];
export interface ComponentContainer {
  [key: string]: Component;
}

export enum ComponentType {
  Primitive = "PRIMITIVE",
  Composite = "COMPOSITE",
}

export interface RawData {
  template: Tag;
  styles: Tag[];
  script: Tag;
}
interface Template {
  template: string;
}
interface Script {
  script: string;
}
interface Styles {
  styles: string;
}
interface Middlecode {
  script: string;
}
interface Instance {
  instance: string;
}

type Empty = Record<string, unknown>;
type PhaseOne = Empty & Script;
type PhaseTwo = PhaseOne & Template;
type PhaseThree = PhaseTwo & Styles;
type PhaseFour = PhaseThree & Middlecode | PhaseTwo & Middlecode;
type Final = PhaseFour & Instance | PhaseThree & Instance | PhaseTwo & Instance;

export type ParsedData =
  | Empty
  | PhaseOne
  | PhaseTwo
  | PhaseThree
  | PhaseFour
  | Final;

export interface ParseSelf {
  (storage: Storage, queue: Queue): Promise<void>;
}