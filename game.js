$(document).ready(function () { //jQuery function that lets you define anonymous functions in line. Runs as soon as it loads.
    // Simulation Variables
    // Config

    //Hide the baking area until game begins
    $("#bakingArea").hide();
    $("#replay").hide();

    //Create an array to store ingredients 
    var mixingBowl = [];

    //Variable to store the baking result
    var bakingResult;

    // In this version, you create new states like this
    // States are created as new objects, and take four parameters. first is a string name
    var state1 = new State("Begin",
        function () { 
            //initialize game
            //Create an array to store ingredients 
            mixingBowl = [];

            //Variable to store the baking result
            bakingResult = "";
        },
        function () { // third is the update function
            console.log("state1 has only an update function");
            machine.change(state2);
        },
        function () {
            console.log("exiting state 1");
        } // fourth is the exit function
    );

    //This is a state class that requires 4 things: Each state requires a name, a function it runs when entering the state, the update function is what changes it to the other state, and the exit function is called when its exiting the state. Enter, update, and exit state functions is probably where I'm adding code 

    var state2 = new State("Flour",
        function () { // You can add functions to states this way
            console.log("Entering State 2");
            $("#bakingArea").show();
            $("#start").hide();
            $("#result").show();
            $("#bowl").show();
            $("#dish").text("");
            $("#ingredient").text("Choose a flour to add to your mixing bowl");
            $("#bttn1").text("All Purpose Flour");
            $("#bttn2").text("Bread Flour");
            $("#bttn3").text("Pastry Flour");
        },
        function () {
            changeToState(state3);
        },
        function () {
            console.log(mixingBowl);
            playGif();
        }
    );
    var state3 = new State("Rising Agent",
        function () {
            console.log("Entering State 3");
            //stopGif();
            $("#ingredient").text("Choose a rising agent to add to your mixing bowl");
            $("#bttn1").text("Yeast");
            $("#bttn2").text("Baking Powder");
            $("#bttn3").text("Baking Soda");
        },
        function () {
            changeToState(state4);
        },
        function () {
            console.log("state3 end");
            playGif();
        }
    );
    var state4 = new State("Baking Temperature",
        function () {
            console.log("Entering State 4");
            $("#ingredient").text("Now choose the baking temperature");
            $("#bttn1").text("400");
            $("#bttn2").text("325");
            $("#bttn3").text("350");
        },
        function () {
            changeToState(state5);
        },
        function () {
            console.log("state 4 end");
            playGif();
        }
    );
    var state5 = new State("Baking Complete",
        function () {
            $("#bakingArea").hide();
            $("#bowl").hide();
            bakeItem();
            $("#dish").text("Baking Complete... " + bakingResult);
            $("#replay").show();
        },
        function () {

        },
        function () {
            console.log("state 5 end");
        }
    );

    var changeToState = function (state) {
        machine.change(state);
    }

    // To start the StateMachine, just create a new state object and
    // pass it the initial state, like so
    var machine = new StateMachine(state1);

    //Function to determine what item was baked
    function bakeItem() {
        if (mixingBowl[0] == "All Purpose Flour" && mixingBowl[1] == "Baking Powder" && mixingBowl[2] == "325") {
            bakingResult = "You made Cake!";
            $("#cake").show();
        } 
        else if (mixingBowl[0] == "Bread Flour" && mixingBowl[1] == "Yeast" && mixingBowl[2] == "400") {
            bakingResult = "You made Bread!";
            $("#bread").show();
        } 
        else if (mixingBowl[0] == "Pastry Flour" && mixingBowl[1] == "Baking Soda" && mixingBowl[2] == "350") {
            bakingResult = "You made Cookies!";
            $("#cookie").show();
        }
        //If you have the right ingredients but use too high a temperature your cake will burn
        else if (mixingBowl[0] == "All Purpose Flour" && mixingBowl[1] == "Baking Powder" && mixingBowl[2] == "400") {
            bakingResult = "You burnt your cake!";
            //Use the code below to add a pun for a scenario
            $("#pun").text("It's your birthday you can cry if you want to.");
            $("#fail").show();
        }
        //If you forgot yeast in the bread flow it wont rise
        else if (mixingBowl[0] == "Bread Flour" && (mixingBowl[1] == "Baking Powder" || mixingBowl[1] == "Baking Soda") && mixingBowl[2] == "400") {
            bakingResult = "Your bread didn't rise!";
            $("#fail").show();
        }
        //any other fail scenarios
        else {
            bakingResult = "Fail";
            $("#fail").show();
        }
    }
    
    function playGif(){
        var src = $("#bowl").attr("src");
        $("#bowl").attr("src", src.replace(/\.png$/i, ".gif"));
    }
    
    function stopGif(){
        var src = $("#bowl").attr("src");
          $("#bowl").attr("src", src.replace(/\.gif$/i, ".png"));
    }

    // when the button is clicked, update the state machine
    $("#bttn").click(function () {
        machine.update();
        $('#output').text("Your Mixing Bowl: ");
    });
    
    $("#bttn-replay").click(function () {
        $("#bakingArea").hide();
        $("#replay").hide();
        $("#result").hide();
        $("#start").show();
        $("img").hide();
        stopGif();
        machine.change(state1);
        machine.update();
    });

    //Update the mixing bowl with the ingredient corresponding to button 1
    $("#bttn1").click(function () {
        if (machine.currentState.name == "Flour") {
            mixingBowl[0] = "All Purpose Flour";
        } else if (machine.currentState.name == "Rising Agent") {
            mixingBowl[1] = "Yeast";
        } else if (machine.currentState.name == "Baking Temperature") {
            mixingBowl[2] = "400";
        }
        machine.update();
        $('#output').text("Your Mixing Bowl:" + mixingBowl);
        //$('#bttn1').toggleClass('ld ld-slide-ttb paused');
    });

    //Update the mixing bowl with the ingredient corresponding to button 2
    $("#bttn2").click(function () {
        if (machine.currentState.name == "Flour") {
            mixingBowl[0] = "Bread Flour";
        } else if (machine.currentState.name == "Rising Agent") {
            mixingBowl[1] = "Baking Powder";
        } else if (machine.currentState.name == "Baking Temperature") {
            mixingBowl[2] = "325";
        }
        machine.update();
        $('#output').text("Your Mixing Bowl:" + mixingBowl);
    });

    //Update the mixing bowl with the ingredient corresponding to button 3
    $("#bttn3").click(function () {
        if (machine.currentState.name == "Flour") {
            mixingBowl[0] = "Pastry Flour";
        } else if (machine.currentState.name == "Rising Agent") {
            mixingBowl[1] = "Baking Soda";
        } else if (machine.currentState.name == "Baking Temperature") {
            mixingBowl[2] = "350";
        }
        machine.update();
        $('#output').text("Your Mixing Bowl:" + mixingBowl);
    });
});
