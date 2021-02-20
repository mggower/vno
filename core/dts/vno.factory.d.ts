import { Component, ComponentContainer } from './vno.component.d.ts';

export interface Storage {
  root: Component;
  app: ComponentContainer;
  vue: string;
  setRoot(component: Component): void;
  setVue(vue: string | undefined): void;
}

export interface Queue {
  components: Component[];
  length: number;
  enqueue(component: Component): void;
  dequeue(): Component | undefined;
  isFilled(): boolean;
}

export interface DepsList {
  head: Component | null;
  tail: Component | null;
  add(component: Component): void;
  scrub(label: string): boolean;
}