const path: string = "./App.vue";
// queue is components to be traversed
const queue: Array<object> = [];
// cache holds components after they have been parsed
const cache: Array<object> = [];

const traverse = async (pathname: string) => {
  const root = await Deno.readTextFile(pathname);
  // console.log("root -->", root);

  const lines = root.split(/\n/);
  // console.log("lines --> ", lines);

  const regex = /^(import)/;
  const imports = lines.filter((n) => regex.test(n));

  // console.log("imports --> ", imports);

  imports.forEach((item) => {
    const arr = item.split(" ");
    const el = arr[1];
    const path = arr[3].split("'")[1];
    const component = { el, path };
    queue.push(component);
  });

  while (queue.length) {
    const current: any = queue.shift();
    console.log(current);
    traverse(current.path);
    cache.push(current);
  }
  // console.log(cache, "cache");
};

traverse(path);
