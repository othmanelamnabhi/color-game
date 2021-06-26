const Color = require("color");
import { randomNumberRGB } from "./helpers";

export function generateColor(colorFormat = "rgb", color = undefined) {
  const rgbColor =
    color ??
    `rgb(${randomNumberRGB(0, 255)}, ${randomNumberRGB(
      0,
      255
    )}, ${randomNumberRGB(0, 255)})`;

  if (colorFormat === "hex") {
    return Color(rgbColor).hex();
  }
  if (colorFormat === "hsl") {
    return Color(rgbColor).hsl().string();
  }

  return Color(rgbColor).rgb().string();
}

export function generateAdjacentColors(
  { color },
  { difficulty = "easy" } = {}
) {
  return Color.rgb(
    color.map((colorParameter) => {
      if (difficulty === "hard") {
        const min = colorParameter - 42.5 > 0 ? colorParameter - 42.5 : 0;
        const max = colorParameter + 42.5 < 255 ? colorParameter + 42.5 : 255;
        return randomNumberRGB(min, max);
      }
      if (difficulty === "medium") {
        const min = colorParameter - 85 > 0 ? colorParameter - 85 : 0;
        const max = colorParameter + 85 < 255 ? colorParameter + 85 : 255;
        return randomNumberRGB(min, max);
      }

      return randomNumberRGB(0, 255);
    })
  ).string();
}

export function generateColorTiles(
  originalColor,
  { difficulty = "easy" } = {}
) {
  let color = Color(originalColor);
  let array = Array(6).fill("");
  return array.map((colorTile, index) => {
    const button = document.createElement("button");
    if (index === 0) {
      button.style.backgroundColor = color.rgb().string();
      return button;
    } else {
      button.style.backgroundColor = generateAdjacentColors(color, {
        difficulty,
      });
      return button;
    }
  });
}
