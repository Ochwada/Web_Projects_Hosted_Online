// ----------------------------------------------------------------- 
// ----- iterate through the button and drum class ------------------)
var noOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < noOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {

        //this.style.color = "white";
        //switchStatements
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);

    });
};
// ----- Detect which Key was pressed and send it to makeSound())
document.addEventListener("keypress", function (event) {
    makeSound(event.key);
    buttonAnimation(event.key);

});

function makeSound(key) {
    switch (key) {

        case "w":
            var crash = new Audio("sounds/crash.mp3")
            crash.play()
            break;

        case "a":
            var kick_bass = new Audio("sounds/kick-bass.mp3")
            kick_bass.play()
            break;

        case "s":
            var snare = new Audio("sounds/snare.mp3")
            snare.play()
            break;

        case "d":
            var tom_1 = new Audio("sounds/tom-1.mp3")
            tom_1.play()
            break;

        case "j":
            var tom_2 = new Audio("sounds/tom-2.mp3")
            tom_2.play()
            break;

        case "k":
            var tom_3 = new Audio("sounds/tom-3.mp3")
            tom_3.play()
            break;

        case "l":
            var tom_4 = new Audio("sounds/tom-4.mp3")
            tom_4.play()
            break;

        default:
            console.log(buttonInnerHTML)
            break;
    }
};

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("."+currentKey);
   
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
     }, 100);
};

// How to add css styling in js? 

// USE Keydown instead of keypress
/* function audioPlay(fileLocation) {
    this.fileLocation = fileLocation;
    this.play = function () {

    }
};


 */

/* alert("hello world") */
/* 
document.querySelector("button").addEventListener("click", handleClick);

function handleClick() {
    alert("w got clicked")
}
document.querySelector(".w").addEventListener("click", function () {
alert("w got clicked")
});

document.querySelectorAll("button")[2].addEventListener("click", function () {
    alert("s got clicked")
}); 
 */
/*
var audio = new Audio("sounds/tom-1.mp3")
audio.play(); */

