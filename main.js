function gameBoard(rows, columns){
 const totalSize = rows * columns
 const Gameboard = {
  board: [],  
  setGameLayout(){
    for (let i = 0; i < totalSize; i++) {
      this.board.push(totalSize);
    }
  }
};
return Gameboard;
}
const getGameBoard = gameBoard(3, 3)
console.log(getGameBoard)


function game(){}

function players(playerOne, playerTwo){
  return{
    players :[
      {name: playerOne, initialPick: "X"},
      {name: playerTwo, initialPick: "O"}
    ]
  }
}
let gamePlayers = players("PlayerOne", "playerTwo")

