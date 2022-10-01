import "./style.css";
import "./assets/lineawesome/css/line-awesome.min.css";
import { parseText } from "./lib/csv";
import { BingoGame } from "./lib/bingo";

type Abbr = {
  abbr: string;
  longForm: string;
};

let currentBingoGame: BingoGame<Abbr> | null = null;
let currentData: Array<Abbr> = [];

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
  let latestPicked =
    currentBingoGame!.picked[currentBingoGame!.picked.length - 1];
  currentAbbr.innerText = latestPicked ? latestPicked.abbr : "";

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
    let abbr = currentBingoGame.roll();

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
