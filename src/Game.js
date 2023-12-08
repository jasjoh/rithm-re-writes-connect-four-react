import GameBoard from "./GameBoard";

/** Displays the game area with the start / restart button and game board
 *
 * Props:
 *  - gameState: The state of the game
 *  - dropPiece(): A callback function for when a piece is dropped
 *
 * State:
 *  - None
 *
 * Main -> Game -> GameBoard */
function Game({ gameState, dropPiece }) {
  console.log("Game re-rendered");

  /** TODO:
   * - extract boardState from gameState
   * - add start / restart button
   */

  // return (
  //   <div className="Game">
  //     Game!
  //   </div>
  // );

  return (
    <div className="Game">
      <GameBoard boardState={null} dropPiece={dropPiece}/>
    </div>
  );
}

export default Game;