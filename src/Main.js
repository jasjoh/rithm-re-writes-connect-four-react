import Game from "./Game";

/** Parent level page for both the alert, player manager and game area
 *
 * Props:
 *  - None
 *
 * State:
 *  - None
 *
 * RoutesList -> Main -> { Alert, PlayerManager, Game } */
function Main() {
  console.log("Main re-rendered");

  /** TODO:
  * - send gameState
  * - game instance interaction
   */

  function dropPiece(colIndex) {
    console.log("dropPiece() called with colIndex:", colIndex);
  }

  return (
    <div className="Main">
      <Game gameState={null} dropPiece={dropPiece}/>
    </div>
  );
}

export default Main;