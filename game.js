$(document).ready(function() { //jQuery function that lets you define anonymous functions in line. Runs as soon as it loads.
  // Simulation Variables
  // Config

  // In this version, you create new states like this
  // States are created as new objects, and take four parameters. first is a string name
  var state1 = new State("Begin",
    null,  // The second is the enter function
    function() { // third is the update function
      console.log("state1 has only an update function");
      machine.change(state2);
    },
    null // fourth is the exit function
  );
    
    //This is a state class that requires 4 things: Each state requires a name, a function it runs when entering the state, the update function is what changes it to the other state, and the exit function is called when its exiting the state. Enter, update, and exit state functions is probably where I'm adding code 
    
  var state2 = new State("Flour",
    function () {  // You can add functions to states this way
      console.log("state2 has enter and no exit function");
    },
    function() {
      changeToState(state3);
    },
    null
  );
  var state3 = new State("Rising Agent",
    null,
    function() {
      changeToState(state4);
    },
    function () {
      console.log("state3 has exit and no enter function");
    }
  );
  var state4 = new State("Baking Temperature",
    null,
    function() {
      changeToState(state5);
    },
    function () {
      console.log("state3 has exit and no enter function");
    }
  );
  var state5 = new State("Baking Complete",
    null,
    function() {
      $('#output').text("Baking Complete");
    },
    function () {
      console.log("state3 has exit and no enter function");
    }
  );

  var changeToState = function (state) {
    machine.change(state);
  }

  // To start the StateMachine, just create a new state object and
  // pass it the initial state, like so
  var machine = new StateMachine(state1);

  // when the button is clicked, update the state machine
  $("#bttn").click(function() {
    machine.update();
    $('#output').text(machine.currentState.name+" "+machine.timeStep);
  });
});
