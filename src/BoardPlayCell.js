// import "./BoardPlayCell.css"
import GamePiece from "./GamePiece";

/** An individual cell in the game board where pieces may be placed
 *
 * Props:
 *  - highlight: whether to highlight the cell as part of a winning set
 *  - placed: whether a game piece has been placed in this cell
 *
 * State:
 *  - None
 *
 * BoardPlayRow -> BoardPlayCell -> BoardPlayCell*/
function BoardPlayCell({ highlight=false, placed=true }) {
  console.log("BoardPlayCell re-rendered");

  let style = {}

  if (highlight) {
    style = { backgroundColor: '#c5c5c5' }
  }

  return (
    <td className="BoardPlayCell" style={style}>
      { placed ? <GamePiece /> : null }
    </td>
  );
}

export default BoardPlayCell;