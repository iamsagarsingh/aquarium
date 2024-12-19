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

function grassUpdate() {
  // Initialize grass blades
  for (let i = 0; i < grassBladeCount; i++) {
    const x = (canvas.width / grassBladeCount) * i; // Spread evenly across width
    grassBlades.push({
      x: x,
      y: canvas.height - 10, // Bottom of canvas
      height: grassHeight + Math.random() * 200, // Random heights
      swayOffset: Math.random() * Math.PI * 2, // Random start angle for sway
    });
  }
}

let time = 0;

// fishes
// Variables to track touch
let touchX = null;
let touchY = null;
let isTouching = false;

// Prevent long-press context menu
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Prevent text selection and touch hold behavior
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});

// Event Listeners for touch
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault()
  const touch = e.touches[0];
  touchX = touch.clientX;
  touchY = touch.clientY;
  isTouching = true;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault()
  const touch = e.touches[0];
  touchX = touch.clientX;
  touchY = touch.clientY;
});

canvas.addEventListener("touchend", () => {
  touchX = null;
  touchY = null;
  isTouching = false;
});

function updateFish(fish) {
  if (isTouching && touchX !== null && touchY !== null) {
    // Calculate angle to touch point
    const dx = touchX - fish.x;
    const dy = touchY - fish.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Stop the fish when close to the touch point
    if (distance < 5) {
      fish.dx = 0;
      fish.dy = 0;
      // return;
    }

    // Calculate angle to the touch point and move towards it
    const angle = Math.atan2(dy, dx);
    fish.dx = Math.cos(angle) * fish.speed;
    fish.dy = Math.sin(angle) * fish.speed;
    fish.rotate = angle; // Rotate the fish towards the touch point
  } else {
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
  fish.x += fish.dx;
  fish.y += fish.dy;
}

// Bubbles
const bubbleArr = [];
for (let i = 0; i <= 5; i++) {
  bubbleArr.push({
    x: Math.random() * canvas.width,
    y: canvas.height,
    speed: Math.random() * 2 + 1,
    radius: Math.random() * 15 + 10,
  });
}

// Music
const backgroundMusic = document.getElementById("backgroundMusic");
const music = document.getElementById("playMusic");

music.addEventListener("click", function (e) {
  const status = localStorage.getItem("playing");

  if (status === "true") {
    backgroundMusic.pause();
    localStorage.setItem("playing", false);
    music.textContent = "P";
  } else {
    backgroundMusic.play();
    backgroundMusic.volume = 0.01;
    music.textContent = "S";
    localStorage.setItem("playing", true);
  }
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  b.drawBubbles(bubbleArr, canvas);
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
