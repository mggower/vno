import { Component, RootType, StorageType } from "../lib/newtypes.ts";

class Storage {
  public root: RootType;
  public contents: StorageType;

  constructor(options: Options) {
    if (isValidOptions(options) === false) {
      throw new TypeError("recieved incorrect options");
    }
    
    this.root = null;
    this.contents = {} as Storage;
  }


}
