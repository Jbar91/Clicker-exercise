const clickArea = document.querySelector(".click-area");
const displayText = document.querySelector(".display-text");
const scoreElements = document.querySelectorAll(".score");

const scoreHistory = [];

const minimumTime = 3000;
const maximumTime = 10000;

let waitingForClick = false;
let timeBeforeClick = 0;

const activateClick = () => {
  const msTillChange =
    Math.floor(Math.random() * (maximumTime - minimumTime)) + minimumTime;

  setTimeout(() => {
    timeBeforeClick = Date.now();

    clickArea.style.backgroundColor = "#009578";

    waitingForClick = true;
  }, msTillChange);
};

const play = () => {
  clickArea.style.backgroundColor = null;

  displayText.textContent = "";

  activateClick();
};

const setScores = (score) => {
  scoreHistory.push(score);

  const highScores = scoreHistory.sort((a, b) => a - b);

  for (let i = 0; i < Math.min(scoreHistory.length, 5); i++) {
    const score = highScores[i];

    scoreElements[i].textContent = `${score} ms`;
  }
};

clickArea.addEventListener("click", () => {
  if (waitingForClick) {
    waitingForClick = false;

    let score = Date.now() - timeBeforeClick;

    displayText.textContent = `Your time was ${score} ms! Click to play again.`;

    setScores(score);
  } else {
    play();
  }
});
