// draw the code in the html canvas
export function drawToCanvas(dots: string[][]) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const size = 12;
  ctx.fillStyle = "red";

  dots.forEach((line, yIndex) => {
    line.forEach((pixel, xIndex) => {
      if (pixel === "#") {
        ctx.fillRect(xIndex * size, yIndex * size, size, size);
      }
    });
  });
}

