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
      parseInt(player.style.bottom) < 40
    ) {
      alert("💥 Game Over! Final Score: " + score);
      location.reload();
    }
  }, 30);
}

setInterval(createObstacle, 1500);
