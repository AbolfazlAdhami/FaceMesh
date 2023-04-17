export const drawMesh = (landmarks, ctx) => {
  if (landmarks.length > 0) {
    landmarks.forEach((landmark) => {
      const points = landmark.scaledMesh;
      for (let i = 0; i < points.length; i++) {
        const x = points[i][0];
        const y = points[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 3 * Math.PI);
        ctx.fillStyle = "#55efc4";
        ctx.fill();
      }
    });
  }
};
