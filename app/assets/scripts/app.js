var Person = require('./modules/person');
var $ = require('jquery');

var john = new Person("John", "Doe")
john.greet();

var jane = new Person("Jane", "Doe");
jane.greet();
