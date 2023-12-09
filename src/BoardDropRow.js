import "./BoardDropRow.css"
import BoardDropCell from "./BoardDropCell";

/** Displays the row where game pieces are 'dropped'
 *
 * Props:
 *  - width: The width (# of cells) that should be rendered
 *  - dropPiece(): A callback function for when a player attempts to drop a piece
 *
 * State:
 *  - None
 *
 * GameBoard -> BoardDropRow -> BoardDropCell */
function BoardDropRow({ width=3, dropPiece }) {
  console.log("BoardDropRow re-rendered");

  let cellsJsx = [];
  let curCol = 0;
  while (curCol < width) {
    cellsJsx.push(
      <BoardDropCell key={curCol} colIndex={curCol} dropPiece={dropPiece} />
    );
    curCol++;
  }

  return (<tr className="BoardDropRow">{ cellsJsx.map( cell => cell )}</tr>);
}

export default BoardDropRow;