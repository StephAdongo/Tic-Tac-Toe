// create game
const game = ticTacToe();

// make board
let board = game.createBoard();

// create turn manager
const turns = game.manageTurns();

// make players
let roster = game.managePlayers();
document.querySelector("dialog").showModal();
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const player1Name = e.target["player1-name"].value;
  const player1Symbol = e.target["player1-symbol"].value;
  const player2Name = e.target["player2-name"].value;
  const player2Symbol = e.target["player2-symbol"].value;
  if (player1Name != player2Name && player1Symbol != player2Symbol) {
    roster.createPlayers(
      player1Name,
      player1Symbol,
      player2Name,
      player2Symbol
    );
    // display first turn
    turns.displayTurn(roster.getPlayers(0));
    document.querySelector("dialog").close();
  } else alert("Player names and symbols must be unique.");
});

document.querySelector("#board-container").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const squareNumber = e.target.value;
    const squares = board.getSquares();
    if (!squares[squareNumber]) {
      const turn = turns.getTurn();
      const currentPlayer = roster.getPlayers(turn);
      board.setSquare(squareNumber, currentPlayer, e.target);
      if (game.checkBoard(board.getSquares()) === "winner") {
        game.declareWinner(currentPlayer);
      } else if (game.checkBoard(board.getSquares()) === "tie") {
        game.declareTie();
      } else {
        const nextPlayer = roster.getPlayers(turns.switchTurn());
        turns.displayTurn(nextPlayer);
      }
    }
  }
});

document.querySelector("#restart-button").addEventListener("click", (e) => {
  // reset board
  board = game.createBoard();
  const buttons = document.querySelectorAll("[data-type='square-button']");
  for (const b of buttons) {
    b.disabled = false;
    b.textContent = "";
  }
  // reset players
  roster = game.managePlayers();
  // clear and show modal
  document.querySelector("form").reset();
  document.querySelector("dialog").showModal();
  e.target.hidden = true;
});
//

function ticTacToe() {
  const manageTurns = () => {
    let turn = 0;
    const getTurn = () => {
      return turn;
    };
    const switchTurn = () => {
      turn === 0 ? (turn = 1) : (turn = 0);
      return turn;
    };
    const displayTurn = (player) => {
      document.querySelector(
        "#message-output"
      ).textContent = `${player.name}'s turn: ${player.symbol}`;
    };
    return { getTurn, switchTurn, displayTurn };
  };

  const managePlayers = () => {
    const players = [];

    const createPlayers = (p1n, p1s, p2n, p2s) => {
      players[0] = {
        name: p1n,
        symbol: p1s
      };
      players[1] = {
        name: p2n,
        symbol: p2s
      };
    };

    const getPlayers = (turn) => {
      if (turn != null) return players[turn];
      else return players;
    };

    return { createPlayers, getPlayers };
  };

  const createBoard = () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    const getSquares = () => squares;
    const setSquare = (i, p, b) => {
      squares[i] = p.symbol;
      b.textContent = p.symbol;
    };
    return { getSquares, setSquare };
  };

  const checkBoard = (squares) => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const c of combos) {
      const [x, y, z] = c;
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return "winner";
      }
    }
    if (squares.every((square) => square !== null)) return "tie";
  };

  const declareWinner = (player) => {
    const buttons = document.querySelectorAll("[data-type='square-button']");
    for (const b of buttons) {
      b.disabled = true;
    }
    document.querySelector(
      "#message-output"
    ).textContent = `${player.name} wins!`;
    document.querySelector("#restart-button").hidden = false;
  };

  const declareTie = () => {
    const buttons = document.querySelectorAll("[data-type='square-button']");
    for (const b of buttons) {
      b.disabled = true;
    }
    document.querySelector("#message-output").textContent = "Tie game!";
    document.querySelector("#restart-button").hidden = false;
  };

  return {
    manageTurns,
    managePlayers,
    createBoard,
    checkBoard,
    declareWinner,
    declareTie
  };
}