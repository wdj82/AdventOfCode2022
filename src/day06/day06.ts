// Advent of Code day 6
// https://adventofcode.com/2022/day/6

import { rawInput } from "./rawInput";

const input = rawInput.split("");

function findPacket(length: number) {
  for (let i = 0; i < input.length; i++) {
    let marker = input[i];

    for (let j = i + 1; j < i + length; j++) {
      const nextChar = input[j];
      if (!marker.includes(nextChar)) {
        marker += nextChar;
        if (marker.length === length) {
          return j + 1;
        }
      }
    }
  }
  return -1;
}
const partOne = findPacket(4);
const partTwo = findPacket(14);

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
