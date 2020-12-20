import { ssr } from "../../lib/types.ts";

function Renderer(this: ssr) {
  this.html = "";
}

export default Renderer;