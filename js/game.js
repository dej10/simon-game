var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "green" , "blue", "yellow"];
var level = 0;


 $(".btn").on('click', function(event) {
	 	var userChosenColour = this.id;
	 	userClickedPattern.push(userChosenColour);

	 	playSound(userChosenColour);
	 	animatePress(userChosenColour);
	 	checkAnswer(userClickedPattern.length-1);
	 });

 $(document).one('keydown', function() {
 	nextSequence();
 	$("#level-title").html("level "+ level )

 });


function nextSequence () {
	userClickedPattern = [];

	level++;
	$("#level-title").html("level "+ level );
	
	var randonNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randonNumber];

	gamePattern.push(randomChosenColour);	

	 $("#" + randomChosenColour).fadeOut(70).fadeIn(70);
	 playSound(randomChosenColour);	 
	 animatePress(randomChosenColour);


} 


function playSound (name) {
	var audio = new Audio(`sounds/${name}.mp3`);
	 audio.play();
}

function animatePress(currentColour){

	var activeButton = $("." + currentColour);
	 activeButton.addClass("pressed");

	 setTimeout(function()
	  { activeButton.removeClass("pressed");}, 100);


}

function checkAnswer (currentLevel) {
	
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
    	playSound("wrong");
     	 console.log("wrong");


     	 $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();

    }
}

function startOver (argument) {
	level = 0;
	gamePattern = [];

	 $(document).one('keydown', function() {
	 	nextSequence();
 	$("#level-title").html("level "+ level )

 });
}