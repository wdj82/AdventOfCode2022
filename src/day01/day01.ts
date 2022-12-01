// Advent of Code day 1
// https://adventofcode.com/2022/day/1

import rawInput from "./rawInput";

const calories = rawInput
  .split("\n\n")
  .map((elf) => elf.split("\n").map((calories) => Number(calories)))
  .map((calories) => {
    return calories.reduce((acc, prev) => acc + prev, 0);
  })
  .sort((a, b) => b - a);

const partOne = calories.reduce((acc, curr) => (curr > acc ? curr : acc), 0);

const partTwo = calories[0] + calories[1] + calories[2];

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
