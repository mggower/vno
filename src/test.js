console.log("before");

/*
reading file 'readTextFile' allows us to read and write in plain english
"readFile --> gives us UNICODE Characters" X X X
*/

const data = await Deno.readTextFile("./HeyGirl.vue");
console.log("data", data);
const tRegex = /<\W*template>/gm;
const template = data.split(tRegex)[1].split(/\n/).join("");
// template.replace(/n/gm, '');
// template.trim();
// const pls = template;
// console.log(pls);
console.log("template ->", template);
console.log("typeof template ->", typeof template);

const scrRegex = /<\W*script>/gm;
const script = data.split(scrRegex)[1];

console.log("script ->", script);
console.log("typeof script ->", typeof script);

const styRegex = /<\W*style>/gm;
const style = data.split(styRegex)[1];

console.log("style ->", style);
console.log("typeof style ->", typeof style);

const object = {
  template,
  script,
  style,
};
console.log("object", object);

/* mkdir and write to new file

make directory if 'vno-build' does not exits
this is where all of our build files will go
*/
// const app = 'thisBadBoy';
// // we'll use syntax like this to populate our files with the correct syntax
// const output = `const ${app}  = Vue.component('${app}', {
//   template: "${template}",
//   ${script}
// })`;
/*
copy and write content from .Vue file into a new doc
*/
// await Deno.mkdir('vno-build');
// await Deno.writeTextFile('./vno-build/Output.js', output, { create: true });
// console.log('File data:', data);
