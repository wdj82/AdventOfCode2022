// Advent of Code day 8
// https://adventofcode.com/2022/day/8

import { rawInput } from "./rawInput";

const trees = rawInput.split("\n").map((line) => line.split("").map(Number));

let partOne = 0;
let partTwo = 0;

const height = trees.length;
const width = trees[0].length;

for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    const tree = trees[row][col];
    if (row === 0 || col === 0 || row === width - 1 || col === height - 1) {
      partOne += 1;
    } else {
      let treesVisibleScore = 0;

      let upperVisible = true;
      for (let i = row - 1; i >= 0; i--) {
        treesVisibleScore += 1;
        if (trees[i][col] >= tree) {
          upperVisible = false;
          break;
        }
      }

      let count = 0;
      let lowerVisible = true;
      for (let i = row + 1; i < height; i++) {
        count += 1;
        if (trees[i][col] >= tree) {
          lowerVisible = false;
          break;
        }
      }
      treesVisibleScore *= count;
      count = 0;

      let leftVisible = true;
      for (let i = col - 1; i >= 0; i--) {
        count += 1;
        if (trees[row][i] >= tree) {
          leftVisible = false;
          break;
        }
      }
      treesVisibleScore *= count;
      count = 0;

      let rightVisible = true;
      for (let i = col + 1; i < width; i++) {
        count += 1;
        if (trees[row][i] >= tree) {
          rightVisible = false;
          break;
        }
      }
      treesVisibleScore *= count;

      if (rightVisible || leftVisible || upperVisible || lowerVisible) {
        partOne += 1;
      }
      partTwo = Math.max(partTwo, treesVisibleScore);
    }
  }
}

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
