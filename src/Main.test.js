import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Main from './Main';
import GameComponent from './GameComponent';
import { Game } from './models';
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

jest.mock('./GameComponent');

// mock the game's dropPiece() function
// jest.mock('./models', () => {
//   const originalModels = jest.requireActual('./models');
//   const OriginalGame = jest.requireActual('./models').Game;
//   class MockedGame extends OriginalGame {
//     dropPiece = jest.fn(() => 'mocked dropPiece');
//   }
//   return {
//     ...originalModels,
//     Game: jest.fn(MockedGame)
//     // Game: jest.fn(() => ({
//     //   ...originalGame,
//     //   // dropPiece: jest.fn(() => 'mocked dropPiece')
//     // }))
//   };
// });

const mockGame = new Game;
console.log("mockGame dropPiece", mockGame.dropPiece);

// function dropPiece(colIndex) {};
// function startGame() {};

test('Main component renders without crashing', () => {
  // default game has player count of 0 and gameState of 0
  // only empty div should be rendered

  const { container } = render(
    <Main />
  );

  const gameDiv = container.querySelector("div");
  expect(gameDiv).toHaveClass('Main');
});

test('Main component renders and in turn renders GameComponent', () => {

  render(<Main />);

  expect(GameComponent).toHaveBeenCalled();
});

test('Main component renders, initializing a game instance and passes it to GameComponent', () => {

  render(<Main />);

  expect(GameComponent).toHaveBeenCalledWith({
    game: expect.any(Game),
    dropPiece: expect.any(Function),
    startGame: expect.any(Function)
  }, expect.anything())
});

test('Main component listens for aiCallback() and re-renders', () => {

  render(<Main />);

  // grab the aiCallback() function that Main provided
  const aiCallback = GameComponent.mock.calls[0][0].game.aiCallback

  // track how many times Main has rendered by counting mock Game calls
  const priorGameComponentCalls = GameComponent.mock.calls.length;
  console.log("GameComponent calls", GameComponent.mock.calls.length);

  // call the aiCallback()
  act(() => {
    aiCallback();
  });

  expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 1);
});

test('Main component handles dropPiece() calls and re-renders', () => {

  // mock the game's dropPiece() function
  // jest.mock('./models', () => {
  //   const originalModule = jest.requireActual('./models');
  //   return {
  //     ...originalModule,
  //     Game: jest.fn(() => ({
  //       dropPiece: jest.fn(() => 'mocked dropPiece')
  //     }))
  //   };
  // });

  render(<Main />);

  // grab the aiCallback() function that Main provided
  const dropPiece = GameComponent.mock.calls[0][0].dropPiece;

  // track how many times Main has rendered by counting mock Game calls
  const priorGameComponentCalls = GameComponent.mock.calls.length;
  console.log("GameComponent calls", GameComponent.mock.calls.length);

  // call dropPiece() with colIndex 2
  act(() => {
    dropPiece(2);
  });

  expect(Game).toHaveBeenCalledTimes(1);

  // let foo = require('./models').Game;
  // console.log("Game.dropPiece", Game.dropPiece);
  console.log("Game.mock before init", Game.mock);
  // console.log("foo.mock before init", foo.mock);

  // expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 1);
  // expect(Game.mock.instances[0].dropPiece).toHaveBeenCalledWith(2);
});


