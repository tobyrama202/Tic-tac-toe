const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    winnerText.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    winnerText.textContent = "It's a Draw 😬";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return gameState[index] === currentPlayer;
    });
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  winnerText.textContent = "";
  createBoard();
}

createBoard();
