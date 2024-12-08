function Fishes(ctx, fish) {
  this.drawFish = function (fish) {
    // Elipse
    ctx.beginPath();
    ctx.ellipse(
      fish.x,
      fish.y,
      fish.majorAxis,
      fish.minorAxis,
      fish.rotate,
      0,
      Math.PI * 2
    ); // Fish body
    ctx.fillStyle = fish.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // Calculate tail position
    const tailLength = fish.minorAxis; // Tail length
    const tailAngle = fish.rotate + Math.PI; // Opposite direction of the head
    const tailX = fish.x - Math.cos(fish.rotate) * fish.majorAxis; // Tail x at the end of ellipse
    const tailY = fish.y - Math.sin(fish.rotate) * fish.majorAxis; // Tail y at the end of ellipse

    // Draw the tail
    ctx.save();
    ctx.translate(tailX, tailY); // Move to tail position
    ctx.rotate(tailAngle); // Rotate the tail opposite to the head
    ctx.beginPath();
    ctx.moveTo(0, 0); // Tail tip
    ctx.lineTo(tailLength, tailLength); // Top tail fin
    ctx.lineTo(tailLength, -tailLength); // Bottom tail fin
    ctx.closePath();
    ctx.fillStyle = fish.color;
    ctx.fill();
    ctx.restore();
  };
}

export {Fishes}