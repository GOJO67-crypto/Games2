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
