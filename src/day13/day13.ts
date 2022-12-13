// Advent of Code day 13
// https://adventofcode.com/2022/day/13

import { testInput, rawInput } from "./rawInput";

const pairs = rawInput.split("\n\n");

type List = number | List[];

function makeList(array: (number | "[" | "]")[], currentIndex = 0): { newList: List[]; newIndex: number } {
  const stack = [];
  for (currentIndex; currentIndex < array.length; currentIndex++) {
    const element = array[currentIndex];
    if (element === "[") {
      const { newList, newIndex } = makeList(array, currentIndex + 1);
      currentIndex = newIndex;
      stack.push(newList);
      continue;
    }
    if (element === "]") {
      return { newList: stack, newIndex: currentIndex };
    }
    stack.push(element);
  }
  return { newList: stack, newIndex: currentIndex };
}

function checkLists(left: List, right: List): number | boolean {
  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);
    for (let i = 0; i < maxLength; i++) {
      if (left[i] === undefined) return true;
      if (right[i] === undefined) return false;

      const result = checkLists(left[i], right[i]);
      if (result !== 0) return result;
    }
    return 0;
  } else if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left < right) return true;
    if (left > right) return false;
    return 0;
  } else {
    if (Array.isArray(left)) {
      return checkLists(left, [right]);
    }
    return checkLists([left], right);
  }
}

const partOne = pairs.reduce((acc, pair, index) => {
  const [leftArray, rightArray] = pair.split("\n").map((line) => JSON.parse(line));

  const { newList: left } = makeList(leftArray);
  const { newList: right } = makeList(rightArray);

  const result = checkLists(left, right);
  if (result) return index + 1 + acc;

  return acc;
}, 0);

const partTwo = "partTwo";

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
