import vno from '../deps.ts';

const demo = vno.parse({
  label: 'App.vue',
  path: vno.locate('./App.vue'),
});

console.log(demo);
