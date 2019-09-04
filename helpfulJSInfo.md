// HELPFUL JS INFO:

//-----------------------------------------------
// JS NOTES:

  Hoisting:

    All vars and functions declared in a scope are hoisted to the top of that scope.
    However, for vars, the var name is what is hoisted, not it's value. Its value is
    defined during runtime just like anonymous functions. So this would work:
      a = 10;
      var a;
    But this would not work:
      console.log(a); //will console log undefined since only the var name 'a' is hoisted
      var a = 10;

    This scenario demonstrates the hoisted variable name and not value.
        a = 10;
        console.log(a); //prints 10
        var a = 12;
        console.log(a); //prints 12


//-----------------------------------------------
// ES6 (ECMASript 2015)

  //---------------------------------------------
  let and const:

    Use these to tightly control the scope in which variables will be use in.
    Something to note, these do NOT GET HOISTED like var does. Therefore, be careful
    in placing them at the beginning of a scope.

  //---------------------------------------------
  import vs require:

  Import and export default or export is ES6 syntax. Require and module.exports = ___ is Common JS.

  React uses import and export because it also uses ES6 syntax for 'class app extends Component' where class is an ES6 declaration.

  Both import and require can be used in the front-end where the JS engine is the browser. Using import would require transpilation to ensure all browsers can use it.

  On the backend, NOT ALL VERSIONS OF NODE WORK WITH IMPORT since ES6 is still being implemented. However, the ES6 can be transpiled and then it will work with the Node runtime environment. Otherwise, this will not work in Node v 6.11.4 but it may work in 9.5.0 as it is an experimental feature:

    import  { helper1 as HelperModule } from ('./helpers/helper1.js');
    HelperModule();

    and you must use:

    const HelperModule = require('./helpers/helper1.js');
    HelperModule();

    and the module must use module.exports = ___

  https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c
  https://nodejs.org/api/esm.html#esm_notable_differences_between_import_and_require

  //---------------------------------------------
  class in ES6:

  Background info on classes:

    The 'new' keyword will add 2 lines when an instance of a class is created:

    function Class () {
    =>this = Object.create(Class); //Object.create makes Class the parent constructor of Class
      this.prop1 = 'a';
      this.method1 = 'b';
    =>return this;  //every new instance of Class creates a closure scope between the {}
    }

    let x = new Class() //x delegates to its parent, Class, and Class is the only one with access to the
    //variables declared inside its closure scope

  Prior to ES6, a class was created by:

  function Class (input) {
    this.prop1 = input;
    this.method1 = function () {};  //these are properties of the class that can't be changed or added to after construction (see the background info about classes above for why this is)

    //WITHIN the constructor and ONLY WITHIN the constructor, can create a closure scope for variables and
    //create methods that access them. This is because methods on the Prototype are not defined within the
    //scope (within the {}) of the Class. Thus, they do not have access to that execution context.
    //Methods on the prototype only have access to the Class's properties (this.__property__) because they
    //are publicly accessible once a function is created.

    //Therefore, for closure scopes and methods to manipulate them, you need to define both the method and the
    //variable within the same scope (i.e., brackets {});
    let counter = 0;
    this.updateCounter = function () {return ++counter; };

    //Without creating a closure scope, you can create variables that are set once and never editable
    //again using the const declaration.
    //So use closures for values you want to edit but close off.
    //Use const for values you set and forget.
    const variableThatIsSetOnce = input;
  }

  //Note: the benefit of placing methods or properties onto the prototype of the class is that
  //these methods will only be created once in Heap Memory and will not be recreated
  //each time a new Class instance is create unlike all properties of the class.
  Class.prototype.method2 = function () {}; //these methods get added to the __proto__ = prototype
  Class.prototype.oneTimeDeclaredProperty = 'fixedVariable for all instances of the class';

  //-----------------------
  The format of a class constructor in ES6:

  class A {
    constructor( __input params when creating class__ ) {
      let counter = 0;  //this is a variable that only exists in this scope (closure) and can be modified by methods

      //This is where you declare properties of the class.
      this.prop1 = input;
      this.method1 = function () {};
    }

    //This is where you declare methods of the class. All of these methods
    //are shown on __proto__ meaning they are on the class's prototype just like when
    //you say A.prototype.newMethod = ___ when creating a class using the
    //'function' constructor adds the method to the class's __proto__.
    method2 () {

    }

    //ES6 CLASSES CAN ONLY CONTAIN METHOD DEFINITIONS, NOT PROPERTY definitions.
    //https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes
    Therefore, you can't specify a property to be located onto the prototype through the class constructor.
    You would have to do it outside of the constructor the typical function method of instatiation:

      => Class.prototype.prop = 10;

    You can only refer to an instance's properties via the constructor function:

      => this.prop = 10;

  }
  //---------------------------------------------
  // When to Subclass:

  Subclassing is useful for DRY coding ettiquette. You can use it so the parent class is the superset
  of properties and methods and the subclass is a more custom set of methods and properties. This
  implies that the methods of the subclass will have access to the properties of the parent class

  //---------------------------------------------
  // Subclasses in ES6:

  class Subclass extends Class {
    constructor() {
      super();
      this.subclassprop1 = 'hello';
      this.state = {

      };
    }
  }



