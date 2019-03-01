$(document).ready(function() {
  // Simulation Variables
  // Config

  // In this version, you create new states like this
  // States are created as new objects, and take four parameters. first is a string name
  var state1 = new State("First",
    null,  // The second is the enter function
    function() { // third is the update function
      console.log("state1 has only an update function");
      machine.change(state2);
    },
    null // fourth is the exit function
  );
  var state2 = new State("Second",
    function () {  // You can add functions to states this way
      console.log("state2 has enter and no exit function");
    },
    function() {
      changeToState(state3);
    },
    null
  );
  var state3 = new State("Third",
    null,
    function() {
      changeToState(state1);
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
