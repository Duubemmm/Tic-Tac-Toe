const gameBoardDisplay = (function(rows, columns){
const GameBoard = {
  gameboard : [],
  rows,
  columns,
  setGameLayout(){
    for (let i = 0; i < this.rows; i++) {
      let rowArray = [];
      for(let j = 0; j < this.columns; j++){
      rowArray.push(null);
      }
      this.gameboard.push(rowArray)
    }
  },
placeChoice(rows, columns, mark){
if(this.gameboard[rows][columns] === null){
  this.gameboard[rows][columns] = mark;
  return true;
}
return false;
},
getBoard() {
      return this.gameboard;
    }
}
GameBoard.setGameLayout();
return GameBoard;
})
const getGameBoard = gameBoardDisplay(3, 3)
console.log(getGameBoard)

function createPlayers(name, playerChoice){
 return {
  name,
  playerChoice
 }
}

const playGame = (function(){
const playerX = createPlayers("PlayerOne", "X")
const playerO = createPlayers("PlayerTwo", "O")
const board = getGameBoard;
let currentPlayer = playerX;

const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }

const makeMove = (rows, columns) => {

const placeMark = board.placeChoice(rows, columns, currentPlayer.playerChoice )
if(placeMark){
   console.log(`${currentPlayer.name} placed ${currentPlayer.playerChoice} at [${rows}, ${columns}]`);
      console.log(board.getBoard());
      switchPlayer();
      return true;
    } else {
      console.log("Cell already occupied!");
      return false;
    }
}
const roundWin = () => {
  
}
return {
    makeMove,
    getCurrentPlayer: () => currentPlayer,
    getBoard: () => board.getBoard()
  }
}
)()

playGame.makeMove(0,0)
playGame.makeMove(0,1)
playGame.makeMove(0,2)

playGame.makeMove(1,0)
playGame.makeMove(1,1)
playGame.makeMove(1,2)


playGame.makeMove(2,0)
playGame.makeMove(2,1)
playGame.makeMove(2,2)
