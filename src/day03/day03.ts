// Advent of Code day 3
// https://adventofcode.com/2022/day/3

import { rawInput } from "./rawInput";

const LOWER_START = "a".charCodeAt(0) - 1;
const UPPER_START = "A".charCodeAt(0) - 27;

const rucksacks = rawInput.split("\n");

const compartments = rucksacks.map((pack) => [
  pack.slice(0, pack.length / 2).split(""),
  pack.slice(pack.length / 2).split(""),
]);

const partOne = compartments.reduce((acc, [compartment1, compartment2]) => {
  let item = "";
  for (let i = 0; i < compartment1.length; i++) {
    item = compartment1[i];
    if (compartment2.includes(item)) {
      break;
    }
  }
  if (item.toLowerCase() === item) {
    return acc + item.charCodeAt(0) - LOWER_START;
  }
  return acc + item.charCodeAt(0) - UPPER_START;
}, 0);

let partTwo = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
  const elf1 = rucksacks[i].split("");
  const elf2 = rucksacks[i + 1].split("");
  const elf3 = rucksacks[i + 2].split("");

  let item = "";
  for (let j = 0; j < elf1.length; j++) {
    item = elf1[j];
    if (elf2.includes(item) && elf3.includes(item)) {
      break;
    }
  }

  if (item.toLowerCase() === item) {
    partTwo += item.charCodeAt(0) - LOWER_START;
  } else {
    partTwo += item.charCodeAt(0) - UPPER_START;
  }
}

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

