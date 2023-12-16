import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameBoard from './GameBoard'

/**
 * Props:
 *  - boardState: The active game's state which includes:
 *  --- the height and width of the board
 *  --- where any game pieces have been placed and their color
 *  --- the winning set of game pieces (if they exist)
 *  - dropPiece(): A callback function for when a player attempts to drop a piece
 *
 * Logic:
 * - builds an array of BoardDropRows using boardState
 * - sets value for rowState prop to row extracted from boardState via map
 *
 * Renders
 * - BoardDropRow, passing in boardState[0].length and dropPiece()
 * - BoardPlayRow, passing in rowState
 *
 **/

function createBoardState(height=3, width=3) {
  let boardState = [];
  let curRow = 0;
  while (curRow < height) {
    let row = [];
    let curCol = 0;
    while (curCol < width) {
      row.push(
        {
          player: null
        }
      )
      curCol++;
    }
    boardState.push(row);
    curRow++;
  }
  return boardState;
}

function setCellState(board, y, x, player, highlight) {
  if (player !== undefined) {
    board[y][x].player = player;
  }
  if (highlight) {
    board[y][x].highlight = true;
  }
}

test('renders GameBoard component with 3x3 boardState', () => {
  let boardState = createBoardState();

  const { container } = render(
    <GameBoard boardState={boardState}/>
  );

  const gameBoard = container.querySelector("div");
  expect(gameBoard).toHaveClass('GameBoard');

  const boardTds = gameBoard.querySelectorAll("td");
  expect(boardTds.length).toBe(12);

  const boardTrs = gameBoard.querySelectorAll("tr");
  expect(boardTrs.length).toBe(4);
});

test('renders GameBoard component with some players and highlights', () => {
  let boardState = createBoardState();
  setCellState(boardState, 1, 1, { id: 12345, color: '#c4c4c4'}, false);
  setCellState(boardState, 2, 2, { id: 7892, color: '#a4a4a4'}, true);

  let returnedColIndex;
  function dropPiece(colIndex) {
    returnedColIndex = colIndex;
  }

  const { container } = render(
    <GameBoard boardState={boardState} dropPiece={dropPiece}/>
  );

  const gameBoard = container.querySelector("div");
  expect(gameBoard).toHaveClass('GameBoard');

  const boardTds = gameBoard.querySelectorAll("td");
  expect(boardTds.length).toBe(12);

  const boardTrs = gameBoard.querySelectorAll("tr");
  expect(boardTrs.length).toBe(4);

  const gamePieces = gameBoard.querySelectorAll(".GamePiece");
  expect(gamePieces.length).toBe(2);

  const highlightedCells = gameBoard.querySelectorAll(
    '.BoardPlayCell[style="background-color: rgb(197, 197, 197);"]'
  );
  expect(highlightedCells.length).toBe(1);

  const boardPlayCellTd = container.querySelector("#BoardDropCell-2");
  fireEvent.click(boardPlayCellTd);
  expect(returnedColIndex).toBe(2);
});