
let playerCount = 0;
let playerTurn = 0;
let players = [];
let gameBoard;
const BLANK_CHAR = "_";
const mainDiv = document.querySelector("#main");
const resultTextArea = document.querySelector("#result");
const startButton = document.querySelector("#start-button");
const tttBoard = document.querySelector("#ttt-board");
startButton.textContent = "Start Game!";
startButton.addEventListener("click", () => {
  startButton.style.visibility = "hidden";
  tttBoard.style.visibility = "visible";
  playGame();
});


function createBlankBoard() {
  const arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push(BLANK_CHAR);
  }
  return arr;
}

function displayGameBoard() {
  for (let i = 0; i < 8; i += 3) {
    console.log(
      gameBoard[i] + "  " + gameBoard[i + 1] + "  " + gameBoard[i + 2]
    );
  }
}

function createButtons() {
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.id = "button-" + (i + 1);
    tttBoard.append(btn);
  }
}

const createPlayer = (name) => {
  const playerName = name;
  const playerSign = playerCount == 0 ? "X" : "O";
  playerCount++;
  return { playerName, playerSign };
};

function askForPlayerDetails() {
  for (let i = 0; i < 2; i++) {
    const playerName = prompt(`Enter Player ${i + 1}'s Name : `);
    players.push(createPlayer(playerName));
  }
}

function findWinner() {
  if (
    //checks for horizontal match
    (gameBoard[0] == gameBoard[1] &&
      gameBoard[1] == gameBoard[2] &&
      gameBoard[0] != BLANK_CHAR) ||
    (gameBoard[3] == gameBoard[4] &&
      gameBoard[4] == gameBoard[5] &&
      gameBoard[3] != BLANK_CHAR) ||
    (gameBoard[6] == gameBoard[7] &&
      gameBoard[7] == gameBoard[8] &&
      gameBoard[6] != BLANK_CHAR) ||
    //checks for vertical match
    (gameBoard[0] == gameBoard[3] &&
      gameBoard[3] == gameBoard[6] &&
      gameBoard[0] != BLANK_CHAR) ||
    (gameBoard[1] == gameBoard[4] &&
      gameBoard[4] == gameBoard[7] &&
      gameBoard[1] != BLANK_CHAR) ||
    (gameBoard[2] == gameBoard[5] &&
      gameBoard[5] == gameBoard[8] &&
      gameBoard[2] != BLANK_CHAR) ||
    //checks for diagonal match
    (gameBoard[0] == gameBoard[4] &&
      gameBoard[4] == gameBoard[8] &&
      gameBoard[0] != BLANK_CHAR) ||
    (gameBoard[6] == gameBoard[4] &&
      gameBoard[4] == gameBoard[2] &&
      gameBoard[6] != BLANK_CHAR)
  ) {
    if (playerTurn == 1) {
      return 1;
    } else {
      return 2;
    }
  } else {
    if (!gameBoard.includes(BLANK_CHAR)) {
      return 0;
    }
  }
}

function changePlayerTurn() {
  playerTurn = (playerTurn + 1) % 2;
}

function disableAllButtons() {
  let btnArray = tttBoard.getElementsByTagName("button");
  [...btnArray].forEach((element) => {
    element.disabled = true;
  });
}

function playGame() {
  resetEverything();
  gameBoard = createBlankBoard();
  createButtons();
  askForPlayerDetails();

  tttBoard.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      if (event.target.textContent == "X" || event.target.textContent == "O") {
        console.log("Position already marked with " + event.target.textContent);
      } else {
        let clickedBtnIndex = String(event.target.id);
        clickedBtnIndex = clickedBtnIndex.charAt(clickedBtnIndex.length - 1);
        gameBoard[clickedBtnIndex - 1] = players[playerTurn].playerSign;
        event.target.textContent = players[playerTurn].playerSign;
        changePlayerTurn();

        const winner = findWinner();
        if (winner == "1" || winner == "2") {
          resultTextArea.textContent = `${
            players[winner - 1].playerName
          } wins.`;
          disableAllButtons();
          startButton.style.visibility = "visible";
        } else if (winner == "0") {
          resultTextArea.textContent = "It's a draw!";
          startButton.style.visibility = "visible";
        }
      }

      displayGameBoard();
    }
  });
}

function resetEverything() {
  players = [];
  playerCount = 0;
  playerTurn = 0;
  gameBoard = null;
  tttBoard.innerHTML = "";
  resultTextArea.textContent = "";
}                 