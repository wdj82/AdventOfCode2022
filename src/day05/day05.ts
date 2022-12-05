// Advent of Code day 5
// https://adventofcode.com/2022/day/5

import { testInput, rawInput } from "./rawInput";

const [rawStacks, instructions] = rawInput.split("\n\n").map((lines) => lines.split("\n"));

const numOfStacks = rawStacks.pop()?.trim().split("  ").length;
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

// console.log({ stacks });

instructions.forEach((line) => {
  const [amount, move] = line.split(" from ");
  const numberToMove = Number(amount.split(" ")[1]);
  const [from, to] = move.split(" to ").map((x) => Number(x) - 1);

  // console.log({ numberToMove, from, to });

  for (let i = 0; i < numberToMove; i++) {
    const box = stacks[from].pop();
    // console.log({ box });
    if (box) stacks[to].push(box);
  }
  // console.log("fromStack: ", stacks[from]);
  // console.log("toStack: ", stacks[to]);
});

const partOne = stacks.reduce((acc, curr) => {
  return (acc += curr.at(-1));
}, "");

console.log({ partOne });
const partTwo = "partTwo";
// document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
