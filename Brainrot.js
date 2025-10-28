let yourBrainrots = [];
let enemyBrainrots = ["Bombombini", "Crocodilo", "Gusini"];

function collectBrainrot() {
  const newBrainrot = "Brainrot #" + (yourBrainrots.length + 1);
  yourBrainrots.push(newBrainrot);
  updateList("yourBrainrots", yourBrainrots);
}

function stealBrainrot() {
  if (enemyBrainrots.length > 0) {
    const stolen = enemyBrainrots.pop();
    yourBrainrots.push("Stolen " + stolen);
    updateList("yourBrainrots", yourBrainrots);
    updateList("enemyBrainrots", enemyBrainrots);
  } else {
    alert("No Brainrots left to steal!");
  }
}

function updateList(id, items) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

updateList("enemyBrainrots", enemyBrainrots);
const player = document.getElementById("player");
const brainrot = document.getElementById("brainrot");
let posX = 280;
let posY = 180;
const step = 10;

document.addEventListener("keydown", function(e) {
  switch (e.key) {
    case "ArrowUp":
      posY = Math.max(0, posY - step);
      break;
    case "ArrowDown":
      posY = Math.min(360, posY + step);
      break;
    case "ArrowLeft":
      posX = Math.max(0, posX - step);
      break;
    case "ArrowRight":
      posX = Math.min(560, posX + step);
      break;
  }
  player.style.top = posY + "px";
  player.style.left = posX + "px";
  checkCollision();
});

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const brainrotRect = brainrot.getBoundingClientRect();

  const overlap = !(
    playerRect.right < brainrotRect.left ||
    playerRect.left > brainrotRect.right ||
    playerRect.bottom < brainrotRect.top ||
    playerRect.top > brainrotRect.bottom
  );

  if (overlap) {
    brainrot.style.display = "none";
    alert("You stole a Brainrot!");
  }
}
