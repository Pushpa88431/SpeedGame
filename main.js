const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const ScoreBoard = document.querySelector(".score");
const audio = new Audio("bird-sound.mp3");

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const scoreDisplay = document.querySelector(".scoreDisplay");
const modalMessage = document.querySelector("#scoreMessage");
const stopButton = document.querySelector(".stop");

let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let counter = 0;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clickCircles = (i) => {
  if (i !== active) {
    audio.play(); // play the sound
    return endGame();
  }

  score += 20;
  counter++;
  rounds--;
  ScoreBoard.textContent = score;
  if (counter >= 3) {
    isModalDisplayed = true;
  }
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => {
    clickCircles(i);
  });
});

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};
const startGame = () => {
  startButton.style.display = "none";
  rounds = 0;
  score = 0;
  startRound();
};

const startRound = () => {
  enableEvents();
  console.log("game start");
  console.log(rounds);

  if (rounds >= 3) {
    return endGame();
  }

  const newActive = pickNew(active);

  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = newActive;
  timer = setTimeout(startRound, pace);
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
  audio.pause();
  modalShow();
};

function modalShow() {
  overlay.style.display = "block";
  let message = "Blossoming start! keep going!";
  scoreDisplay.textContent = score;
  if (score < 300) {
    scoreDisplay.textContent = `Your Score : ${score}`;
    message = `Almost a full garden!`;
  } else if (score >= 300 && score < 800) {
    scoreDisplay.textContent = `${score}`;
    message = ` Try again`;
  } else {
    scoreDisplay.textContent = `${score}`;
    message = `Full bloom!`;
  }

  modalMessage.textContent = message;
}

const resetGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", () => {
  audio.play();
  startGame();
});

endButton.addEventListener("click", () => {
  endGame();
});

stopButton.addEventListener("click", () => {
  resetGame();
});
