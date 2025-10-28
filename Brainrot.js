const player = document.getElementById("player");
const brainrot = document.querySelector(".brainrot");

let posX = 100;
const step = 10;

// Move player left/right
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") posX += step;
  if (e.key === "ArrowLeft") posX -= step;
  posX = Math.max(0, Math.min(posX, window.innerWidth - 60));
  player.style.left = posX + "px";
  checkCollision();
});

// Collision detection
function checkCollision() {
  const p = player.getBoundingClientRect();
  const b = brainrot.getBoundingClientRect();
  const overlap = !(
    p.right < b.left ||
    p.left > b.right ||
    p.bottom < b.top ||
    p.top > b.bottom
  );
  if (overlap) {
    brainrot.style.display = "none";
    alert("You stole a Brainrot!");
  }
}

// Optional: spawn moving Brainrot
document.getElementById("brainrotButton").addEventListener("click", () => {
  brainrot.classList.add("moving");
});
function launchPlayer() {
  const player = document.getElementById("player");
  player.style.transition = "transform 0.5s ease";
  player.style.transform = "translateX(800px) rotate(720deg)";
}

function deleteBrainrots() {
  document.querySelectorAll(".brainrot").forEach(brainrot => {
    brainrot.remove();
  });
}

function spawnChaos() {
  for (let i = 0; i < 10; i++) {
    const chaos = document.createElement("div");
    chaos.className = "brainrot";
    chaos.style.left = Math.random() * window.innerWidth + "px";
    chaos.style.bottom = "100px";
    document.getElementById("gameArea").appendChild(chaos);
  }
}
