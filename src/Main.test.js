import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Main from './Main';
import Game from './Game';
import { createMockGame, createBoardState } from './testHelpers';

/** Parent level page for both the alert, player manager and game area
 *
 * State:
 *  - game: The instance of the game once initialized
 *  - renderToggle: Used to trigger a re-render when game state is updated
 *
 * Logic:
 * - Leverages useEffect() to initialized a new game on first render
 * - Handles aiCallback() to re-render (via setting renderToggle)
 * - Handles calls to dropPiece(colIndex), calling game.dropPiece() and re-rendering
 * - Handles calls to addPlayer(formData), checking player types, adding them (via new) then re-rendering
 * - Handles calls to startGame(), aysnc calling game.startGame() and then re-rendering
 * - Checks game.gameState and if there is a winner, sets highlights on game.board and fires alert
 * - Checks game.gameState and if there is a tie, sets the alert
 *
 * Renders
 * - Alert (TO BE IMPLEMENTED)
 * - PlayerManager (passes: players(game.players), add(addPlayer), remove(removePlayer))
 * - Game (passes: game(game), dropPiece(dropPiece), startGame(startGame))
 *
 * RoutesList -> Main -> { Alert, PlayerManager, Game }  */

test('Main component renders without crashing', () => {
  // default game has player count of 0 and gameState of 0
  // only empty div should be rendered

  const { container } = render(
    <Main />
  );

  const gameDiv = container.querySelector("div");
  expect(gameDiv).toHaveClass('Main');
});
