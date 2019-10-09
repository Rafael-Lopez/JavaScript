// Global app controller

//To import one thing
import str from './models/Search';

//First way to do multiple imports
import {add, multiply, ID} from './views/searchView';
console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3,5)}. ${str}`);

//Second way to do multiple imports
//import {add as a, multiply as m, ID} from './views/searchView';
//console.log(`Using imported functions! ${a(ID, 2)} and ${m(3,5)}. ${str}`);

//Third way to do multiple imports
//import * as searchView from './views/searchView';
//console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);
