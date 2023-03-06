//
var colorPattern = ["blue", "green", "red", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;
function nextSequence() {
  userPattern = [];
  var randomChosenNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = colorPattern[randomChosenNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playAudio(randomChoosenColor);
  level++;
  $("#level-title").text("level " + level);
  console.log(gamePattern);
}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(document).keydown(function (e) {
  if (started == false) {
    if (e.key === "a") {
      nextSequence();
      started = true;
    }
  }
});

$(".btn").click(function () {
  var selected = this.id;
  $("#" + selected).addClass("pressed");
  setTimeout(function () {
    $("#" + selected).removeClass("pressed");
  }, 500);
  playAudio(selected);
  userPattern.push(selected);
  var currentLevel = userPattern.length - 1;
  clickedAction(currentLevel);
  console.log(userPattern);
});

function clickedAction(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("game over");
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    restartGame();
  }
}
function restartGame() {
  started = false;
  level = 0;
  $("#level-title").text("Press A Key to Start");
}
