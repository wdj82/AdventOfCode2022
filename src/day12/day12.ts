// Advent of Code day 12
// https://adventofcode.com/2022/day/12

import PriorityQueue from "./priorityQueue";
import { rawInput } from "./rawInput";

// use for traversing the grid
const searchDirections = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

// return in bound adjacent coordinates
function getAdjacentCells(currX: number, currY: number, height: number, width: number) {
  const result = [];

  for (let i = 0; i < searchDirections.length; i++) {
    const newX = searchDirections[i].x + currX;
    const newY = searchDirections[i].y + currY;
    if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
      result.push({ newX, newY });
    }
  }
  return result;
}

const grid = rawInput.split("\n").map((line) => line.split(""));

const gridHeight = grid.length;
const gridWidth = grid[0].length;

function findFewestSteps(startChar: string, endChar: string, reverse = false) {
  const distances: number[][] = [...Array(gridHeight)].map(() => Array(gridWidth).fill(Infinity));

  const nodes = new PriorityQueue();

  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      if (grid[x][y] === startChar) {
        distances[x][y] = 0;
        nodes.enqueue({ x, y }, 0);
      } else {
        nodes.enqueue({ x, y }, Infinity);
      }
    }
  }

  while (!nodes.isEmpty()) {
    const { x, y } = nodes.dequeue().value;

    let currentChar = grid[x][y];
    if (currentChar === "E") currentChar = "z";
    else if (currentChar === "S") currentChar = "a";

    if (grid[x][y] === endChar) {
      return distances[x][y];
    }

    if (distances[x][y] !== Infinity) {
      getAdjacentCells(x, y, gridHeight, gridWidth).forEach(({ newX, newY }) => {
        let nextChar = grid[newX][newY];
        if (nextChar === "S") nextChar = "a";
        else if (nextChar === "E") nextChar = "z";

        // part two
        if (reverse && currentChar.charCodeAt(0) - nextChar.charCodeAt(0) > 1) {
          // too steep
          return;
        }

        // part one
        if (!reverse && nextChar.charCodeAt(0) - currentChar.charCodeAt(0) > 1) {
          return;
        }

        const possibleNewMinDistance = distances[x][y] + 1;

        if (possibleNewMinDistance < distances[newX][newY]) {
          distances[newX][newY] = possibleNewMinDistance;
          nodes.enqueue({ x: newX, y: newY }, possibleNewMinDistance);
        }
      });
    }
  }
  throw new Error("something went wrong");
}

const partOne = findFewestSteps("S", "E");
const partTwo = findFewestSteps("E", "a", true);

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
