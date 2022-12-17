// Advent of Code day 17
// https://adventofcode.com/2022/day/17

import { testInput as rawInput, rawRocks } from "./rawInput";

const input = rawInput.split("");
console.log({ input });

const rocks = rawRocks.map((rock) => rock.split("\n"));
console.log({ rocks });

const caveWidth = 7;
const rockHeight = 0;

const partOne = "partOne";
const partTwo = "partTwo";

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

