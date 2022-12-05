// Advent of Code day 5
// https://adventofcode.com/2022/day/5

import { rawInput } from "./rawInput";

const [rawStacks, instructions] = rawInput.split("\n\n").map((lines) => lines.split("\n"));
const numOfStacks = rawStacks.pop()?.trim().split("  ").length;

const parsedInstructions = instructions.map((line) => {
  const [amount, move] = line.split(" from ");
  const numberToMove = Number(amount.split(" ")[1]);
  const [from, to] = move.split(" to ").map((x) => Number(x) - 1);
  return { numberToMove, from, to };
});

// stacks mutate so create new ones for part one and two
function createStacks() {
  const stacks: string[][] = Array.from(Array(numOfStacks), () => new Array(0));
  rawStacks.forEach((stackRow) => {
    let currStackNum = 0;
    for (let i = 0; i < stackRow.length; i++) {
      const currChar = stackRow[i];
      if (currChar === " ") {
        currStackNum += 1;
        i += 3;
      } else if (currChar !== "[") {
        stacks[currStackNum].unshift(currChar);
        currStackNum += 1;
        i += 3;
      }
    }
  });
  return stacks;
}

const partOneStack = createStacks();
parsedInstructions.forEach(({ numberToMove, from, to }) => {
  for (let i = 0; i < numberToMove; i++) {
    const box = partOneStack[from].pop();
    if (box) partOneStack[to].push(box);
  }
});

const partOne = partOneStack.reduce((acc, curr) => {
  return (acc += curr.at(-1));
}, "");

const partTwoStack = createStacks();
parsedInstructions.forEach(({ numberToMove, from, to }) => {
  const boxes = partTwoStack[from].splice(-numberToMove);
  partTwoStack[to].push(...boxes);
});

const partTwo = partTwoStack.reduce((acc, curr) => {
  return (acc += curr.at(-1));
}, "");

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
