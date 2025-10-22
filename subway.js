const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerX = 180;
let isJumping = false;
let score = 0;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && playerX > 0) playerX -= 40;
  if (e.key === "ArrowRight" && playerX < 360) playerX += 40;
  if (e.key === "ArrowUp" && !isJumping) jump();
  player.style.left = playerX + "px";
});

function jump() {
  isJumping = true;
  let jumpHeight = 0;
  const up = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(up);
      const down = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(down);
          isJumping = false;
        } else {
          jumpHeight -= 5;
          player.style.bottom = jumpHeight + "px";
        }
      }, 20);
    } else {
      jumpHeight += 5;
      player.style.bottom = jumpHeight + "px";
    }
  }, 20);
}

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = [0, 180, 360][Math.floor(Math.random() * 3)] + "px";
  gameArea.appendChild(obstacle);

  let obstacleY = -40;
  const fall = setInterval(() => {
    obstacleY += 5;
    obstacle.style.top = obstacleY + "px";

    if (obstacleY > 460) {
      clearInterval(fall);
      gameArea.removeChild(obstacle);
      score++;
      scoreDisplay.innerText = "Score: " + score;
    }

   if (
  obstacleY > 440 &&
  parseInt(obstacle.style.left) === playerX &&
  parseInt(player.style.bottom) < 40 &&
  !isFlying
) {
  alert("💥 Game Over! Final Score: " + score);
  location.reload();
}
  }, 30);
}

setInterval(createObstacle, 1500);

function createCoin() {
  const coin = document.createElement("div");
  coin.classList.add("coin");
  coin.style.left = [0, 180, 360][Math.floor(Math.random() * 3)] + "px";
  gameArea.appendChild(coin);

  let coinY = -30;
  const fall = setInterval(() => {
    coinY += 5;

    // Magnet effect: pull coin toward player
    if (magnetActive) {
      const coinX = parseInt(coin.style.left);
      if (coinX < playerX) coin.style.left = (coinX + 5) + "px";
      else if (coinX > playerX) coin.style.left = (coinX - 5) + "px";
    }

    coin.style.top = coinY + "px";

    if (coinY > 460) {
      clearInterval(fall);
      gameArea.removeChild(coin);
    }

    if (
      coinY > 440 &&
      parseInt(coin.style.left) === playerX &&
      parseInt(player.style.bottom) < 40
    ) {
      clearInterval(fall);
      gameArea.removeChild(coin);
      score += 5 * coinMultiplier;
      scoreDisplay.innerText = "Score: " + score;
    }
  }, 30);
}


  let coinY = -30;
  const fall = setInterval(() => {
    coinY += 5;
    coin.style.top = coinY + "px";

    if (coinY > 460) {
      clearInterval(fall);
      gameArea.removeChild(coin);
    }

    if (
      coinY > 440 &&
      parseInt(coin.style.left) === playerX &&
      parseInt(player.style.bottom) < 40
    ) {
      clearInterval(fall);
      gameArea.removeChild(coin);
      score += 5; // Coins give 5 points
      scoreDisplay.innerText = "Score: " + score;
    }
  }, 30);
}
setInterval(createCoin, 2000); // Coins appear every 2 seconds
function createPowerUp() {
  const powerup = document.createElement("div");
  powerup.classList.add("powerup");
  powerup.style.left = [0, 180, 360][Math.floor(Math.random() * 3)] + "px";
  gameArea.appendChild(powerup);

  let powerY = -30;
  const fall = setInterval(() => {
    powerY += 5;
    powerup.style.top = powerY + "px";

    if (powerY > 460) {
      clearInterval(fall);
      gameArea.removeChild(powerup);
    }

    if (
      powerY > 440 &&
      parseInt(powerup.style.left) === playerX &&
      parseInt(player.style.bottom) < 40
    ) {
      clearInterval(fall);
      gameArea.removeChild(powerup);
      activatePowerUp();
    }
  }, 30);
}
let isInvincible = false;
let coinMultiplier = 1;

function activatePowerUp() {
  isInvincible = true;
  coinMultiplier = 2;
  gameArea.style.backgroundColor = "#ffe0f0"; // Visual cue

  setTimeout(() => {
    isInvincible = false;
    coinMultiplier = 1;
    gameArea.style.backgroundColor = "#e0f7fa";
  }, 5000); // Power-up lasts 5 seconds
}
score += 5 * coinMultiplier;
setInterval(createPowerUp, 7000); // Every 7 seconds

function createJetpack() {
  const jetpack = document.createElement("div");
  jetpack.classList.add("jetpack");
  jetpack.style.left = [0, 180, 360][Math.floor(Math.random() * 3)] + "px";
  gameArea.appendChild(jetpack);

  let jetY = -30;
  const fall = setInterval(() => {
    jetY += 5;
    jetpack.style.top = jetY + "px";

    if (jetY > 460) {
      clearInterval(fall);
      gameArea.removeChild(jetpack);
    }

    if (
      jetY > 440 &&
      parseInt(jetpack.style.left) === playerX &&
      parseInt(player.style.bottom) < 40
    ) {
      clearInterval(fall);
      gameArea.removeChild(jetpack);
      activateJetpack();
    }
  }, 30);
}
let isFlying = false;

function activateJetpack() {
  isFlying = true;
  player.style.bottom = "200px"; // Lift player off the ground
  gameArea.style.backgroundColor = "#fff3e0"; // Visual cue

  setTimeout(() => {
    isFlying = false;
    player.style.bottom = "0px";
    gameArea.style.backgroundColor = "#e0f7fa";
  }, 5000); // Jetpack lasts 5 seconds
}
setInterval(createJetpack, 10000); // Every 10 seconds
function createMagnet() {
  const magnet = document.createElement("div");
  magnet.classList.add("magnet");
  magnet.style.left = [0, 180, 360][Math.floor(Math.random() * 3)] + "px";
  gameArea.appendChild(magnet);

  let magnetY = -30;
  const fall = setInterval(() => {
    magnetY += 5;
    magnet.style.top = magnetY + "px";

    if (magnetY > 460) {
      clearInterval(fall);
      gameArea.removeChild(magnet);
    }

    if (
      magnetY > 440 &&
      parseInt(magnet.style.left) === playerX &&
      parseInt(player.style.bottom) < 40
    ) {
      clearInterval(fall);
      gameArea.removeChild(magnet);
      activateMagnet();
    }
  }, 30);
}
let magnetActive = false;

function activateMagnet() {
  magnetActive = true;
  gameArea.style.backgroundColor = "#e0ffe0"; // Visual cue

  setTimeout(() => {
    magnetActive = false;
    gameArea.style.backgroundColor = "#e0f7fa";
  }, 5000); // Magnet lasts 5 seconds
}
setInterval(createMagnet, 12000); // Every 12 seconds
