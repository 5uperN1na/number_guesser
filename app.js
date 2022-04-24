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
  winningNum = 2,
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
      gameOver(
        false,
        `${winningNum} was the winnging number! YOU LOST!` );
    } else {
      //Game contineus answer wrong
      guessInput.style.borderColor = "red";
      setMessage(
        `${guess} is not correct- ${guessesLeft} guesses left.`,
        color
      );

      guessInput.value = "";
    }
  }
});

//Game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg);
}

//Set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
