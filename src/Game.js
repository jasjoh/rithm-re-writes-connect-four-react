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
  if (game.players.length < 2) { return <div className="Game"></div> }

  if (game.gameState === 0) {
    // game hasn't started, show start button, but no curr player or board
    return (
      <div className="Game">
        <div className="Game-button"><button onClick={handleStartGame}>
          Start Game
        </button></div>
      </div>
    );

  } else {
    // game has started, show restart + curr player and board
    return (
      <div className="Game">
        <div className="Game-button-div">
          <button className="Game-button" onClick={handleStartGame}>
          Restart Game
          </button>
        </div>
        <div className="Game-currentPlayer">
          Current Player: { game.currPlayer.name }
        </div>
        <GameBoard boardState={ game.board } dropPiece={ dropPiece }/>
      </div>
    );
  }
}

export default Game;