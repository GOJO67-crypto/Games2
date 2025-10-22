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
  !isInvincible
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
