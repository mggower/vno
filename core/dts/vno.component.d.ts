import ComponentClass from "../factory/Component.ts";

export type Component = ComponentClass;

export interface ComponentContainer {
  [key: string]: Component;
}

export type ComponentList = Component[];