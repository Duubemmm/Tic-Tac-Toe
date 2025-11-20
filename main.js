const gameBoardDisplay = function (rows, columns) {
  const GameBoard = {
    gameboard: [],
    rows,
    columns,
    setGameLayout() {
      for (let i = 0; i < this.rows; i++) {
        let rowArray = [];
        for (let j = 0; j < this.columns; j++) {
          rowArray.push(null);
        }
        this.gameboard.push(rowArray);
      }
    },
    placeChoice(rows, columns, mark) {
      if (this.gameboard[rows][columns] === null) {
        this.gameboard[rows][columns] = mark;
        return true;
      }
      return false;
    },
    displayBoard() {
      const board = this.gameboard;
      console.log(`
        ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
        ---------
        ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
        ---------
        ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
      `);
    },
    getBoard() {
      return this.gameboard;
    },
  };
  GameBoard.setGameLayout();
  return GameBoard;
};
const getGameBoard = gameBoardDisplay(3, 3);

//create players
function createPlayers(name, playerChoice) {
  return {
    name,
    playerChoice,
  };
}

// play game
const playGame = (function () {
  const playerX = createPlayers("PlayerOne", "X");
  const playerO = createPlayers("PlayerTwo", "O");
  const board = getGameBoard;
  let currentPlayer = playerX;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const checkWinner = () => {
    const b = board.getBoard();
    for (let row = 0; row < 3; row++) {
      if (b[row][0] && b[row][0] === b[row][1] && b[row][0] === b[row][2]) {
        return b[row][0]; // Return "X" or "O"
      }
    }

    // Check all 3 columns
    for (let col = 0; col < 3; col++) {
      if (b[0][col] && b[0][col] === b[1][col] && b[0][col] === b[2][col]) {
        return b[0][col]; // Return "X" or "O"
      }
    }
    // Check diagonal (top-left to bottom-right)
    if (b[0][0] && b[0][0] === b[1][1] && b[0][0] === b[2][2]) {
      return b[0][0]; // Return "X" or "O"
    }

    // Check diagonal (top-right to bottom-left)
    if (b[0][2] && b[0][2] === b[1][1] && b[0][2] === b[2][0]) {
      return b[0][2]; // Return "X" or "O"
    }
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (b[i][j] === null) {
          isTie = false;
          break;
        }
      }
    }
    if (isTie) {
      return "tie";
    }

    return null;
  };
  const makeMove = (rows, columns) => {
    if (gameOver) {
      console.log("Game is over! Reset to play again.");
      return false;
    }
    const placeMark = board.placeChoice(
      rows,
      columns,
      currentPlayer.playerChoice,
    );
    if (placeMark) {
      console.log(
        `${currentPlayer.name} placed ${currentPlayer.playerChoice} at [${rows}, ${columns}]`,
      );
      board.displayBoard();
      const result = checkWinner();
      if (result) {
        gameOver = true;
        if (result === "tie") {
          console.log("It's a tie! Game Over!");
        } else {
          console.log(`${currentPlayer.name} wins with ${result}! 🎉`);
        }
      } else {
        switchPlayer();
        console.log(`${currentPlayer.name}'s turn`);
      }
      return true;
    } else {
      console.log("Cell already occupied!");
      return false;
    }
  };
  const resetGame = () => {
    board.gameboard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    currentPlayer = playerX;
    gameOver = false;
    console.log("Game reset! PlayerOne's turn.");
  };

  return {
    makeMove,
    getCurrentPlayer: () => currentPlayer,
    getBoard: () => board.displayBoard(),
    checkWinner,
    resetGame,
  };
})();

playGame.makeMove(0, 0);
playGame.makeMove(0, 1);
playGame.makeMove(0, 2);

playGame.makeMove(1, 0);
playGame.makeMove(1, 1);
playGame.makeMove(1, 2);

playGame.makeMove(2, 0);
playGame.makeMove(2, 1);
playGame.makeMove(2, 2);

const displayUI = function () {
  const startGameBtn = document.querySelector(".start-game")
  const playGameDiv = document.querySelector(".play-div")
  startGameBtn.addEventListener("click", startGame)
  
   const game = playGame()
   function startGame() {
    playGameDiv.style.display = "block"
    game()
   }
};
