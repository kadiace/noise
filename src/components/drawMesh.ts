import { TRIANGULATION } from 'components/triangulation';

import { Face, Keypoint } from '@tensorflow-models/face-landmarks-detection';

const drawPath = (
  ctx: CanvasRenderingContext2D,
  points: Keypoint[],
  closePath: boolean,
) => {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  if (closePath) region.closePath();
  ctx.strokeStyle = 'black';
  ctx.stroke(region);
};

export const drawMesh = (prediction: Face, ctx: CanvasRenderingContext2D) => {
  if (!prediction) return;
  const keyPoints = prediction.keypoints;
  if (!keyPoints) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < TRIANGULATION.length / 3; i += 1) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => keyPoints[index]);
    drawPath(ctx, points, true);
  }
  keyPoints.forEach((keyPoint) => {
    ctx.beginPath();
    ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);
    ctx.fillStyle = 'aqua';
    ctx.fill();
  });
};
