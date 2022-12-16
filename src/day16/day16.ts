// Advent of Code day 16
// https://adventofcode.com/2022/day/16

import PriorityQueue from "./priorityQueue";
import { rawInput } from "./rawInput";

interface Node {
  valve: string;
  flowRate: number;
  tunnels: readonly string[];
  open: boolean;
}

const allValves: string[] = [];
const flowRateValves: string[] = [];

const tunnels = rawInput
  .split("\n")
  .map((line) => line.split("; "))
  .reduce((acc, [valveString, tunnelsString]) => {
    const valve = valveString.slice(6, 8);
    const flowRate = Number(valveString.slice(23));
    let tunnels: string[];
    if (tunnelsString.includes("valves")) {
      tunnels = tunnelsString.slice(23).split(", ");
    } else {
      tunnels = [tunnelsString.slice(22)];
    }
    allValves.push(valve);
    if (flowRate > 0) {
      flowRateValves.push(valve);
    }
    return { ...acc, [valve]: { valve, flowRate, tunnels, open: false } };
  }, {} as Record<string, Node>);

console.log({ tunnels });

function findFewestSteps(start: string, end: string) {
  const distances: Record<string, number> = {};
  const prev: Record<string, string> = {};

  const nodes = new PriorityQueue();

  allValves.forEach((valve) => {
    if (valve === start) {
      distances[valve] = 0;
      nodes.enqueue(valve, 0);
    } else {
      distances[valve] = Infinity;
      nodes.enqueue(valve, Infinity);
    }
  });

  while (!nodes.isEmpty()) {
    const currNode = nodes.dequeue().value;

    if (currNode === end) {
      const out: string[] = [];
      let curr = end;
      while (prev[curr]) {
        out.push(curr);
        curr = prev[curr];
      }

      return out.length + 1;
    }

    if (distances[currNode] !== Infinity) {
      tunnels[currNode].tunnels.forEach((tunnel) => {
        const possibleNewMinDistance = distances[currNode] + 1;

        if (possibleNewMinDistance < distances[tunnel]) {
          distances[tunnel] = possibleNewMinDistance;
          nodes.enqueue(tunnel, possibleNewMinDistance);
          prev[tunnel] = currNode;
        }
      });
    }
  }

  throw new Error("something went wrong");
}

const savedPaths = new Map();
const savedTotals = new Map();

function openValves(currentValve: string, closedValves: string[], time: number): number {
  const nextValves = closedValves.filter((valve) => valve != currentValve);

  if (savedTotals.has(`${currentValve},${[...closedValves]},${time}`)) {
    return savedTotals.get(`${currentValve},${[...closedValves]},${time}`);
  }

  let bestFlow = 0;
  nextValves.forEach((valve) => {
    let steps = 0;
    if (savedPaths.has(`${currentValve}->${valve}`)) {
      steps = savedPaths.get(`${currentValve}->${valve}`);
    } else {
      steps = findFewestSteps(currentValve, valve);
      savedPaths.set(`${currentValve}->${valve}`, steps);
    }

    const timeLeft = time - steps;
    if (timeLeft > 0) {
      const flow = tunnels[valve].flowRate * timeLeft + openValves(valve, nextValves, timeLeft);

      bestFlow = Math.max(flow, bestFlow);
    }
  });
  savedTotals.set(`${currentValve},${[...closedValves]},${time}`, bestFlow);
  return bestFlow;
}
// const test = 1n
const result = openValves("AA", flowRateValves, 30);
console.log({ result });

console.log({ savedPaths });

const partOne = "partOne";
const partTwo = "partTwo";

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
