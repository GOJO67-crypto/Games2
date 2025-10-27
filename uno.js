const colors = ["red", "green", "blue", "yellow"];
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

let deck = [];
let playerHand = [];
let discardPile = null;

function createDeck() {
  deck = [];
  for (let color of colors) {
    for (let number of numbers) {
      deck.push({ color, number });
    }
  }
  deck = shuffle(deck);
}
const actionCards = ["skip", "reverse", "draw10"];

for (let color of colors) {
  for (let action of actionCards) {
    deck.push({ color, number: action });
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function drawCard(hand) {
  if (deck.length === 0) return;
  const card = deck.pop();
  hand.push(card);
  renderHand();
}

function renderHand() {
  const handDiv = document.getElementById("player-hand");
  handDiv.innerHTML = "";
  playerHand.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = `card ${card.color}`;
    cardDiv.textContent = card.number;
    cardDiv.onclick = () => playCard(index);
    handDiv.appendChild(cardDiv);
  cardDiv.textContent = isNaN(card.number) ? card.number.toUpperCase() : card.number;

  });
}

function playCard(index) {
  const card = playerHand[index];
  if (
    card.color === discardPile.color ||
    card.number === discardPile.number ||
    ["skip", "reverse", "draw10"].includes(card.number)
  ) {
    discardPile = card;
    playerHand.splice(index, 1);
    updateDiscardPile();
    renderHand();

    // Handle special effects
    if (card.number === "skip") {
      alert("You played Skip! Bot's turn is skipped.");
    } else if (card.number === "reverse") {
      alert("You played Reverse! (No effect in 2-player mode)");
    } else if (card.number === "draw10") {
      alert("You played Draw 10! Bot draws 10 cards.");
      for (let i = 0; i < 10; i++) drawCard(botHand);
    }
  }
}


function updateDiscardPile() {
  const pileDiv = document.getElementById("discard-pile");
  pileDiv.className = `card ${discardPile.color}`;
  pileDiv.textContent = discardPile.number;
}

document.getElementById("draw-button").onclick = () => drawCard(playerHand);

function startGame() {
  createDeck();
  playerHand = [];
  for (let i = 0; i < 7; i++) drawCard(playerHand);
  discardPile = deck.pop();
  updateDiscardPile();
}

startGame();
