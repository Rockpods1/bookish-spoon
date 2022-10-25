const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Init word
let randomWord;

// Init score
let score = 0;

// Focus on text on start
text.focus();

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>YOUR PEOPLE ARE DEAD</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    destroyNearestNuke();

    // Clear
    e.target.value = "";
  }
});

const FPS = 30; //Frames per second
const STROKE_WIDTH = 4;
//Nuke properties
const NUKES_NUM = 8; //Starting number of nukes
const NUKE_SIZE = 10; //Nuke size in pixels
const NUKE_SPEED = 50; //Nuke speed
const NUKE_VERT = 10;

//Silo properties
const SILOS_NUM = 5;
const SILO_SIZE = 10;

//Target properties
const TARGET_SIZE = 30;
const TARGET_X = 470;
const TARGET_Y = 505;
const TARGET_RADIUS = 110;
const CRITICAL_RADIUS = 100;
/* @type {HMTLCanvasElement} */

var isGameLost = false;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var image = new Image();
image.src = "resources/strategic_map.jpg";
image.onload = function () {
  scaleToFit(this);
};

function scaleToFit(img) {
  // get the scale
  var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = canvas.width / 2 - (img.width / 2) * scale;
  var y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

var silos = [];
var nukes = [];
createSilos();
createNukes();

//Game Loop
setInterval(update, 1000 / FPS);

function createSilos() {
  silos = [
    { x: 1150, y: 390 },
    { x: 1250, y: 310 },
    { x: 1320, y: 360 },
    { x: 1510, y: 290 },
    { x: 1650, y: 315 },
  ];
}

function createNukes() {
  if(nukes.length<NUKES_NUM) {
    var siloIndex = Math.abs(Math.floor(Math.random() * 1000)) % SILOS_NUM;
    x = silos[siloIndex].x;
    y = silos[siloIndex].y;

    nukes.push(newNuke(x, y));
  }
  
}

function newNuke(x, y) {
  var nuke = {
    x: x,
    y: y,
    xVelocity:
      (NUKE_SPEED / FPS) *
      ((TARGET_X - x) /
        Math.sqrt(
          (TARGET_X - x) * (TARGET_X - x) + (TARGET_Y - y) * (TARGET_Y - y)
        )),
    yVelocity:
      (NUKE_SPEED / FPS) *
      ((TARGET_Y - y) /
        Math.sqrt(
          (TARGET_X - x) * (TARGET_X - x) + (TARGET_Y - y) * (TARGET_Y - y)
        )),
    radius: NUKE_SIZE,
    angle: Math.random() * Math.PI * 2,
    vertices: Math.floor(Math.random() * (NUKE_VERT + 1) + NUKE_VERT / 2),
  };
  return nuke;
}

function drawNukes() {
  ctx.drawImage(image, 0, 0);
  ctx.strokeStyle = "red";
  ctx.lineWidth = STROKE_WIDTH;
  for (var i = 0; i < nukes.length; i++) {
    //Get nuke properties
    x = nukes[i].x;
    y = nukes[i].y;
    radius = nukes[i].radius;
    angle = nukes[i].angle;
    vertices = nukes[i].vertices;
    //Draw a path
    ctx.beginPath();
    ctx.moveTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));

    //Draw the polygon

    for (var j = 0; j < vertices; j++) {
      ctx.lineTo(
        x + radius * Math.cos(angle + (j * Math.PI * 2) / vertices),
        y + radius * Math.sin(angle + (j * Math.PI * 2) / vertices)
      );
    }
    ctx.closePath();
    ctx.stroke();
  }
}
function drawSilos() {
  ctx.strokeStyle = "darkred";
  ctx.lineWidth = STROKE_WIDTH;
  for (var i = 0; i < silos.length; i++) {
    x = silos[i].x;
    y = silos[i].y;

    ctx.beginPath();
    ctx.rect(x, y, SILO_SIZE, SILO_SIZE);
    ctx.stroke();
  }
}
function drawTarget() {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = STROKE_WIDTH;

  ctx.beginPath();
  ctx.arc(TARGET_X, TARGET_Y, TARGET_RADIUS, 0, 2 * Math.PI);
  ctx.stroke();
}

function move() {
  //Move Nukes
  for (var i = 0; i < NUKES_NUM; i++) {
    nukes[i].x += nukes[i].xVelocity;
    nukes[i].y += nukes[i].yVelocity;
  }
}

function checkForCollisions() {
  for (var i = 0; i < nukes.length; i++) {
    if (
      distBetweenPoints(TARGET_X, TARGET_Y, nukes[i].x, nukes[i].y) <
      CRITICAL_RADIUS
    ) {
      isGameLost = true;
      return;
    }
  }
}
function destroyNearestNuke() {
  var closestNukeIndex = 0;
  var closestNukeDistance = 1000;
  for (var i = 0; i < nukes.length; i++) {
    if (
      distBetweenPoints(TARGET_X, TARGET_Y, nukes[i].x, nukes[i].y) <
      closestNukeDistance
    ) {
      closestNukeDistance = distBetweenPoints(
        TARGET_X,
        TARGET_Y,
        nukes[i].x,
        nukes[i].y
      );
      closestNukeIndex = i;
    }
  }
  nukes.splice(closestNukeIndex,1);
  createNukes();
}
function update() {
  // Draw Space

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Asteroids
  createNukes();

  drawNukes();
  drawSilos();
  drawTarget();
  checkForCollisions();
  if (!isGameLost) {
    move();
  } else {
    gameOver();
  }
  //Move the nukes

  //Handle edge of screen
}
