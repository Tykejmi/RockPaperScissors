
///  DOM VARIABLES
const PAPER = document.querySelector("[paper]");
const ROCK = document.querySelector("[rock]");
const GAME_DIV = document.querySelector(".game");
const GAME_IMGS = document.querySelectorAll("[game-img]");
const HIDDEN_IMG = document.querySelector(".hidden-img");
const SIDE_P = document.querySelectorAll(".side-p");
const RESULT_HEADING = document.querySelector(".result-heading");
const RESULT = document.querySelector(".result");
const RESULT_BTN = document.querySelector(".result-button");
const SCORE_NUMBER = document.querySelector(".score-number");
const RULES_BTN = document.querySelector(".rules");
const RULES_IMG = document.querySelector(".rules-img");
// GLOBAL VARIABLES
let winStreak = 0;
let resultText = "";



startGame();
function startGame() {
  GAME_IMGS.forEach((img) => {
    img.addEventListener("click", clickHandler);
  });
}

function clickHandler(e) {
  let target = e.target;
  let randomNumRes = randomNum();
  GAME_IMGS.forEach((img) => {
    img.removeEventListener("click", clickHandler);
  });

  addStyles(target);
  enemyTurn(randomNumRes,target);
  setResColor();
}

function addStyles(target) {
  target.classList.add("img-played");
  GAME_DIV.classList.add("played");
  RESULT.classList.add("result-show");
  HIDDEN_IMG.classList.add("notHiddenAnymore");

  SIDE_P.forEach((sideP) => {
    sideP.classList.add("side-p-show");
  });

  GAME_IMGS.forEach((img) => {
    if (img != target && target.classList.contains("hidden-img") == false) {
      img.classList.add("hidden");
    }
  });
}

function randomNum() {
  return Math.floor(Math.random() * 3) + 1;
}

function enemyTurn(randomNumRes,target) {
  if (randomNumRes == 1) {
    setPaper(target);
  } else if (randomNumRes == 2) {
    setRock(target);
  } else {
    setSciss(target);
  }
  RESULT_HEADING.classList.add("result-heading-show");
  RESULT_HEADING.innerText = resultText;
  SCORE_NUMBER.innerText = winStreak;
  HIDDEN_IMG.classList.add("img-played");
}

function setPaper(target) {
  HIDDEN_IMG.src = "imgs/icon-paper.svg";
  HIDDEN_IMG.classList.add("paperClass");

  if (target == PAPER) {
    resultText = "DRAW";
  } else if (target == ROCK) {
    resultText = "LOST";
    HIDDEN_IMG.classList.add("animace");
  } else {
    resultText = "WIN";
    target.classList.add("animace");
    winStreak++;
  }
}

function setRock(target) {
  HIDDEN_IMG.src = "imgs/icon-rock.svg";
  HIDDEN_IMG.classList.add("rockClass");

  if (target == PAPER) {
    resultText = "WIN";
    target.classList.add("animace");
    winStreak++;
  } else if (target == ROCK) {
    resultText = "DRAW";
  } else {
    resultText = "LOST";
    HIDDEN_IMG.classList.add("animace");
  }
}
function setSciss(target) {
  HIDDEN_IMG.src = "imgs/icon-scissors.svg";
  HIDDEN_IMG.classList.add("scissClass");

  if (target == PAPER) {
    resultText = "LOST";
    HIDDEN_IMG.classList.add("animace");
  } else if (target == ROCK) {
    resultText = "WIN";
    target.classList.add("animace");
    winStreak++;
  } else {
    resultText = "DRAW";
  }
}

function setResColor() {
  if (resultText == "DRAW") {
    RESULT_HEADING.style.color = "pink";
  } else if (resultText == "WIN") {
    RESULT_HEADING.style.color = "green";
  } else {
    RESULT_HEADING.style.color = "red";
  }
}

RESULT_BTN.addEventListener("click", resetFunc);

function resetFunc() {
  startGame();
  resultText = "";
  RESULT_HEADING.innerText = resultText;
  RESULT_HEADING.classList.remove("opacity-on");
  RESULT_HEADING.style.color = "white";
  RESULT.classList.remove("result-show");
  HIDDEN_IMG.src = "";
  HIDDEN_IMG.classList.remove("notHiddenAnymore");
  HIDDEN_IMG.classList.remove("rockClass");
  HIDDEN_IMG.classList.remove("scissClass");
  HIDDEN_IMG.classList.remove("paperClass")

  GAME_IMGS.forEach((img) => {
    img.classList.remove("animace");
    img.classList.remove("img-played");
    img.classList.remove("hidden");
  });
  GAME_DIV.classList.remove("played");

  SIDE_P.forEach((sideP) => {
    sideP.classList.remove("side-p-show");
  });
}

RULES_BTN.addEventListener("click", () => {
  RULES_IMG.classList.toggle("rules-img-on");
});
