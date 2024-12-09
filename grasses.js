function Grasses(ctx) {
  this.drawGrass = function (blade,time) {
    const sway = Math.sin(time + blade.swayOffset) * 5; // Sway amount

    // Draw blade of grass
    ctx.beginPath();
    ctx.moveTo(blade.x, blade.y); // Start at the bottom
    ctx.quadraticCurveTo(
      blade.x + sway, // Control point for curve (swaying)
      blade.y - blade.height / 2, // Midpoint of the blade
      blade.x, // End point x (top of the blade)
      blade.y - blade.height // End point y (top of the blade)
    );
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
}

export {Grasses}