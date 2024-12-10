import { Fishes } from "./fishes.js";
import { Grasses } from "./grasses.js";
import { fishEntry } from "./fishModule.js";
import { Bubbles } from "./bubbles.js";
const canvas = document.getElementById("aquarium");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate();
  grassUpdate();
}

const f = new Fishes(ctx, fishEntry);
const g = new Grasses(ctx);
const b = new Bubbles(ctx);

// grasses
const grassBlades = [];
const grassBladeCount = 20;
const grassHeight = 200;

function grassUpdate(){
// Initialize grass blades
for (let i = 0; i < grassBladeCount; i++) {
  const x = (canvas.width / grassBladeCount) * i; // Spread evenly across width
  grassBlades.push({
    x: x,
    y: canvas.height - 10, // Bottom of canvas
    height: grassHeight + Math.random() * 200, // Random heights
    swayOffset: Math.random() * Math.PI * 2, // Random start angle for sway
  });
}}

let time = 0;

// fishes
function updateFish(fish) {
  let angle, radAg;

  // Right wall collision
  if (fish.x > canvas.width - fish.majorAxis) {
    angle = Math.floor(Math.random() * (270 - 90)) + 90; // Random angle between 90° and 270°
  }

  // Top wall collision
  if (fish.y < fish.minorAxis) {
    angle = Math.floor(Math.random() * (180 - 0)) + 0; // Random angle between 0° and 180°
  }

  // Bottom wall collision
  if (fish.y > canvas.height - fish.minorAxis) {
    angle = Math.floor(Math.random() * (360 - 180)) + 180; // Random angle between 180° and 360°
  }

  // Left wall collision
  if (fish.x < fish.majorAxis) {
    angle = Math.floor(Math.random() * (90 - 0)) + 0; // Random angle between 0° and 90°
    angle += Math.random() > 0.5 ? 270 : 0; // Extend to 270° to 360°
  }

  // Calculate angle in radians
  if (angle !== undefined) {
    radAg = angle * (Math.PI / 180);
    fish.rotate = radAg;
  }

  // Move the fish based on its rotation and direction
  if (radAg !== undefined) {
    fish.dx = Math.cos(radAg) * fish.speed;
    fish.dy = Math.sin(radAg) * fish.speed;
    fish.x += fish.dx;
    fish.y += fish.dy;
  } else {
    // Continue moving in the same direction
    fish.x += fish.dx;
    fish.y += fish.dy;
  }
}

// Bubbles
const bubbleArr = []
for(let i=0;i<=5;i++){
  bubbleArr.push({
    x: Math.random()*canvas.width,
    y: canvas.height,
    speed: Math.random()*2 + 1,
    radius: Math.random()*15 + 10
  })
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  b.drawBubbles(bubbleArr,canvas)
  grassBlades.forEach((blade) => {
    g.drawGrass(blade, time);
  });
  time += 0.05;
  fishEntry.forEach((fish) => {
    f.drawFish(fish);
    updateFish(fish);
  });

  requestAnimationFrame(animate); // Loop the animation
}

resizeCanvas();