//-----------------------------------------------
// VPN:


//-----------------------------------------------
// MQTT:
  It is pub/sub messaging protocol that works ontop of TCP/IP.


//-----------------------------------------------
// Promises:

  Promises are about making asynchronous code retain most of the lost properties of synchronous code such as flat indentation and one exception channel.

  run: npm install bluebird

  add: const Promise = require("bluebird");




//-----------------------------------------------
// Error Handling:

  The goal of error handling is to keep the program running (i.e., don't throw runtime errors which will stop
  the program. Therefore, you want to acknowledge the error and either prompt the user for a different input,
  or throw a flag and move the user to a different state.

  How to determine what action to take as a result of an error is ask:

  'Can this be corrected by the User or Admin? Can it be ignored?'
    - This dictates how the error should be handled.
  'What to show the User while it is being handled asynchronously?'
    - This will lead to determining what steps to take in parallel while the issue is being resolved.

  //On Promises:
    use the .catch(err => {})

  //Using a Try Catch block to handle any runtime errors for any piece of code.
  try {
    console.log( ___error prone reference that will throw runtime error___ ); // ReferenceError
  } catch (err) {
    // pass
  }

  //For invalid input or functions/methods that have the potential to be invalid and throw a runtime error:

    Use a conditional and Error object:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

    methodA...
    if (!(input === 'valid') throw Error(/*message*/ 'Invalid input') OR throw new Error(/*message*/);

    OR

    if (!(input === 'valid') {
      throw Error(/*message*/ 'Invalid input') OR throw new Error(/*message*/);
    }

      //note this Error object contains extra properties:
        0) Error.name => it will show the type of error thrown if not by you.
        1) Error.message => the message you define in the Error object.
        2) Error.filename => the filename where line of code is
        3) Error.lineNumber => line number of the error

    This will throw the error until it reaches a catch block:

    try{
      methodA();
    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log(err.filename);
      console.log(err.lineNumber);
    }


//-----------------------------------------------
// DESIGN:

- All interfaces with the User should be one component.
- The Actions (function executions) that result from User request or state change in the interface should
be in the interface if the result manipulates interface state. Otherwise it should be in a separate component
if it impacts components that can exist without the interface.


// FUNCTIONAL PROGRAMMING:

https: //medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0

Functional programming means constructing code using functions to display what you are doing.

Those functions are:
- Pure functions
- Use function composition (Function composition is the process of combining two or more functions in order to produce a new function or perform some computation such as chaining function using f1.f2 or .map().reduce())
- Avoid shared state (don't share state between the scope that calls it and the internal scope of the function)
- Avoid mutating state (use copies of key variables to avoid mutating the state of an object that may be used by other parts of the function and expect it to be in the state it left it at)
- Avoid side effects (they do only the one thing which is stated in the function name)

note: const does not prevent mutation of objects, it only prevents mutation of primitive values.

Functional programming's requirements allow you to decouple and detangle the overlap between interfaces in code.
It also abstracts the computation as much as possible so that the computation reads like a sentence and doesn't
require you to think through what the logic is doing.

ex: Functional Programming Way (shows WHAT is going on at a more abstract, sentence, level):
      const totalOutput = programmerOutput
        .map(output => output.linesOfCode)
        .reduce((totalLines, lines) => totalLines + lines);

    Imperative Programming Way (shows HOW something is happening in code):
      for (let i = 0; i < programmerOutput.length; i++) {
        totalOutput += programmerOutput[i].linesOfCode;
      }

Functional programming forces you to abstract away all the complexity into small, one function functions
by making it difficult to not have your code look like a sentence if you don't keep abstracting your code
to smaller chunks that are single sentence describable.

//-----------------
// VARIABLE NAMING:

    use the _ when naming private variables
        _privateVariable = #;

    use CAPS when naming constants that are IMPORTANT to the code for others to easily identify it is a constant
    rather than having to look at the variable declaration to see if it is a constant or not.

