const someClass = "x";
const circleClass = "circle";
const winningCombinations = "012,345,678,036,147,258,048,246"
  .split(",")
  .map((combination) => combination.split("").map(Number));

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(someClass, circleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : someClass;
  placeMark(cell, currentClass);
  checkWin(currentClass)
    ? endGame(false)
    : isDraw()
    ? endGame(true)
    : (swapTurns(), setBoardHoverClass());
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(someClass) || cell.classList.contains(circleClass)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.toggle(someClass, !circleTurn);
  board.classList.toggle(circleClass, circleTurn);
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) =>
    combination.every((index) =>
      cellElements[index].classList.contains(currentClass)
    )
  );
}
