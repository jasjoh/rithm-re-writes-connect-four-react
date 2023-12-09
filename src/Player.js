// import "./Player.css"

/** Displays a specific player that was added to the game and a remove button
 *
 * Props:
 *  - playerId: The ID of the player
 *  - playerName: The name of the player
 *  - playerColor: The color of the player
 *  - remove(): A callback function for when a 'remove' button is clicked
 *
 * State:
 *  - None
 *
 * PlayerList -> Player */
function Player({ playerId, playerName="player", playerColor='#ff0000', remove }) {
  console.log("Player re-rendered");

  const style = {
    color: playerColor,
    fontWeight: 'bold'
  }

  function removePlayer(evt) {
    remove(playerId);
  }

  return (
    <div className="Player">
      <span style={style}>{`${playerName}`}{'  '}</span>
      <button onClick={removePlayer}>Remove</button>
    </div>
  );
}

export default Player;