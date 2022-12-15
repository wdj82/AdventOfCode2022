// Advent of Code day 15
// https://adventofcode.com/2022/day/15

import { rawInput } from "./rawInput";

interface Point {
  x: number;
  y: number;
}

const data = rawInput
  .split("\n")
  .map((lines) => lines.split(": "))
  .map(([sensorString, beaconString]) => {
    const [sensorX, sensorY] = sensorString
      .slice(10)
      .split(", ")
      .map((coord) => Number(coord.slice(2)));
    const [beaconX, beaconY] = beaconString
      .slice(21)
      .split(", ")
      .map((coord) => Number(coord.slice(2)));
    const radius = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    return { beacon: { x: beaconX, y: beaconY }, sensor: { x: sensorX, y: sensorY }, radius };
  });

function countNotBeacons(line: number) {
  const allBeacons = new Set();
  data.forEach(({ beacon }) => allBeacons.add(`${beacon.x},${beacon.y}`));

  const notBeacons = new Set();

  data.forEach(({ sensor, radius }) => {
    const distanceToLine = Math.abs(sensor.y - line);
    if (radius >= distanceToLine) {
      for (let i = sensor.x - (radius - distanceToLine); i <= sensor.x + (radius - distanceToLine); i++) {
        if (!allBeacons.has(`${i},${line}`)) {
          notBeacons.add(`${i},${line}`);
        }
      }
    }
  });
  return notBeacons.size;
}

function isAnySensorInRange(borderPoint: Point) {
  for (let i = 0; i < data.length; i++) {
    const { sensor, radius } = data[i];
    const distance = Math.abs(sensor.x - borderPoint.x) + Math.abs(sensor.y - borderPoint.y);
    if (distance <= radius) {
      return true;
    }
  }
  return false;
}

// for every sensor check every point of its border edge (radius + 1)
// if a point is not in range of any sensor we found the distress beacon
function findBeacon(size: number) {
  for (let i = 0; i < data.length; i++) {
    const { sensor } = data[i];
    const radius = data[i].radius + 1;

    for (let d = 0; d <= radius; d++) {
      const points = [
        { x: sensor.x + d, y: sensor.y - d + radius },
        { x: sensor.x + d, y: sensor.y + d - radius },
        { x: sensor.x - d, y: sensor.y - d + radius },
        { x: sensor.x - d, y: sensor.y + d - radius },
      ];

      const distressBeacon = points.find(({ x, y }) => {
        if (x < 0 || y < 0 || x > size || y > size) {
          return false;
        }

        const inRangeOfSensor = isAnySensorInRange({ x, y });
        return !inRangeOfSensor;
      });

      if (distressBeacon) {
        return distressBeacon.x * 4000000 + distressBeacon.y;
      }
    }
  }
  throw new Error("Did not find distress beacon");
}

// const partOne = countNotBeacons(10);
const partOne = countNotBeacons(2000000);
// const partTwo = findBeacon(20);
const partTwo = findBeacon(4000000);

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
