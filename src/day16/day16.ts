// Advent of Code day 16
// https://adventofcode.com/2022/day/16

import PriorityQueue from "./priorityQueue";
import { testInput as rawInput } from "./rawInput";

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

function findFewestSteps(start: string, end: string) {
  if (savedPaths.has(`${start}->${end}`) || savedPaths.has(`${end}->${start}`)) {
    return savedPaths.get(`${start}->${end}`);
  }

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

      const steps = out.length + 1;
      savedPaths.set(`${start}->${end}`, steps);
      savedPaths.set(`${end}->${start}`, steps);

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
    const steps = findFewestSteps(currentValve, valve);

    const timeLeft = time - steps;
    if (timeLeft > 0) {
      const flow = tunnels[valve].flowRate * timeLeft + openValves(valve, nextValves, timeLeft);

      bestFlow = Math.max(flow, bestFlow);
    }
  });
  savedTotals.set(`${currentValve},${[...closedValves]},${time}`, bestFlow);
  return bestFlow;
}

const partOne = openValves("AA", flowRateValves, 30);
console.log({ partOne });

const bestFlowMap: Record<string, number> = {};

function recordPath(currentValve: string, time: number, path: string[], pathFlow: number) {
  const nextValves = flowRateValves.filter((valve) => !path.includes(valve));
  const pathKey = [...path].sort().join("");
  bestFlowMap[pathKey] = Math.max(bestFlowMap[pathKey] ?? 0, pathFlow);
  let bestFlow = 0;
  nextValves.forEach((valve) => {
    const timeLeft = time - findFewestSteps(currentValve, valve);
    if (timeLeft > 0) {
      let flow = tunnels[valve].flowRate * timeLeft;
      flow = recordPath(valve, timeLeft, [valve, ...path], flow + pathFlow);
      bestFlow = Math.max(flow, bestFlow);
    }
  });
  return bestFlow;
}

recordPath("AA", 26, [], 0);

function extendBestFlowMap(options: string[]) {
  const pathKey = options.join("");
  if (bestFlowMap[pathKey] === undefined) {
    let bestFlow = 0;
    options.forEach((option) => {
      const remaining = options.filter((o) => o !== option);
      bestFlow = Math.max(extendBestFlowMap(remaining), bestFlow);
    });
    bestFlowMap[pathKey] = bestFlow;
  }
  return bestFlowMap[pathKey];
}
flowRateValves.push("AA");
const keyValvesExpectAA = flowRateValves.filter((valve) => valve !== "AA").sort();
extendBestFlowMap(keyValvesExpectAA);

let partTwo = 0;
Object.keys(bestFlowMap).forEach((human) => {
  const elephant = keyValvesExpectAA.reduce((k, v) => (human.indexOf(v) ? k : k + v), "");
  partTwo = Math.max(partTwo, bestFlowMap[human] + bestFlowMap[elephant]);
});

console.log({ bestFlowMap });

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
