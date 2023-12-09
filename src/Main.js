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

  function add(playerData) {
    console.log("add called with playerData:", playerData);
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