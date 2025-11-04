var userClickedPattern=[];
var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var level=0;
var start=0;
$("body").keydown(function(event){
    if(event.key=="a" && start==0){
        nextSequence();
        $("h1#level-title").text("Level "+level);
        start=1;
    }
});
function playSound(color){
    var audio=new Audio("./sounds/"+color+".mp3");
    audio.play();
}
function playAnimation(color){
    $("#"+color).fadeOut(100).fadeIn(100);
}
function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomColorChosen=buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);

playAnimation(randomColorChosen);
playSound(randomColorChosen);
level+=1;
}
function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length-1]==gamePattern[userClickedPattern.length-1]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            userClickedPattern.length=0;
            $("h1#level-title").text("Level "+level);
            },1000);
        }
    }else{
        start=0;
        level=0;
        userClickedPattern.length=0;
        gamePattern.length=0;
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("h1#level-title").text("Game-Over !!  Press any key to restart the game");
        $("body").keydown(function(event){
            if(start==0){
                nextSequence();
                $("h1#level-title").text("Level "+level);
                start=1;
            }
        });
    }
}

$(".btn").click(function(event){
    var userChosenColor=$(event.target).attr("id");  //you need to select the element for which type $(this) or the one that you have written
    playSound(userChosenColor);   //this also represents the element which called the click event.
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer();
});
