import "./style.css";
import "animate.css";
import "./assets/lineawesome/css/line-awesome.min.css";
import { parseText } from "./lib/csv";
import { BingoGame } from "./lib/bingo";
import { animateCSS } from "./lib/animation";
import { hideAllBtns, initToggleBtns } from "./lib/togglebtn";

initToggleBtns();

type Abbr = {
  abbr: string;
  longForm: string;
  description: string;
};

let currentBingoGame: BingoGame<Abbr> | null = null;
let currentData: Array<Abbr> = [];

// load data from localstorage
function loadDataFromLocalstorage() {
  const data = localStorage.getItem("data");
  if (data) {
    currentData = JSON.parse(data);
  }
}

// save data to localstorage
function saveDataToLocalstorage() {
  localStorage.setItem("data", JSON.stringify(currentData));
}

// Init with data from localstorage
loadDataFromLocalstorage();
initBingoGame();

// Listen for uploaded csv on csv-input
const csvInput = document.getElementById("csv-input")!;

csvInput.addEventListener("change", (ev) => {
  let file = (ev.target as HTMLInputElement).files![0];

  console.log(file);

  // Read file
  let reader = new FileReader();

  reader.onprogress = (ev) => {
    console.log(ev.loaded);
  };

  reader.onload = (ev) => {
    let text = ev.target!.result as string;

    // Parse text
    currentData = parseText<Abbr>(text);
    saveDataToLocalstorage();

    initBingoGame();
  };

  reader.readAsText(file);
});

// Init Bingo Game
function initBingoGame() {
  currentBingoGame = new BingoGame(currentData.slice());

  initUI();
}

// Run UI loop
function initUI() {
  // Init current abbr
  let currentAbbr = document.getElementById("current-abbr")!;
  let currentLongForm = document.getElementById("current-longform")!;
  let currentDescription = document.getElementById("current-description")!;

  let latestPicked =
    currentBingoGame!.picked[currentBingoGame!.picked.length - 1];

  animateCSS(currentAbbr, "bounceInDown");

  hideAllBtns();
  currentAbbr.innerText = latestPicked ? latestPicked.abbr : "";
  currentLongForm.innerText = latestPicked ? latestPicked.longForm : "";
  currentDescription.innerText = latestPicked ? latestPicked.description : "";

  // Init latest abbr list
  const latestAbbr = document.getElementById("latest-abbr")!;
  // clear latest abbr list
  latestAbbr.innerHTML = "";

  // add picked abbr to latest abbr list
  currentBingoGame?.picked.forEach((abbr) => {
    let span = document.createElement("span");
    span.classList.add("kbd");

    span.innerText = abbr.abbr;
    latestAbbr.appendChild(span);
  });

  // If there is no last picked abbr, disable back button
  if (latestPicked) {
    document.getElementById("btn-prev-abbr")!.classList.remove("hidden");
  } else {
    document.getElementById("btn-prev-abbr")!.classList.add("hidden");
  }

  // If there is no abbr left, disable roll button
  if (currentBingoGame!.notPicked.length > 0) {
    document.getElementById("btn-next-abbr")!.classList.remove("hidden");
  } else {
    document.getElementById("btn-next-abbr")!.classList.add("hidden");
  }
}

// Listen for roll button
const rollBtn = document.getElementById("btn-next-abbr")!;

rollBtn.addEventListener("click", () => {
  if (currentBingoGame) {
    currentBingoGame.roll();

    initUI();
  }
});

const backBtn = document.getElementById("btn-prev-abbr")!;
backBtn.addEventListener("click", () => {
  if (currentBingoGame) {
    currentBingoGame.back();

    initUI();
  }
});

const restartBtn = document.getElementById("btn-restart")!;
restartBtn.addEventListener("click", () => {
  if (currentBingoGame) {
    initBingoGame();

    initUI();
  }
});
