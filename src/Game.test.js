import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game'
import GameBoard from './GameBoard';
import { createMockGame, createBoardState, setCellState } from './testHelpers';

/** Displays the game area with the start / restart button and game board
 *
 * Props:
 * - game: The game instance to render
 * - dropPiece(): A callback function for when a piece is dropped
 * - startGame(): A callback function to start / restart a game
 *
 * State:
 * - None
 *
 * Logic:
 * - Handles button clicks to call startGame()
 * - Checks if game.players.length < 2 and renders empty <div> if so
 * - Display start button if game.gameState === 0; restart otherwise
 *
 * Renders
 * - Start / Restart Button
 * - Current Player
 * - GameBoard (passing game.board and dropPiece())
 *
 * Test Goals
 * - Ensure all logic is correct
 * - Ensure non-component renders are good
 * - Ensure any modified data is in the expected format
 *
 * Main -> Game -> GameBoard */

let boardState = createBoardState();
let game = createMockGame(boardState);
let returnedColIndex = 0;
let startGameCalled = false;

// mock dropPiece() function; sets the 'returnColIndex' test param to the passed in index
function dropPiece(colIndex) {
  returnedColIndex = colIndex;
}

// mock startGame() function; sets the 'startGameCalled' test param to 'true'
function startGame() {
  startGameCalled = true;
}

// mock the child GameBoard component
jest.mock('./GameBoard')

// resets testing parameters
beforeEach(() => {
  returnedColIndex = 0;
  startGameCalled = false;
})

test('correctly passes correct params to GameBoard', () => {
  game.players = [1,2];
  game.gameState = 1;
  render(<Game game={game} dropPiece={dropPiece} startGame={startGame}/>)
  expect(GameBoard).toHaveBeenCalled();
  // we could also use expect.objectContaining({ key: value }) instead of literal
  expect(GameBoard).toHaveBeenCalledWith({
    dropPiece: dropPiece,
    boardState: game.board
  }, expect.anything()) // expect.anything() accounts for {} passed in all React calls
});


test('renders Game component without crashing', () => {
  const { container } = render(
    <Game game={game} dropPiece={dropPiece} startGame={startGame}/>
  );

  const gameDiv = container.querySelector("div");
  expect(gameDiv).toHaveClass('Game');
});

// test('correctly passed dropPiece() callback function to GameBoard', () => {
//   let boardState = createBoardState();
//   setCellState(boardState, 1, 1, { id: 12345, color: '#c4c4c4'}, false);
//   setCellState(boardState, 2, 2, { id: 7892, color: '#a4a4a4'}, true);

//   let returnedColIndex;
//   function dropPiece(colIndex) {
//     returnedColIndex = colIndex;
//   }

//   const { container } = render(
//     <Game boardState={boardState} dropPiece={dropPiece}/>
//   );

//   const gameDiv = container.querySelector("div");
//   expect(gameDiv).toHaveClass('Game');

//   const boardTds = gameDiv.querySelectorAll("td");
//   expect(boardTds.length).toBe(12);

//   const boardTrs = gameDiv.querySelectorAll("tr");
//   expect(boardTrs.length).toBe(4);

//   const gamePieces = gameDiv.querySelectorAll(".GamePiece");
//   expect(gamePieces.length).toBe(2);

//   const highlightedCells = gameDiv.querySelectorAll(
//     '.BoardPlayCell[style="background-color: rgb(197, 197, 197);"]'
//   );
//   expect(highlightedCells.length).toBe(1);

//   const boardPlayCellTd = container.querySelector("#BoardDropCell-2");
//   fireEvent.click(boardPlayCellTd);
//   expect(returnedColIndex).toBe(2);
// });