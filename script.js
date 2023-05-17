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
  const hintBtn = document.querySelector('.hint');

  // Define hints and their conditions
  const hints = [
    { hint: 'The number is even.', condition: num => num % 2 === 0 },
    { hint: 'The number is a prime number.', condition: num => isPrime(num) },
    { hint: 'The number is divisible by 3.', condition: num => num % 3 === 0 },
    {
      hint: 'The number is a perfect square.',
      condition: num => Math.sqrt(num) % 1 === 0,
    },
    { hint: 'The number is a multiple of 5.', condition: num => num % 5 === 0 },
    { hint: 'The number is greater than 10.', condition: num => num > 10 },
    // Additional hints
    { hint: 'The number is odd.', condition: num => num % 2 !== 0 },
    { hint: 'The number is a multiple of 4.', condition: num => num % 4 === 0 },
    {
      hint: 'The number is a perfect cube.',
      condition: num => Math.cbrt(num) % 1 === 0,
    },
  ];

  // Setup initial game state
  hintBtn.style.display = 'block';
  messageEl.textContent = 'Start guessing...';
  numberEl.textContent = '?';
  numberEl.style.color = '#222';

  // Function to check whether a number is prime or not
  function isPrime(num) {
    if (num <= 1) {
      return false;
    }

    // Check for divisibility from 2 to the square root of the number
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  }

  // Initialize the score
  let highScore = 0;
  let currScore = 20;
  scoreEl.textContent = currScore;

  // Reset the guess input value
  guessEl.value = '';

  // Set the initial background color
  bodyEl.style.backgroundColor = '#222';

  // Function to update the message and the score
  const updateMessageAndScore = (message, score) => {
    messageEl.textContent = message;
    if (score !== currScore) {
      currScore = score;
      scoreEl.textContent = currScore;
    }
  };

  // Function to get a random hint
  function getRandomHint(targetNum) {
    const eligibleHints = hints.filter(hint => hint.condition(targetNum));
    const randomIndex = Math.floor(Math.random() * eligibleHints.length);
    return eligibleHints[randomIndex]?.hint || 'No hint available.';
  }

  // Function to show a hint
  function showHint() {
    const hint = document.createElement('h3');
    hint.classList.add('hint');
    let foundHint = getRandomHint(targetNum);
    hint.textContent = foundHint;
    hint.style.position = 'fixed';
    hint.style.bottom = '10px';
    hint.style.left = '35vw';
    hint.style.transform = 'translateX(-50%)';
    document.body.appendChild(hint);

    // Apply animation class
    hint.classList.add('hint-animation');

    // Remove hint after the animation completes
    hint.addEventListener('animationend', function () {
      hint.remove();
    });
  }

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
      if (currScore > highScore) {
        highScore = currScore;
        document.querySelector('.highscore').textContent = highScore;
        // console.log(highScore);
      }
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

  // Add event listener to the hint button
  hintBtn.addEventListener('click', function () {
    hintBtn.style.display = 'none';
    showHint();
  });
};

// Get the 'again' button DOM element
const againBtnEl = document.querySelector('.btn.again');

// Add event listener to the 'again' button
againBtnEl.addEventListener('click', game);

// Start the game
game();
