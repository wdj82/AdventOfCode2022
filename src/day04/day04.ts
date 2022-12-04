// Advent of Code day 4
// https://adventofcode.com/2022/day/4

import { rawInput } from "./rawInput";

const pairs = rawInput.split("\n").map((elf) => elf.split(",").map((sections) => sections.split("-").map(Number)));

let partOne = 0;
let partTwo = 0;
pairs.forEach((pair) => {
  const [elfOneStart, elfOneEnd] = pair[0];
  const [elfTwoStart, elfTwoEnd] = pair[1];
  if (
    (elfOneStart <= elfTwoStart && elfOneEnd >= elfTwoEnd) ||
    (elfTwoStart <= elfOneStart && elfTwoEnd >= elfOneEnd)
  ) {
    partOne += 1;
  }

  if (Math.max(elfOneStart, elfTwoStart) <= Math.min(elfOneEnd, elfTwoEnd)) partTwo += 1;
});

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

