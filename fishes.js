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

    // Draw fins (left and right)
    const finLength = fish.minorAxis / 2;

    //  Left fin
    ctx.save();
    ctx.translate(fish.x, fish.y);
    ctx.rotate(fish.rotate);
    ctx.beginPath();
    ctx.moveTo(
      fish.majorAxis - fish.majorAxis / 6,
      -fish.majorAxis / 2 + fish.majorAxis / 4
    ); // Base of the left fin
    ctx.lineTo(
      finLength - fish.majorAxis / 3,
      -fish.minorAxis / 2 - finLength / 2
    ); // Tip of the left fin
    ctx.lineTo(
      -fish.majorAxis + fish.majorAxis,
      -fish.minorAxis / 2 - finLength - finLength / 2
    ); // Bottom of the left fin
    ctx.closePath();
    ctx.fillStyle = fish.color;
    ctx.fill();
    ctx.restore();

    // Right fin
    ctx.save();
    ctx.translate(fish.x, fish.y);
    ctx.rotate(fish.rotate);
    ctx.beginPath();
    ctx.moveTo(
      fish.majorAxis - fish.majorAxis / 6,
      fish.majorAxis / 2 - fish.majorAxis / 4
    );
    ctx.lineTo(
      finLength - fish.majorAxis / 3,
      fish.minorAxis / 2 - finLength / 2
    );
    ctx.lineTo(
      -fish.majorAxis + fish.majorAxis,
      fish.minorAxis / 2 + finLength + finLength / 2
    );
    ctx.closePath();
    ctx.fillStyle = fish.color;
    ctx.fill();
    ctx.restore();
  };
}

export { Fishes };
