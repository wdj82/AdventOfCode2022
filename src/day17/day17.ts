// Advent of Code day 17
// https://adventofcode.com/2022/day/17

import { drawToCanvas } from "./drawToCanvas";
import { rawInput } from "./rawInput";

const input = rawInput.split("");

function getRock(type: number, y: number) {
  if (type === 0) {
    return [
      { x: 2, y },
      { x: 3, y },
      { x: 4, y },
      { x: 5, y },
    ];
  }
  if (type === 1) {
    return [
      { x: 3, y },
      { x: 2, y: y + 1 },
      { x: 3, y: y + 1 },
      { x: 4, y: y + 1 },
      { x: 3, y: y + 2 },
    ];
  }
  if (type === 2) {
    return [
      { x: 2, y },
      { x: 3, y },
      { x: 4, y },
      { x: 4, y: y + 1 },
      { x: 4, y: y + 2 },
    ];
  }
  if (type === 3) {
    return [
      { x: 2, y },
      { x: 2, y: y + 1 },
      { x: 2, y: y + 2 },
      { x: 2, y: y + 3 },
    ];
  }
  if (type === 4) {
    return [
      { x: 2, y },
      { x: 3, y },
      { x: 2, y: y + 1 },
      { x: 3, y: y + 1 },
    ];
  }
  throw new Error("unknown type of rock");
}

const cave = [
  ["-", "-", "-", "-", "-", "-", "-"],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
];

const CAVE_WIDTH = 7;
let heightIndex = 0;
let currentRock = 0;
let windIndex = 0;

function findTop() {
  for (let i = heightIndex; i < cave.length; i++) {
    if (cave[i].every((space) => space === ".")) {
      heightIndex = i - 1;
      return;
    }
  }
  throw new Error();
}

function canMove(deltaX: number, deltaY: number, rock: { x: number; y: number }[]) {
  return rock.every(({ x, y }) => cave[y + deltaY][x + deltaX] === ".");
}

function move(newRock: { x: number; y: number }[]) {
  // drawCave(newRock);
  while (newRock[0].y > 0) {
    const wind = input[windIndex];
    windIndex = (windIndex + 1) % input.length;
    // console.log({ wind });
    // console.log("new wind index: ", windIndex);

    const last = newRock.at(-1);
    if (!last) return;

    if (wind === "<" && newRock[0].x - 1 >= 0 && canMove(-1, 0, newRock)) {
      // console.log("moving left");
      for (let i = 0; i < newRock.length; i++) {
        newRock[i].x -= 1;
      }
    } else if (wind === ">" && last.x + 1 < CAVE_WIDTH && canMove(1, 0, newRock)) {
      // console.log("moving right");
      for (let i = 0; i < newRock.length; i++) {
        newRock[i].x += 1;
      }
    }

    if (canMove(0, -1, newRock)) {
      // console.log("moving down");
      for (let i = 0; i < newRock.length; i++) {
        newRock[i].y -= 1;
      }
    } else {
      // console.log("settled");
      newRock.forEach(({ x, y }) => {
        cave[y][x] = "#";
      });
      // drawCave(newRock, "settled");
      return;
    }
  }
}

function addToCave(lines: number) {
  const numToAdd = lines + (heightIndex + 4 - cave.length);
  for (let i = 0; i < numToAdd; i++) {
    // console.log(`adding line ${i}`);
    cave.push([".", ".", ".", ".", ".", ".", "."]);
  }
}

function addRock() {
  // console.log("--------- New rock -----------");
  // console.log({ heightIndex, caveLength: cave.length });
  if (currentRock === 3) addToCave(4);
  else if (currentRock === 1 || currentRock === 2) addToCave(3);
  else if (currentRock === 4) addToCave(2);
  else addToCave(1);
  // console.log("drawn cave height: ", cave.length);
  const newRock = getRock(currentRock, heightIndex + 4);

  move(newRock);

  findTop();
  // console.log({ heightIndex });
  currentRock = (currentRock + 1) % 5;
}

for (let i = 0; i < 2022; i++) {
  addRock();
}

console.log({ heightIndex });

// let newHeight = findTop();
// console.log({ newHeight });
// addRock();
// newHeight = findTop();
// console.log({ newHeight });
// addRock();
// newHeight = findTop();
// console.log({ newHeight });

drawCave();

function drawCave(rock?: { x: number; y: number }[], message?: string) {
  const div = document.createElement("code");
  if (message) {
    const text = document.createElement("div");
    text.innerHTML = message;
    document.getElementById("animation")?.appendChild(text);
  }
  const copyCave = cave.map((line) => [...line]);
  if (rock) {
    rock.forEach(({ x, y }) => (copyCave[y][x] = "#"));
  }
  const drawCave = copyCave
    .map((line) => line.join(""))
    .reverse()
    .join("\n");
  div.innerText = drawCave;
  document.getElementById("animation")?.appendChild(div);
}

const partOne = "partOne";
const partTwo = "partTwo";

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
