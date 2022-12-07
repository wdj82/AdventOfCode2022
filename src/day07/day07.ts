// Advent of Code day 7
// https://adventofcode.com/2022/day/7

import { rawInput } from "./rawInput";

interface File {
  size: number;
  name: string;
}

interface Directory {
  files: File[];
  directories: string[];
  totalSize: number;
  parentDir: string | null;
}

// don't need to save directories or files for today's solution but keeping for possible future problems
const fileSystem: Record<string, Directory> = { "/": { files: [], directories: [], totalSize: 0, parentDir: null } };

let currentDirectory = "/";

const lines = rawInput.split("\n");

function updateParents(directoryName: string, size: number) {
  const dir = fileSystem[directoryName];
  dir.totalSize += size;
  if (dir.parentDir) updateParents(dir.parentDir, size);
}

lines.forEach((line) => {
  if (line.startsWith("$ cd")) {
    const newDir = line.slice(5);
    if (newDir === "/") {
      currentDirectory = "/";
    } else if (newDir === "..") {
      currentDirectory = fileSystem[currentDirectory].parentDir ?? "/";
    } else {
      currentDirectory += newDir + "/";
    }
  } else if (line.startsWith("dir")) {
    // save absolute path
    const newDir = currentDirectory + line.slice(4) + "/";
    fileSystem[currentDirectory].directories.push(newDir);
    fileSystem[newDir] = { files: [], directories: [], totalSize: 0, parentDir: currentDirectory };
  } else if (line !== "$ ls") {
    const [size, name] = line.split(" ");
    const dir = fileSystem[currentDirectory];
    dir.files.push({ size: Number(size), name });
    dir.totalSize += Number(size);
    if (dir.parentDir) updateParents(dir.parentDir, Number(size));
  }
});

console.log({ fileSystem });

const partOne = Object.values(fileSystem).reduce((acc, curr) => {
  if (curr.totalSize <= 100000) return acc + curr.totalSize;
  return acc;
}, 0);
console.log({ partOne });

const unusedSpace = 70000000 - fileSystem["/"].totalSize;
const neededSpace = 30000000 - unusedSpace;

const partTwo = Object.values(fileSystem).reduce(
  (acc, dir) => (dir.totalSize >= neededSpace ? Math.min(acc, dir.totalSize) : acc),
  Infinity
);

console.log({ partTwo });
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
