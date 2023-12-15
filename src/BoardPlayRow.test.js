import React from 'react';
import { render } from '@testing-library/react';
import BoardPlayRow from './BoardPlayRow'

/**
 * Takes in rowstate as prop [ { player, highlight } ]
 * Generates array of BoardPlayCells using rowstate data
 * Renders one or more BoardPlayCells with key, highlight and color
 */

function createRowState(rows=1, players=0, highlights=0) {
  let curRow = 0;
  let rowState = [];
  let playersAdded = 0;
  let highlightsAdded = 0;
  while (curRow < rows) {
    let row = {}
    if (playersAdded < players) {
      row.player = { color:  '#f3f3f3' }
      playersAdded++;
    } else {
      row.player = null;
    }
    if (highlightsAdded < highlights) {
      row.highlight = true;
      highlightsAdded++;
    }
    rowState.push(row);
    curRow++;
  }
  return rowState;
}

test('renders BoardPlayRow component no players', () => {
  const { container, debug } = render(
    <BoardPlayRow rowState={createRowState(0)}/>
  );

  const boardPlayRowTr = container.querySelector("tr");
  expect(boardPlayRowTr).not.toContainHTML('td');
});

test('renders BoardPlayRow component 1 player, no highlight', () => {
  const { container, debug } = render(
    <BoardPlayRow rowState={createRowState(1, 1)}/>
  );

  const boardPlayRowTr = container.querySelector("tr");
  expect(boardPlayRowTr).toContainHTML('td');

  const boardPlayCellTd = container.querySelector("td");
  let cellComputedStyle = window.getComputedStyle(boardPlayCellTd);
  expect(cellComputedStyle.backgroundColor).toBe('');

  const gamePieceDiv = container.querySelector("div");
  expect(gamePieceDiv).toHaveStyle({
    backgroundColor: '#f3f3f3;'
  });
});

test('renders BoardPlayRow component 2 players, no highlight', () => {
  const { container, debug } = render(
    <BoardPlayRow rowState={createRowState(2, 2)}/>
  );

  const boardPlayRowTr = container.querySelector("tr");
  const boardPlayCellTds = boardPlayRowTr.querySelectorAll("td");
  expect(boardPlayCellTds.length).toBe(2);
});

test('renders BoardPlayRow component 1 player and highlight', () => {
  const { container, debug } = render(
    <BoardPlayRow rowState={createRowState(1, 1, 1)}/>
  );

  const boardPlayCellTd = container.querySelector("td");

  expect(boardPlayCellTd).toHaveStyle({
    backgroundColor: '#c5c5c5;'
  });
});

test('renders BoardPlayRow component 2 rows, 1 player', () => {
  const { container, debug } = render(
    <BoardPlayRow rowState={createRowState(2, 1)}/>
  );

  const boardPlayRowTr = container.querySelector("tr");
  const boardPlayCellTds = boardPlayRowTr.querySelectorAll("td");
  expect(boardPlayCellTds.length).toBe(2);
});
