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
      return { success: false, message: "Game is over! Reset to play again." };
    }

    const placeMark = board.placeChoice(rows, columns, currentPlayer.playerChoice);
    
    if (placeMark) {
      const result = checkWinner();
      const moveData = {
        success: true,
        player: currentPlayer.name,
        mark: currentPlayer.playerChoice,
        position: [rows, columns],
        board: board.getBoard(),
        gameOver: false,
        winner: null,
        message: `${currentPlayer.name}'s turn`
      };

      if (result) {
        gameOver = true;
        moveData.gameOver = true;
        if (result === "tie") {
          moveData.message = "It's a tie! Game Over!";
          moveData.winner = "tie";
        } else {
          moveData.message = `${currentPlayer.name} wins!`;
          moveData.winner = currentPlayer.name;
        }
      } else {
        switchPlayer();
        moveData.message = `${currentPlayer.name}'s turn`;
      }

      return moveData;
    } else {
      return { success: false, message: "Cell already occupied!" };
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
    return { success: true, message: "Game reset! PlayerOne's turn." };
  };

  return {
    makeMove,
    getCurrentPlayer: () => currentPlayer,
    getBoard: () => board.getBoard(),
    checkWinner,
    resetGame,
    isGameOver: () => gameOver
  };
})();

const displayUI = (function () {
  const game = playGame;
  
  const startGameBtn = document.querySelector(".start-game");
  const gameDiv = document.querySelector(".game-div");
  const playGameDiv = document.querySelector(".play-div");
  const gameBoard = document.querySelector("#game-board");
  const resetBtn = document.querySelector(".reset-game");

  function createBoard() {
    gameBoard.innerHTML = "";
    const board = game.getBoard();
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.textContent = board[i][j] || "";
        
        cell.addEventListener("click", handleCellClick);
        
        gameBoard.appendChild(cell);
      }
    }
  }

  // Handle cell clicks
  function handleCellClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    const result = game.makeMove(row, col);
    
    if (result.success) {
      updateBoard();
      
      if (result.gameOver) {
        alert(result.message);
        disableBoard();
      }
    }
  }

  function updateBoard() {
    const board = game.getBoard();
    const cells = document.querySelectorAll(".cell");
    
    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      cell.textContent = board[row][col] || "";
    });
  }

  // Disable board after game ends
  function disableBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.style.pointerEvents = "none";
    });
  }

  function enableBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.style.pointerEvents = "auto";
    });
  }

  function startGame() {
    gameDiv.style.display = "none";  
    playGameDiv.style.display = "block";  
    resetBtn.style.display = "block"; 
    createBoard();
  }


  function resetGame() {
    const result = game.resetGame();
    createBoard();
    enableBoard();
  }

  startGameBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
})();