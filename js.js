///  DOM VARIABLES
let paper = document.querySelector("[paper]");
let rock = document.querySelector("[rock]");
let sciss = document.querySelector("[sciss]");
let gameDiv = document.querySelector(".game");
let imgs = document.querySelectorAll("[game-img]");
let hiddenImg = document.querySelector(".hiddenImg");
let sidePs = document.querySelectorAll(".side-p");
let resultHeading = document.querySelector(".result-heading");
let result = document.querySelector(".result");
let resultButton = document.querySelector(".result-button");
let scoreNumber = document.querySelector(".score-number");
let rulesButton = document.querySelector(".rules");
let rulesImg = document.querySelector(".rules-img");
// GLOBAL VARIABLES
let winStreak = 0;
let resultText = "";

startGame();
function startGame() {
  imgs.forEach((img) => {
    img.addEventListener("click", clickHandler);
  });
}

function clickHandler(e) {
  target = e.target;
  randomNumRes = randomNum();
  imgs.forEach((img) => {
    img.removeEventListener("click", clickHandler);
  });

  addStyles();
  enemyTurn();
  setResColor();
}

function addStyles() {
  target.classList.add("img-played");
  gameDiv.classList.add("played");
  result.classList.add("result-show");
  hiddenImg.classList.add("notHiddenAnymore");

  sidePs.forEach((sideP) => {
    sideP.classList.add("side-p-show");
  });

  imgs.forEach((img) => {
    if (img != target && target.classList.contains("hiddenImg") == false) {
      img.classList.add("hidden");
    }
  });
}

function randomNum() {
  return Math.floor(Math.random() * 3) + 1;
}

function enemyTurn() {
  if (randomNumRes == 1) {
    setPaper();
  } else if (randomNumRes == 2) {
    setRock();
  } else {
    setSciss();
  }
  resultHeading.classList.add("result-heading-show");
  resultHeading.innerText = resultText;
  scoreNumber.innerText = winStreak;
  hiddenImg.classList.add("img-played");
}

function setPaper() {
  console.log("paper funkce")
  hiddenImg.src = "imgs/icon-paper.svg";
  hiddenImg.classList.add("paperClass");

  if (target == paper) {
    resultText = "DRAW";
  } else if (target == rock) {
    resultText = "LOST";
    hiddenImg.classList.add("animace");
  } else {
    resultText = "WIN";
    target.classList.add("animace");
    winStreak++;
  }
}

function setRock() {
  console.log("rockfunkce")
  hiddenImg.src = "imgs/icon-rock.svg";
  hiddenImg.classList.add("rockClass");

  if (target == paper) {
    resultText = "WIN";
    target.classList.add("animace");
    winStreak++;
  } else if (target == rock) {
    resultText = "DRAW";
  } else {
    resultText = "LOST";
    hiddenImg.classList.add("animace");
  }
}
function setSciss() {
  console.log("sciss funkce")
  hiddenImg.src = "imgs/icon-scissors.svg";
  hiddenImg.classList.add("scissClass");

  if (target == paper) {
    resultText = "LOST";
    hiddenImg.classList.add("animace");
  } else if (target == rock) {
    resultText = "WIN";
    target.classList.add("animace");
    winStreak++;
  } else {
    resultText = "DRAW";
  }
}

function setResColor() {
  if (resultText == "DRAW") {
    resultHeading.style.color = "pink";
  } else if (resultText == "WIN") {
    resultHeading.style.color = "green";
  } else {
    resultHeading.style.color = "red";
  }
}

resultButton.addEventListener("click", resetFunc);

function resetFunc() {
  startGame();
  resultText = "";
  resultHeading.innerText = resultText;
  resultHeading.classList.remove("opacity-on");
  resultHeading.style.color = "white";
  result.classList.remove("result-show");
  hiddenImg.src = "";
  hiddenImg.classList.remove("notHiddenAnymore");
  hiddenImg.classList.remove("rockClass");
  hiddenImg.classList.remove("scissClass");
  hiddenImg.classList.remove("paperClass")

  imgs.forEach((img) => {
    img.classList.remove("animace");
    img.classList.remove("img-played");
    img.classList.remove("hidden");
  });
  gameDiv.classList.remove("played");

  sidePs.forEach((sideP) => {
    sideP.classList.remove("side-p-show");
  });
}

rulesButton.addEventListener("click", () => {
  rulesImg.classList.toggle("rules-img-on");
});
