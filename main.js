const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const audio = new Audio("boom.mp3");
let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

const getRndInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clickCircle = (i) => {
  if (i !== active) {
    audio.play();
  }
  rounds--;
  score += 10;
  scoreDisplay.textContent = score;
};

const enableEvents = () => {
  circles.forEach((circle, i) => {
    circle.computedStyleMap.pointerEvents = "auto";
    circle.addEventListener("click", () => {
      clickCircle(i);
    });
  });
};
const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }

  enableEvents();
  const newActive = pickNew(active);
  circles[newActive].classList.toggle("active");

  active = newActive;
  timer = setTimeout(startGame, pace);
  pace -= 10;
  rounds++;
};
function pickNew(active) {
  const newActive = getRndInt(0, 3);
  if (newActive !== active) {
    return newActive;
  }
  return pickNew(active);
}
const endGame = () => {
  console.log("game ended");
  clearTimeout(timer);
  resetGame();
};
const resetGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
