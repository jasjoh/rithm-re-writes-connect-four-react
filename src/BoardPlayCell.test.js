import React from 'react';
import { render } from '@testing-library/react';
import BoardPlayCell from './BoardPlayCell'

test('renders BoardPlayCell component with default color and no highlight', () => {
  const { container, debug } = render(
    <BoardPlayCell />
  );

  const boardPlayCellTd = container.querySelector("td");
  debug(boardPlayCellTd);
  expect(boardPlayCellTd).not.toHaveClass('GamePiece');
  expect(boardPlayCellTd).not.toContainHTML('background-color');
});

test('renders BoardPlayCell component with specified color', () => {
  const { container, debug } = render(
    <BoardPlayCell color={'#c3c3c3'}/>
  );
  const gamePieceDiv = container.querySelector(".GamePiece");
  expect(gamePieceDiv).toHaveStyle({
    backgroundColor: '#c3c3c3;'
  });
});

test('renders BoardPlayCell component with highlight', () => {
  const { container, debug } = render(
    <BoardPlayCell highlight={true}/>
  );

  const boardPlayCellTd = container.querySelector("td");
  debug(boardPlayCellTd);
  expect(boardPlayCellTd).toHaveStyle({
    backgroundColor: '#c5c5c5;'
  });
});

test('renders BoardPlayCell component with color and highlight', () => {
  const { container, debug } = render(
    <BoardPlayCell color={'#b4b4b4'} highlight={true}/>
  );

  const boardPlayCellTd = container.querySelector("td");
  debug(boardPlayCellTd);
  expect(boardPlayCellTd).toHaveStyle({
    backgroundColor: '#c5c5c5;'
  });

  const gamePieceDiv = container.querySelector(".GamePiece");
  expect(gamePieceDiv).toHaveStyle({
    backgroundColor: '#b4b4b4;'
  });
});
