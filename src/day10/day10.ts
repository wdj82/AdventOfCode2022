// Advent of Code day 10
// https://adventofcode.com/2022/day/10

import { drawToCanvas } from "./drawToCanvas";
import { rawInput } from "./rawInput";

const screen = [...Array(6)].map(() => new Array(40).fill("."));

function drawSprite(registerX: number, currentCycle: number) {
  // only filling in the crt index based on the current cpu cycle
  let crtIndex = currentCycle - 1;

  const crtRow = Math.floor(crtIndex / 40);
  crtIndex = crtIndex % 40;
  registerX = registerX % 40;

  const sprite = [registerX - 1, registerX, registerX + 1];

  // turn on the pixel if the 3 pixel wide sprite is there
  if (sprite.includes(crtIndex)) {
    screen[crtRow][crtIndex] = "#";
  }
}

function replaceCRT() {
  const lines = rawInput.split("\n");

  let registerX = 1;
  let currentCycle = 1;
  let currentInputIndex = 0;
  let toBeAdded: number | null = null;
  let cycleToCheck = 20;
  let signalStrength = 0;

  while (currentInputIndex < lines.length) {
    // for part one
    if (currentCycle === cycleToCheck) {
      cycleToCheck += 40;
      signalStrength += currentCycle * registerX;
    }

    // for part two
    drawSprite(registerX, currentCycle);

    if (toBeAdded) {
      registerX += toBeAdded;
      toBeAdded = null;
      // only go to next instruction on completion of current instruction
      currentInputIndex += 1;
    } else {
      const input = lines[currentInputIndex];
      if (input === "noop") {
        // noop finishes in one cycle
        currentInputIndex += 1;
      } else {
        // next cycle the add will finish
        toBeAdded = Number(input.split(" ")[1]);
      }
    }
    currentCycle += 1;
  }

  return signalStrength;
}

const partOne = replaceCRT();
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
drawToCanvas(screen);

