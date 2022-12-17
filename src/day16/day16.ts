// Advent of Code day 16
// https://adventofcode.com/2022/day/16

import PriorityQueue from "./priorityQueue";
import { rawInput } from "./rawInput";

interface Node {
  flowRate: number;
  tunnels: readonly string[];
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
    return { ...acc, [valve]: { flowRate, tunnels } };
  }, {} as Record<string, Node>);

const savedPaths = new Map();
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
      const steps = out.length;
      savedPaths.set(`${start}->${end}`, steps);
      savedPaths.set(`${end}->${start}`, steps);

      return out.length;
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

const savedTotals = new Map();

function calculatePaths(
  currentValve: string,
  unOpenedValves: string[],
  timeLeft: number,
  otherPlayers: number
): number {
  if (timeLeft <= 0) {
    // for part two the elephant will go after us
    // he's at the start position, with 26 minutes again, but only with valves we haven't unopened
    return otherPlayers > 0 ? calculatePaths("AA", unOpenedValves, 26, otherPlayers - 1) : 0;
  }

  let bestFlow = 0;

  // return memoized result of this state
  const key = `${currentValve},[${[...unOpenedValves]}],${timeLeft * 2},${otherPlayers}`;
  if (savedTotals.has(key)) {
    return savedTotals.get(key);
  }

  // unopened valves without current valve
  const newValves = unOpenedValves.filter((valve) => valve !== currentValve);

  // current valve is unopened (check for AA that has no flow rate)
  if (currentValve !== "AA" && unOpenedValves.includes(currentValve)) {
    // open this valve
    const newFlow = (timeLeft - 1) * tunnels[currentValve].flowRate;
    // calculate best score possible with this state of: one minute passed, this valve open
    bestFlow = Math.max(bestFlow, newFlow + calculatePaths(currentValve, newValves, timeLeft - 1, otherPlayers));
  }

  // try walking to other unopened valves without opening this valve
  newValves.forEach((nextValve) => {
    const steps = findFewestSteps(currentValve, nextValve);
    // calculate best score possible with this state of: time of travel has passed, did not open valve, walked to another unopened valve
    bestFlow = Math.max(bestFlow, calculatePaths(nextValve, unOpenedValves, timeLeft - steps, otherPlayers));
  });

  // memoize this state
  savedTotals.set(key, bestFlow);

  return bestFlow;
}

const partOne = calculatePaths("AA", [...flowRateValves], 30, 0);
console.log({ partOne });
const partTwo = calculatePaths("AA", [...flowRateValves], 26, 1);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

