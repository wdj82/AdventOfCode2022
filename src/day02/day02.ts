// Advent of Code day 2
// https://adventofcode.com/2022/day/2

import { rawInput } from "./rawInput";

const rounds = rawInput.split("\n").map((plays) => plays.split(" "));

const partOne = rounds.reduce((acc, curr) => {
  const [player1, player2] = curr;
  if (player2 === "X") {
    // we played rock
    let choiceScore = 1;
    if (player1 === "A") {
      // vs rock
      choiceScore += 3;
    }
    if (player1 === "C") {
      // vs scissors
      choiceScore += 6;
    }
    // lose
    return acc + choiceScore;
  } else if (player2 === "Y") {
    // we played paper
    let choiceScore = 2;
    if (player1 === "A") {
      // vs rock
      choiceScore += 6;
    }
    if (player1 === "B") {
      // vs paper
      choiceScore += 3;
    }
    // lose
    return acc + choiceScore;
  } else if (player2 === "Z") {
    // we played scissors
    let choiceScore = 3;
    if (player1 === "B") {
      // vs paper
      choiceScore += 6;
    }
    if (player1 === "C") {
      // vs scissors
      choiceScore += 3;
    }
    // lose
    return acc + choiceScore;
  }
  return acc;
}, 0);

const partTwo = rounds.reduce((acc, curr) => {
  const [player1, endScore] = curr;

  if (player1 === "A") {
    // they choose rock
    if (endScore === "X") {
      // need to lose - we choose scissors
      return acc + 3;
    }
    if (endScore === "Y") {
      // need to draw - we choose rock
      return acc + 1 + 3;
    }
    // need to win - we choose paper
    return acc + 2 + 6;
  } else if (player1 === "B") {
    // they choose paper
    if (endScore === "X") {
      // need to lose - we choose rock
      return acc + 1;
    }
    if (endScore === "Y") {
      // need to draw - we choose paper
      return acc + 2 + 3;
    }
    // need to win - we choose scissors
    return acc + 3 + 6;
  } else if (player1 === "C") {
    //they choose scissors
    if (endScore === "X") {
      // need to lose - we choose paper
      return acc + 2;
    }
    if (endScore === "Y") {
      // need to draw - we choose scissors
      return acc + 3 + 3;
    }
    // need to win - we choose rock
    return acc + 1 + 6;
  }
  return acc;
}, 0);

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
