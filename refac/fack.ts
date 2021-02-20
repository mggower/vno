import Factory from '../core/factory/Factory.ts';

const vno = new Factory({
  root: "App",
  entry: "./"
})

vno.build();
