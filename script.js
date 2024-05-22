window.addEventListener("load", init);

//Globals

// Available Levels
const levels = {
  Easy: 5,
  Medium: 3,
  Hard: 2,
};

let currentLevel;
// To change level
let time = 0;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highscore = document.querySelector("#highscore");
const leveling = document.querySelectorAll(".btn");

const words = ["hat", "river", "javascript", "lucky", "statue"];

leveling.forEach((level) => {
  level.addEventListener("click", changeLevel);

  function changeLevel(e) {
    let lvl = e.target.innerHTML;
    console.log(lvl);
    currentLevel = levels[lvl];

    console.log(currentLevel);
    time = currentLevel;

    seconds.innerHTML = " " + currentLevel + " ";
    isPlaying = false;
  }
});

//Intialize Game
function init() {
  //Show number of seconds in UI

  // Load word from array
  showWord(words);
  //Start matching on word input
  wordInput.addEventListener("input", startMatch);
  //Call countdown every second
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  checkHighscore();

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick & show random word
async function showWord(words) {
  //Generate random array index
  // const randIndex = Math.floor(Math.random() * words.length);

  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const randomWord = await response.json();
  //Output random word
  currentWord.innerHTML = randomWord;
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0 && isPlaying) {
    //Decrement
    time--;
  } else if (time === 0) {
    //Game is over
    isPlaying = false;
  }

  //Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}

// Highscore
let highscoreCount = 0;

function checkHighscore() {
  if (score > highscoreCount) {
    highscoreCount = score;
    highscore.innerHTML = highscoreCount;
  }
}
