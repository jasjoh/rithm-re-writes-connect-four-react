import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BoardDropRow from './BoardDropRow'

/**
 * Takes in width and dropPiece() as props
 * Generates array of BoardDropCells using width
 * Renders one or more BoardDropsCells with key, colIndex and dropPiece
 */

test('renders BoardDropRow component without errors', () => {
  const { container } = render(
    <BoardDropRow />
  );

  const boardDropRowTr = container.querySelector("tr");
  expect(boardDropRowTr).toHaveClass('BoardDropRow');
});

test('renders 4 TDs when width is 4', () => {
  const { container } = render(
    <BoardDropRow width={4}/>
  );

  const boardDropRowTr = container.querySelector("tr");
  const boardDropCellTds = boardDropRowTr.querySelectorAll("td");
  expect(boardDropCellTds.length).toBe(4);
});

test('rendered td calls provided dropPiece() with passed in colIndex on click', () => {
  let returnedColIndex;
  function dropPiece(colIndex) {
    returnedColIndex = colIndex;
  }

  const { container } = render(
    <BoardDropRow width={1} dropPiece={dropPiece}/>
  );

  const boardPlayCellTd = container.querySelector("td");
  fireEvent.click(boardPlayCellTd);
  expect(returnedColIndex).toBe(0);
});