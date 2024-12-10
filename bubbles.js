function Bubbles(ctx) {
  this.drawBubbles = function (bubbleArr,canvas) {
    bubbleArr.forEach((bubble) => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "ghostwhite";
      ctx.lineWidth = 1;
      ctx.stroke();
      bubble.y -= bubble.speed;
      if (bubble.y <= 0) {
        bubble.y = canvas.height;
      }
    });
  };
}

export {Bubbles}
