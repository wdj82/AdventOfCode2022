// Advent of Code day 1
// https://adventofcode.com/2022/day/1

import rawInput from "./rawInput";

// separate calories for each elf
// convert their calories into array of numbers
// sum up the array
// sort the totals in descending order
const elfCalories = rawInput
  .split("\n\n")
  .map((elf) => elf.split("\n").map((calories) => Number(calories)))
  .map((calories) => calories.reduce((acc, prev) => acc + prev, 0))
  .sort((a, b) => b - a);

const partOne = Math.max(...elfCalories);
const partTwo = elfCalories[0] + elfCalories[1] + elfCalories[2];

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
