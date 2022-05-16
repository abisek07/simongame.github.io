var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var key = 1;

function nextSequenece(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    $("#"+ randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours);
    $("h1").text("Level "+ level++);
}

$(document).keypress(function(){
    if(key===1){
        nextSequenece();
        $("h1").text("Level "+ level++);
        key = 0;
    }
});


$(".btn").click(function(){
    animatePress(this.id);
    playSound(this.id);
    userClickedPattern.push(this.id);
    

    checkAnswer(userClickedPattern.length-1);



})

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);  
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequenece();
            }, 1000);
        }
        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
    }
}


function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    key = 1;
}
