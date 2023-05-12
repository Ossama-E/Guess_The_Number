'use strict';

// Function for the game
const game = function () {
  // Generate a random number between 1 and 20
  const targetNum = Math.trunc(Math.random() * 20) + 1;

  // Get the necessary DOM elements
  const messageEl = document.querySelector('.message');
  const scoreEl = document.querySelector('.score');
  const guessEl = document.querySelector('.guess');
  const bodyEl = document.querySelector('body');
  const numberEl = document.querySelector('.number');
  const checkBtnEl = document.querySelector('.check');

  // Initialize the score
  let currScore = 20;
  scoreEl.textContent = currScore;

  // Reset the guess input value
  guessEl.value = '';

  // Set the initial background color
  bodyEl.style.backgroundColor = '#222';

  // Function to update the message and the score
  const updateMessageAndScore = (message, score) => {
    messageEl.textContent = message;
    currScore = score;
    scoreEl.textContent = currScore;
  };

  // Function to handle the guess
  const guessHandle = function () {
    const input = Number(guessEl.value);

    // If no input is given
    if (!input) {
      updateMessageAndScore('No guess!', currScore);
    }
    // If the guess is correct
    else if (input === targetNum) {
      messageEl.textContent = 'Correct!!!!';
      bodyEl.style.backgroundColor = 'green';
      numberEl.style.width = '30rem';
      numberEl.textContent = targetNum;
      numberEl.style.color = 'green';
    }
    // If the guess is incorrect
    else {
      // If there are still chances left
      if (currScore > 1) {
        const message =
          input > targetNum ? 'Guess is too high' : 'Guess is too low';
        updateMessageAndScore(message, currScore - 1);
      }
      // If no chances are left
      else {
        bodyEl.style.backgroundColor = 'red';
        updateMessageAndScore(
          'You lost the game, try again on the top left',
          0
        );
      }
    }
  };

  // Add event listener to the check button
  checkBtnEl.addEventListener('click', guessHandle);
};

// Get the 'again' button DOM element
const againBtnEl = document.querySelector('.btn.again');
// Add event listener to the 'again' button
againBtnEl.addEventListener('click', game);

// Start the game
game();
