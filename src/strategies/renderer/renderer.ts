import Renderer from './stringify.ts';
import { _HTML } from '../../lib/defaults.ts';
import { component } from "../../lib/types.ts";

Renderer.prototype.createRenderer = async function (
  obj: object,
  route: component | null,
) {
  this.html = this.htmlStringify(
    { ..._HTML, ...obj },
    route && route,
  );
  return this.html;
};

export default Renderer;
