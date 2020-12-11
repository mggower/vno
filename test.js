console.log('before');

/*
reading file 'readTextFile' allows us to read and write in plain english
"readFile --> gives us UNICODE Characters" X X X
*/

//read data
const data = await Deno.readTextFile('./App.vue');
// data.split(/\n/).join('')
console.log('data', data);
const tRegex = /<\W*template>/gm;
const template = data.split(tRegex)[1].split(/\n/).join('');

// console.log('template ->', template);
// console.log('typeof template ->', typeof template);

const scrRegex = /<\W*script>/gm;
let script = data.split(scrRegex)[1].split(/\n/).join('');
const imp = script.split('export')[0];
// const scriptFinal = script.split('export default')[1];

const start = data.indexOf('{') + 1;
let end = data.indexOf('</script>') - 1;
console.log('NEWdata[end]', data[end - 1]);
if (data[end - 1] === ';') {
  console.log('semi-kween');
  end -= 1;
}

const scriptBody = data.slice(start, end);
console.log(scriptBody);

// console.log('DATA[end]', scriptBody);
// console.log('IMP', imp);
// const expIndex = imp.indexOf('export');
// console.log('expIndex ---->', expIndex);
// const impList = imp.slice(0, expIndex).join(' ');
// console.log(impList);
// script.splice(expIndex + 1);

// console.log('script ->', scriptFinal);
// console.log('typeof script ->', typeof script);

const styRegex = /<\W*style>/gm;
const style = data.split(styRegex)[1];

// console.log('style ->', style);
// console.log('typeof style ->', typeof style);

// const object = {
//   template,
//   script: scriptBody,
//   style,
// };
// console.log('object', object);

/* mkdir and write to new file

make directory if 'vno-build' does not exits
this is where all of our build files will go
*/
const app = 'thisBadBoy';
// we'll use syntax like this to populate our files with the correct syntax
const output = `${imp}
  const ${app} = Vue.component('${app}', {
  template: "${template}",
  ${scriptBody})`;
/*
copy and write content from .Vue file into a new doc
*/
await Deno.mkdir('vno-build');
await Deno.writeTextFile('./vno-build/Output.js', output, { create: true });
// console.log('File data:', data);
