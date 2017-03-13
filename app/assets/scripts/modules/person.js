function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.greet = function() {
    console.log("Hello " + this.firstName + " " + this.lastName);
  }
}

module.exports = Person;
