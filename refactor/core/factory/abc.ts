import Component from './Component.ts';
import Composite from './Composite.ts';

const primy = new Component("Primy", "./Primy.vue");
const daddy = new Composite(primy);

console.log(primy)
console.log(daddy)