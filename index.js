var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    level = level + 1;

    $("h1").text("Level "+level);

    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

$(".btn").click(function() {
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}); 

$(document).keypress(function() {
    if(level === 0) {
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
    }
})

function start() {
    if(level === 0) {
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
    }
}

function playSound(name) {
    switch(name) {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
        break;

        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
        break;

        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
        break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
        break;
    }
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },150);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            },1000);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("wrong");
        $("h1").text("Game Over!! Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("wrong");
        }, 150);

        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}
