import "./Game.css";
import GameBoard from "./GameBoard";

/** Displays the game area with the start / restart button and game board
 *
 * Props:
 *  - game: The game instance to render
 *  - dropPiece(): A callback function for when a piece is dropped
 *  - startGame(): A callback function to start / restart a game
 *
 * State:
 *  - None
 *
 * Main -> Game -> GameBoard */
function Game({ game, dropPiece, startGame }) {
  console.log("Game re-rendered");

  /** Handles user clicks on start / restart button */
  function handleStartGame() {
    console.log('startGame button clicked');
    startGame();
  }

  // if there are no players, nothing to do at this point
  if (game.players.length < 2) { return <div></div> }

  // create html board state based on game board state
  // TODO: Add highlight state for win conditions
  let htmlBoardState = [];
  for (let y = 0; y < game.board.length; y++) {
    let newRow = [];
    for (let x = 0; x < game.board[y].length; x++) {
      if (game.board[y][x].player !== null) {
        const playerColor = game.board[y][x].player.color;
        const highlight = null; // TODO: replace with real lookup
        newRow.push({ color: playerColor, highlight: highlight })
      }
    }
    htmlBoardState.push(newRow);
  }

  return (
    <div className="Game">
      <div className="Game-Button"><button onClick={handleStartGame}>
        { game.gameState === 0 ? 'Start Game' : 'Restart Game'}
      </button></div>
      <div className="Game-currentPlayer">
        Current Player: { game.gameState === 0 ? '' : game.currPlayer.name}
      </div>
      <GameBoard boardState={game.board} dropPiece={dropPiece}/>
    </div>
  );
}

export default Game;