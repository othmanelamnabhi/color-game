import { generateColor, generateColorTiles } from "./colorStuff";
import { compareColors, shuffleArray } from "./helpers";

const colorString = document.querySelector(".color-string");
const radioFormat = document.querySelector("[data-format]");
const radioDifficulty = document.querySelector("[data-difficulty]");
const colorGrid = document.querySelector(".color-grid");
const results = document.querySelector(".results");

newGame();

radioFormat.addEventListener("click", (e) => {
  if (!e.target.matches("input:checked")) return;
  newGame();
});

radioDifficulty.addEventListener("click", (e) => {
  if (!e.target.matches("input:checked")) return;
  newGame();
});
const nextColorButton = document.querySelector("[data-next-color]");
nextColorButton.addEventListener("click", (e) => {
  newGame();
});

colorGrid.addEventListener("click", (e) => {
  let colorString = document.querySelector(".color-string").textContent;
  let clickedTileColor = e.target.style.backgroundColor;
  if (!e.target.matches("button")) return;

  const allTiles = colorGrid.querySelectorAll("button");
  allTiles.forEach((tile) => {
    tile.setAttribute("disabled", "");
    if (!compareColors(colorString, tile.style.backgroundColor)) {
      tile.classList.add("wrong");
    }
  });
  const resultString = results.querySelector("[data-result]");
  resultString.textContent = compareColors(colorString, clickedTileColor)
    ? "Correct"
    : "Wrong";
  results.classList.remove("hide");
});

function newGame() {
  const radioFormatChecked = radioFormat.querySelector("input:checked").value;
  const radioDifficultyChecked =
    radioDifficulty.querySelector("input:checked").value;
  const newGeneratedColor = generateColor(radioFormatChecked);

  colorString.textContent = newGeneratedColor;
  const buttonsToRender = generateColorTiles(newGeneratedColor, {
    difficulty: radioDifficultyChecked,
  });
  renderColorTiles(buttonsToRender);
  results.classList.add("hide");
}

function renderColorTiles(array) {
  array = shuffleArray(array);
  colorGrid.innerHTML = "";
  array.forEach((button) => {
    colorGrid.append(button);
  });
}
