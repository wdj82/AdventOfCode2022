// Advent of Code day 13
// https://adventofcode.com/2022/day/13

import { rawInput } from "./rawInput";

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

function compareLists(left: List, right: List): -1 | 0 | 1 {
  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);
    for (let i = 0; i < maxLength; i++) {
      if (left[i] === undefined) return -1;
      if (right[i] === undefined) return 1;

      const result = compareLists(left[i], right[i]);
      if (result !== 0) return result;
    }
    return 0;
  } else if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  } else {
    if (Array.isArray(left)) {
      return compareLists(left, [right]);
    }
    return compareLists([left], right);
  }
}

const partOne = rawInput.split("\n\n").reduce((acc, pair, index) => {
  const [leftArray, rightArray] = pair.split("\n").map((line) => JSON.parse(line));

  const { newList: left } = makeList(leftArray);
  const { newList: right } = makeList(rightArray);

  const result = compareLists(left, right);
  if (result === -1) return index + 1 + acc;

  return acc;
}, 0);

const partTwo = rawInput
  .concat("\n\n", "[[2]]", "\n", "[[6]]")
  .replace(/\n{2,}/g, "\n")
  .split("\n")
  .map((line) => JSON.parse(line))
  .sort((a, b) => {
    const { newList: left } = makeList(a);
    const { newList: right } = makeList(b);
    return compareLists(left, right);
  })
  .reduce((acc, packet, index) => {
    if (JSON.stringify(packet) === "[[2]]" || JSON.stringify(packet) === "[[6]]") return (index + 1) * acc;
    return acc;
  }, 1);

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
