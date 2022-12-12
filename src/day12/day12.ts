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

const endNode = { x: 0, y: 0 };

function findFewestSteps() {
  const distances: number[][] = [...Array(gridHeight)].map(() => Array(gridWidth).fill(Infinity));

  const nodes = new PriorityQueue();

  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      if (grid[x][y] === "S") {
        distances[x][y] = 0;
        grid[x][y] = "a";
        nodes.enqueue({ x, y }, 0);
      } else {
        nodes.enqueue({ x, y }, Infinity);
      }
      if (grid[x][y] === "E") {
        grid[x][y] = "z";
        endNode.x = x;
        endNode.y = y;
      }
    }
  }

  while (!nodes.isEmpty()) {
    const { x, y } = nodes.dequeue().value;

    if (x === endNode.x && y === endNode.y) {
      // found E
      return distances[x][y];
    }

    if (distances[x][y] !== Infinity) {
      getAdjacentCells(x, y, gridHeight, gridWidth).forEach(({ newX, newY }) => {
        if (grid[newX][newY].charCodeAt(0) - grid[x][y].charCodeAt(0) > 1) {
          // too steep
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

function multipleStarts() {
  const startNode = { x: 0, y: 0 };
  const possibleStarts: { x: number; y: number }[] = [];
  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      if (grid[x][y] === "a") {
        possibleStarts.push({ x, y });
      } else if (grid[x][y] === "S") {
        startNode.x = x;
        startNode.y = y;
      }
    }
  }

  grid[startNode.x][startNode.y] = "a";
  let minSteps = Infinity;

  possibleStarts.forEach((newStart) => {
    grid[newStart.x][newStart.y] = "S";
    const newTrail = findFewestSteps();
    minSteps = Math.min(newTrail, minSteps);
    grid[newStart.x][newStart.y] = "a";
  });
  return minSteps;
}

const partOne = findFewestSteps();
const partTwo = multipleStarts();

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
