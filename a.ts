interface Base {
  one: number;
  two: number;
}

class Component implements Base {
  constructor(public one: number, public two: number) {
    this.one = one;
    this.two = two;
  }

}

interface IComp extends Base {
  three: number;
}

class Composite extends Component implements IComp {
  constructor(a: Component, public three: number) {
    super(a.one, a.two);
    this.one = a.one;
    this.two = a.two;
    this.three = three;
  }
}

function setAsComposite<CType extends Component>(
  co: new (a: Component, three: number) => CType,
  a: Component,
  thr: number,
): CType {
  return new co(a, thr);
}

const a = new Component(1, 2);
// const b = setAsComposite(Composite, a, 3);
const b = new Composite(a, 3);
console.log(b);
console.log(a);
