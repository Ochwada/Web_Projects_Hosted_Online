

/* Create a new array called buttonColours and set it to hold the sequence 
"red", "blue", "green", "yellow".let buttonColor */
let buttonColors = ["red", "blue", "green", "yellow"]

/* create a new empty array called gamePattern, userClickedPattern.*/
let gamePattern = [];
let userClickedPattern = [];

/* You'll need a way to keep track of whether if the game has started or not, so you only call 
nextSequence() on the first keypress. */
let started = false;

//2. Create a new variable called level and start at level 0.
let level = 0;


/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */
/*  detect when a keyboard key has been pressed, when that happens for the first 
time, call nextSequence(). */
$(document).keydown(function () {

    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }

});


/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */

/*  detect when any of the buttons are clicked and trigger a handler function.*/
$(".btn").on("click", function () {

    // In  the handler, create a new variable called userChosenColor to store the
    //id of the button that got clicked.*/

    let userChosenColor = $(this).attr("id");
    // Add the contents of the variable userChosenColor created*/

    userClickedPattern.push(userChosenColor);

    //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColor);
    animetePress(userChosenColor);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);

});

/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */
function playSound(name) {
    /* play the sound for the button color selected */
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

};

/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */

function animetePress(currentColor) {
    let activeButton = $("." + currentColor);

    activeButton.addClass("pressed");
    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);


    /*    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
         $("#" + currentColor).removeClass("pressed");
     }, 100) */
};
/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */
/* Generate a new random number between 0 and 3, and store it in a variable 
called randomNumber */
function nextSequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    /*Create a new variable called randomChosenColor and use the randomNumber 
    from step 2 to select a random color from the buttonColors array */
    let randomChosenColor = buttonColors[randomNumber];

    /* Add the new randomChosenColor generated to the end of the gamePattern. */
    gamePattern.push(randomChosenColor);

    /* Use jQuery to select the button with the same id as the randomChosenColor:
    Animate a flash to the button selected */
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


};

/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */
/* . Create a new function called checkAnswer(), it should take one
input with the name currentLevel */

function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same 
    //as the game pattern. If so then log "success", otherwise log "wrong".

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished 
        //their sequence with another if statement.

        if (userClickedPattern.length === gamePattern.length) {
            //5. Call nextSequence() after a 1000 millisecond delay.

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        //In the sounds folder, there is a sound called wrong.mp3, play this sound if the user 
        //got one of the answers wrong.

        playSound("wrong");
        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the
        // user gets one of the answers wrong and then remove it after 200 milliseconds.

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
};


/* ----------------------New FUNCTION--------------------------- */
/* ------------------------------------------------------------- */
/* . Create a new function called startOver(). */

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};