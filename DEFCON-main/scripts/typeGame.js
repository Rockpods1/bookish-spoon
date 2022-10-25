// List of words for game
const words = [
  "airplane",
  "highfalutin",
  "superficial",
  "replacement",
  "membership",
  "percentage",
  "recording",
  "appointment",
  "connection",
  "technology",
  "introduction",
  "negotiation",
  "pollution",
  "foundation",
  "departure",
  "operation",
  "professor",
  "atmosphere",
  "refrigerator",
  "recognition",
  "information",
  "collection",
  "population",
  "contribution",
  "signature",
  "president",
  "opportunity",
  "investment",
  "initiative",
  "discussion",
  "boyfriend",
  "assistance",
  "significance",
  "preparation",
  "assistant",
  "agreement",
  "reputation",
  "protection",
  "historian",
  "possession",
  "excitement",
  "attention",
  "explanation",
  "definition",
  "maintenance",
  "permission",
  "reception",
  "friendship",
  "indication",
  "chocolate",
  "independence",
  "administration",
  "measurement",
  "preparation",
  "establishment",
  "championship",
  "transportation",
  "association",
  "entertainment",
  "application",
  "manufacturer",
  "instruction",
  "requirement",
  "possibility",
  "grandmother",
  "recommendation",
  "recognition",
  "combination",
  "consequence",
  "description",
  "imagination",
  "replacement",
  "improvement",
  "responsibility",
  "competition",
  "conversation",
  "temperature",
  "contribution",
  "distribution",
  "significance",
  "examination",
  "opportunity",
  "construction",
  "supermarket",
  "interaction",
  "introduction",
  "satisfaction",
  "independence",
  "advertising",
  "celebration",
  "perspective",
  "development",
  "personality",
  "negotiation",
  "explanation",
  "maintenance",
  "relationship",
  "environment",
  "administration",
  "refrigerator",
  "organization",
  "communication",
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
      
      <button onclick="location.reload()">Restart Game</button>
    `;

  word.innerHTML = "YOU HAVE BEEN DEFEATED";
  text.remove();

  endgameEl.style.display = "flex";
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    Nuke.destroyNearestNuke();

    // Clear
    e.target.value = "";
  }
});
