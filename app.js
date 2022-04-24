/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} was the winnging number! YOU WON!`);
  } else {
    //Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false, `${winningNum} was the winnging number! YOU LOST!`);
    } else {
      //Game contineus answer wrong
      guessInput.style.borderColor = "orange";
      setMessage(
        `${guess} is not correct- ${guessesLeft} guesses left.`,
        "orange"
      );

      guessInput.value = "";
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  //Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//Get winning number

function getWinningNum(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}
