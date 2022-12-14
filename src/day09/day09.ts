// Advent of Code day 9
// https://adventofcode.com/2022/day/9

interface Knot {
  x: number;
  y: number;
}

import { rawInput } from "./rawInput";

const instructions = rawInput.split("\n").map((line) => line.split(" "));

function isTouching(knot: Knot, prevKnot: Knot) {
  const distance = Math.abs(knot.x - prevKnot.x) + Math.abs(knot.y - prevKnot.y);
  if (knot.x === prevKnot.x || knot.y === prevKnot.y) {
    return distance <= 1;
  }
  return distance === 2;
}

function simulateKnots(numOfKnots: number) {
  const knots: Knot[] = [...Array(numOfKnots)].map(() => ({ x: 0, y: 0 }));
  const visited = new Set([JSON.stringify({ x: 0, y: 0 })]);

  instructions.forEach(([move, distance]) => {
    const delta = move === "D" || move === "L" ? -1 : 1;
    const axis = move === "U" || move === "D" ? "x" : "y";

    for (let i = 0; i < Number(distance); i++) {
      // move head
      knots[0][axis] += delta;

      // check all other knots with its prev knot if it needs to move
      for (let i = 1; i < knots.length; i++) {
        const knot = knots[i];
        const prevKnot = knots[i - 1];
        if (!isTouching(knot, prevKnot)) {
          const xDist = Math.sign(prevKnot.x - knot.x);
          const yDist = Math.sign(prevKnot.y - knot.y);
          knot.x += xDist;
          knot.y += yDist;

          // save where tail has been
          if (i === knots.length - 1) visited.add(JSON.stringify(knot));
        }
      }
    }
  });
  return visited.size;
}

const partOne = simulateKnots(2);
const partTwo = simulateKnots(10);

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
