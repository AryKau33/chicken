const chickImg = document.getElementById("chick");
const game = document.getElementById("game");
const food = document.getElementById("food");
const effects = document.getElementById("effects");
const peepSound = document.getElementById("peep-sound");

let asleep = false;

// Growth tracking
const startDate = localStorage.getItem("chickStartDate") || Date.now();
localStorage.setItem("chickStartDate", startDate);

function isGrown() {
  const daysPassed = (Date.now() - startDate) / (1000 * 60 * 60 * 24);
  return daysPassed >= 3; // grows after 3 days
}

function getSprite() {
  if (isGrown()) {
    return asleep ? "assets/chicken_sleep.png" : "assets/chicken.png";
  } else {
    return asleep ? "assets/baby_sleep.png" : "assets/baby.png";
  }
}

// Feed
function feedChick() {
  if (asleep) return;
  chickImg.src = getSprite();
  food.style.display = "block";
  food.innerHTML = `<img src="assets/food.png">`;
  setTimeout(() => {
    food.style.display = "none";
  }, 2000);
}

// Pet
function petChick() {
  if (asleep) return;
  peepSound.currentTime = 0;
  peepSound.play();

  // Bounce effect
  chickImg.style.transform = "scale(1.2)";
  setTimeout(() => {
    chickImg.style.transform = "scale(1)";
  }, 300);

  // Floating heart
  const heart = document.createElement("img");
  heart.src = "assets/heart.png";
  heart.classList.add("heart");
  heart.style.left = "150px";
  heart.style.top = "150px";
  effects.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

// Sleep
function sleepChick() {
  asleep = !asleep;
  chickImg.src = getSprite();
  game.style.background = asleep
    ? "url('assets/bg_night.png') center/cover"
    : "url('assets/bg_day.png') center/cover";
}
