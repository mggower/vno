import { Component, Storage } from "../dts/factory.d.ts";

export function javascriptCompile(
  curr: Component,
  storage: Storage,
  variable: string,
): string {
  if (!storage) {
    throw new TypeError("invalid arguments");
  }

  let instance;
  if (curr.parsed_data) {
    switch (storage.vue.state) {
      case 3:
        instance = `${curr.middlecode ??
          ""}\nconst ${curr.label} = {\n  template: /* html */ \`${curr.template}\`,\n${curr.script};\n`;

        compileForV3(curr, storage, variable);
        break;
      case 2:
        if (curr === storage.root) {
          instance = `${curr.middlecode ??
            ""}\nconst ${curr.label} = new Vue({\n  template:  /* html */ \`${curr.template}\`,\n${curr.script});\n`;
        } else {
          instance = `${curr.middlecode ??
            ""}\nconst ${curr.label} = Vue.component("${curr.name}", {\n  template:  /* html */ \`${curr.template}\`,\n${curr.script});\n`;
        }
        break;
      default:
        throw new Error("missing a valid Vue dependant");
    }
  }

  if (!instance) throw new Error("compilation failed");

  curr.instance = instance;
  return instance;
}

export function compileForV3(
  curr: Component,
  storage: Storage,
  variable: string,
): string {
  if (!storage) {
    throw new TypeError("invalid arguments");
  }
  let registration;
  if (curr.parsed_data) {
    if (curr === storage.root) {
      registration = `\nconst ${variable} = Vue.createApp(${curr.label})\n`;
    } else {
      registration = `${variable}.component("${curr.name}", ${curr.label})\n`;
    }
  }

  if (!registration) {
    throw new Error("compilation failed");
  }
  curr.registration = registration;
  return registration;
}
