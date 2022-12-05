// Advent of Code day 5
// https://adventofcode.com/2022/day/5

import { rawInput } from "./rawInput";

const [rawStacks, instructions] = rawInput.split("\n\n").map((lines) => lines.split("\n"));
const numOfStacks = rawStacks.pop()?.trim().split("  ").length;

function createStacks() {
  const stacks: string[][] = Array.from(Array(numOfStacks), () => new Array(0));
  console.log({ rawStacks });
  rawStacks.forEach((stackRow) => {
    let currStackNum = 0;
    // console.log({ stackRow });
    for (let i = 0; i < stackRow.length; i++) {
      // console.log({ i });
      const currChar = stackRow[i];
      // console.log({ currChar });
      if (currChar === " ") {
        currStackNum += 1;
        i += 3;
        continue;
      }
      if (currChar !== "[") {
        // console.log({ currStackNum });
        stacks[currStackNum].unshift(currChar);
        // console.log(stacks[currStackNum]);
        currStackNum += 1;
        i += 3;
      }
    }
  });
  return stacks;
}

// console.log({ stacks });
const partOneStack = createStacks();
instructions.forEach((line) => {
  const [amount, move] = line.split(" from ");
  const numberToMove = Number(amount.split(" ")[1]);
  const [from, to] = move.split(" to ").map((x) => Number(x) - 1);

  // console.log({ numberToMove, from, to });

  for (let i = 0; i < numberToMove; i++) {
    const box = partOneStack[from].pop();
    // console.log({ box });
    if (box) partOneStack[to].push(box);
  }
  // console.log("fromStack: ", partOneStack[from]);
  // console.log("toStack: ", partOneStack[to]);
});

const partOne = partOneStack.reduce((acc, curr) => {
  return (acc += curr.at(-1));
}, "");

const partTwoStack = createStacks();
instructions.forEach((line) => {
  const [amount, move] = line.split(" from ");
  const numberToMove = Number(amount.split(" ")[1]);
  const [from, to] = move.split(" to ").map((x) => Number(x) - 1);

  // console.log({ numberToMove, from, to });

  const boxes = partTwoStack[from].splice(-numberToMove);
  // console.log({ boxes });
  partTwoStack[to] = [...partTwoStack[to], ...boxes];

  // console.log("fromStack: ", partTwoStack[from]);
  // console.log("toStack: ", partTwoStack[to]);
});

const partTwo = partTwoStack.reduce((acc, curr) => {
  return (acc += curr.at(-1));
}, "");

console.log({ partOne });
console.log({ partTwo });

// document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
