export function drawSoftPolygon(ctx, points, blur = 8) {
  if (!points || points.length === 0) return;

  ctx.save();

  ctx.beginPath();
  ctx.moveTo(points[0].x * 512, points[0].y * 512);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x * 512, points[i].y * 512);
  }

  ctx.closePath();

  ctx.shadowBlur = blur;
  ctx.shadowColor = "white";
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.restore();
}

export function clearMask(ctx) {
  ctx.clearRect(0, 0, 512, 512);
}
