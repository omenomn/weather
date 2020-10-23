import Start from './../views/Start.vue';
import Details from './../views/Details.vue';

export default [
  { 
  	path: "/", 
    name: 'start',
  	component: Start 
  },
  { 
  	path: "/details", 
    name: 'details',
  	component: Details 
  },
];
