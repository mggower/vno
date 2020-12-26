import { Handlebars } from "../../../lib/deps.ts";

const hbs = new Handlebars({
  baseDir: "views",
  extname: ".hbs",
  layoutsDir: "layouts/",
  partialsDir: "",
  defaultLayout: "main",
  helpers: undefined,
  compilerOptions: undefined,
});

export default hbs;