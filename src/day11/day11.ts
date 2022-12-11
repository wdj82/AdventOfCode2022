// Advent of Code day 11
// https://adventofcode.com/2022/day/11

import { rawInput } from "./rawInput";

interface Monkey {
  items: number[];
  test: number;
  operation: (item: number) => number;
  success: number;
  fail: number;
  modProduct: number;
}

const allRules = rawInput.split("\n\n").map((monkey) => monkey.split("\n"));

function createMonkeys() {
  const monkeys: Monkey[] = allRules.reduce((acc, rules) => {
    const newMonkey: Monkey = {
      items: [],
      test: -1,
      success: -1,
      fail: -1,
      operation: () => 0,
      modProduct: -1,
    };

    const items = rules[1].replace("Starting items: ", "").split(", ").map(Number);
    newMonkey.items = items;

    const [operation, amount] = rules[2].replace("Operation: new = old ", "").split(" ");
    newMonkey.test = Number(rules[3].replace("Test: divisible by ", ""));
    newMonkey.success = Number(rules[4].trim().replace("If true: throw to monkey ", ""));
    newMonkey.fail = Number(rules[5].trim().replace("If false: throw to monkey ", ""));

    newMonkey.operation = (item: number) => {
      let value = Number(amount);
      if (isNaN(value)) {
        value = item;
      }
      return operation === "*" ? value * item : value + item;
    };

    return [...acc, newMonkey];
  }, [] as Monkey[]);

  return monkeys;
}

function monkeyBusiness() {
  const monkeys = createMonkeys();
  const inspected: number[] = new Array(monkeys.length).fill(0);

  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey, index) => {
      inspected[index] += monkey.items.length;
      while (monkey.items.length) {
        const item = monkey.items.shift();
        if (!item) return;
        const newWorry = monkey.operation(item);
        const loweredWorry = Math.floor(newWorry / 3);
        const passed = loweredWorry % monkey.test === 0;
        const newMonkey = passed ? monkey.success : monkey.fail;
        monkeys[newMonkey].items.push(loweredWorry);
      }
    });
  }

  inspected.sort((a, b) => b - a);
  return inspected[0] * inspected[1];
}

function monkeyBusiness2() {
  const monkeys = createMonkeys();
  const inspected: number[] = new Array(monkeys.length).fill(0);
  const modProduct = monkeys.reduce((acc: number, monkey: Monkey) => acc * monkey.test, 1);

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey, index) => {
      inspected[index] += monkey.items.length;
      while (monkey.items.length) {
        const item = monkey.items.shift();
        if (!item) return;
        const newWorry = monkey.operation(item);
        // console.log({ newWorry, modProduct }, newWorry % modProduct);
        const passed = newWorry % monkey.test === 0;
        const newMonkey = passed ? monkey.success : monkey.fail;
        monkeys[newMonkey].items.push(newWorry % modProduct);
      }
    });
  }

  inspected.sort((a, b) => b - a);
  return inspected[0] * inspected[1];
}

const partOne = monkeyBusiness();
const partTwo = monkeyBusiness2();
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

