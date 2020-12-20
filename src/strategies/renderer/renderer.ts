import Renderer from './stringify.ts';
import { _HTML } from '../../lib/defaults.ts';
import { ComponentInterface } from "../../lib/types.ts";

Renderer.prototype.createRenderer = async function (
  obj: object,
  route: ComponentInterface | null,
) {
  this.html = this.htmlStringify(
    { ..._HTML, ...obj },
    route && route,
  );
  return this.html;
};

export default Renderer;
