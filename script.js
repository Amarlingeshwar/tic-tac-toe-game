const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetbtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameIsActive = true;

// Track win counts
let xWins = 0;
let oWins = 0;

// All possible winning combinations
const winPatterns = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

function checkWin() {
  return winPatterns.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function updatePlayerPosition(index) {
  board[index] = currentPlayer;
}

function showMove(cell, index) {
  cell.textContent = board[index];
}

function playTurn(cell, index) {
  updatePlayerPosition(index);
  showMove(cell, index);
}

function showStatusMessage(message) {
  statusText.innerHTML = message + `<br>Score: X = ${xWins}, O = ${oWins}`;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showStatusMessage(`It is ${currentPlayer}'s turn`);
}

function endGame(message) {
  gameIsActive = false;
  showStatusMessage(message);

  // Small delay before auto new round
  setTimeout(startNewRound, 2000);
}

function checkGameResult() {
  if (checkWin()) {
    if (currentPlayer === "X") {
      xWins++;
    } else {
      oWins++;
    }
    endGame(`🎉 Player ${currentPlayer} wins this round!`);
  } else if (checkDraw()) {
    endGame("🤝 It's a draw!");
  } else {
    switchPlayer();
  }
}

function isMoveAllowed(index) {
  return board[index] === "" && gameIsActive;
}

function onCellClick(event) {
  const index = parseInt(event.target.getAttribute("data-index"));
  if (!isMoveAllowed(index)) return;
  playTurn(event.target, index);
  checkGameResult();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameIsActive = true;
  xWins = 0;
  oWins = 0;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  showStatusMessage(`It's ${currentPlayer}'s turn`);
}

function startNewRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameIsActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  // Next round starts with the loser OR X if draw
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showStatusMessage(`New round! ${currentPlayer}'s turn`);
}

function setupEventListeners() {
  cells.forEach((cell) => {
    cell.addEventListener("click", onCellClick);
  });
  resetButton.addEventListener("click", resetGame);
}

function startGame() {
  setupEventListeners();
  showStatusMessage(`It's ${currentPlayer}'s turn`);
}

startGame();
