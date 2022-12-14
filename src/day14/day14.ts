// Advent of Code day 14
// https://adventofcode.com/2022/day/14

import { rawInput } from "./rawInput";

const SAND_SPAWN = [500, 0];

function range(size: number, start: number) {
  return Array.from(new Array(size), (_, i) => i + start);
}

function rockPaths(pointOne: number[], pointTwo: number[]) {
  const [x1, y1, x2, y2] = [...pointOne, ...pointTwo];
  if (x1 === x2) {
    return range(Math.abs(y1 - y2) + 1, Math.min(y1, y2)).map((coord) => [x2, coord]);
  }
  return range(Math.abs(x1 - x2) + 1, Math.min(x1, x2)).map((coord) => [coord, y2]);
}

function createCave() {
  const paths = rawInput.split("\n").map((line) => line.split(" -> ").map((coords) => coords.split(",").map(Number)));

  let maxY = paths[0][0][1];
  const pathCoords: number[][] = [];
  paths.forEach((path) => {
    for (let i = 1; i < path.length; i++) {
      maxY = Math.max(maxY, path[i][1]);
      pathCoords.push(...rockPaths(path[i - 1], path[i]));
    }
  });

  const cave: string[][] = [...Array(maxY + 1)].map(() => Array(SAND_SPAWN[0] * 2).fill("."));
  pathCoords.forEach(([x, y]) => (cave[y][x] = "#"));

  return cave;
}

function spawnSand(cave: string[][], [sandX, sandY]: number[]) {
  if (cave[sandY][sandX] !== "." || !cave[sandY + 1]) {
    // cannot spawn
    return false;
  }

  if (cave[sandY + 1][sandX] === ".") {
    // move sand down
    return [sandX, sandY + 1];
  }
  if (cave[sandY + 1][sandX - 1] === ".") {
    // move sand down and left
    return [sandX - 1, sandY + 1];
  }
  if (cave[sandY + 1][sandX + 1] === ".") {
    // move sand down and right
    return [sandX + 1, sandY + 1];
  }
  // settled
  return true;
}

function countSand(isPartTwo = false) {
  const cave = createCave();
  if (isPartTwo) {
    const width = cave[0].length;
    cave.push(new Array(width).fill("."), new Array(width).fill("#"));
  }

  let count = 0;
  let sand = SAND_SPAWN;
  let finished = false;
  while (!finished) {
    const result = spawnSand(cave, sand);

    if (result === true) {
      cave[sand[1]][sand[0]] = "o";
      sand = SAND_SPAWN;
      count += 1;
    } else if (result === false) {
      finished = true;
    } else {
      sand = result;
    }
  }
  return count;
}

const partOne = countSand();
const partTwo = countSand(true);

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
