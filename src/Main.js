import Game from "./Game";
import PlayerManager from "./PlayerManager";

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
  * - send players
  * - game instance interaction
  * -- initializing a new game
  * -- starting the game
  * -- add / remove players (using player instance)
  * -- dropping pieces
  * - adding pieces to board
  * - update current player
  * - handle ai callback
  * - highlight pieces on a win
  * - update current player display
   */

  let players = [
    {
      name: 'foo',
      id: '1234'
    }
  ]

  function dropPiece(colIndex) {
    console.log("dropPiece() called with colIndex:", colIndex);
  }

  function add(formData) {
    console.log("add called with playerData:", formData);
  }

  function remove(playerId) {
    console.log("remove called with playerId:", playerId);
  }

  return (
    <div className="Main">
      <PlayerManager players={players} add={add} remove={remove} />
      <Game gameState={null} dropPiece={dropPiece}/>
    </div>
  );
}

export default Main;