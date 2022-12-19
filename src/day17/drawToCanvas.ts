// draw the code in the html canvas
export function drawToCanvas(cave: string[][]) {
  const copy = [...cave].reverse().map((cell) => cell);
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;
  const size = 12;

  copy.forEach((line, yIndex) => {
    line.forEach((pixel, xIndex) => {
      if (pixel === "#") {
        ctx.fillStyle = "red";
      } else if (pixel === "-") {
        ctx.fillStyle = "green";
      } else if (pixel === ".") {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(xIndex * size, yIndex * size, size, size);
    });
  });
}
