import { join } from "https://deno.land/std@0.74.0/path/mod.ts";

// queue is components to be traversed
const queue: object[] = [];

// cache holds components after they have been parsed
const cache: object[] = [];

interface component {
  name: string;
  path: string;
  template?: string;
  imports?: object[];
  script?: string;
  style?: string;
}

const vno = {
  locate(relative: string) {
    return join(Deno.cwd(), `${relative}`);
  },

  template(data: string, current: component) {
    const tRegex = /<\W*template>/gm;
    const template = data.split(tRegex)[1].split(/\n/).join("");
    current.template = template;
  },

  script(data: string, current: component) {
    const regex = /<\W*script>/;
    let script = data.split(regex)[1].split(/[\n\s]/).join("");

    const start = script.indexOf("{") + 1;
    let end = script.lastIndexOf("}");

    current.script = script.slice(start, end);
  },

  style(data: string, current: component) {
    const styRegex = /<\W*style>/gm;
    const style = data.split(styRegex)[1];
    current.style = style;
  },

  imports(data: string) {
    const lines = data.split(/\n/);

    const regex = /^(import)/;
    const children = lines.filter((element) => regex.test(element));

    children.forEach((item) => {
      const [_, name, __, path] = item.split(" ");
      const component: component = {
        name,
        path: this.locate(path.split(/[`'"]/)[1]),
      };
      if (
        !cache.some((child: any) => child.name === component.name) &&
        !queue.some((child: any) => child.name === component.name)
      ) {
        queue.push(component);
      }
    });
  },

  async traverse() {
  },

  build() {
  },

  async parse(root: component) {
    queue.push(root);

    while (queue.length) {
      const current: any = queue.shift();
      const data = await Deno.readTextFile(current.path);

      // await this.template(data, current);
      await this.script(data, current);
      // await this.style(data, current);
      await this.imports(data);

      cache.push(current);
    }
  },
};

const root = {
  name: "App",
  path: vno.locate("./App.vue"),
};

await vno.parse(root);
console.log("RE$ULTZ --> ", cache);
