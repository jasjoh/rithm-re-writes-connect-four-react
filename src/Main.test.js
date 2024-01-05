import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Main from './Main';
import GameComponent from './GameComponent';
import PlayerManager from './PlayerManager';
import { Game, AiPlayer, Player } from './models';
import { createMockGame, createBoardState } from './testHelpers';
import { wait } from '@testing-library/user-event/dist/utils';

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
jest.mock('./PlayerManager');

test('Main component renders without crashing', () => {
  // default game has player count of 0 and gameState of 0
  // only empty div should be rendered

  const { container } = render(
    <Main />
  );

  const mainDiv = container.querySelector("div");
  expect(mainDiv).toHaveClass('Main');
});

test('Main component renders and in turn renders child components', () => {

  render(<Main />);

  expect(GameComponent).toHaveBeenCalled();
  expect(PlayerManager).toHaveBeenCalled();
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

  render(<Main />);

  // grab the aiCallback() function that Main provided
  const dropPiece = GameComponent.mock.calls[0][0].dropPiece;
  const game = GameComponent.mock.calls[0][0].game;
  const dropPieceSpy = jest.spyOn(game, 'dropPiece');

  // track how many times Main has rendered by counting mock Game calls
  const priorGameComponentCalls = GameComponent.mock.calls.length;
  console.log("GameComponent calls", GameComponent.mock.calls.length);

  // call dropPiece() with colIndex 2
  act(() => {
    dropPiece(2);
  });

  expect(dropPieceSpy).toHaveBeenCalledTimes(1);
  expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 1);
});

test('Main component handles addPlayer() calls and re-renders', () => {

  render(<Main />);

  // grab the aiCallback() function that Main provided
  const mainAddPlayer = PlayerManager.mock.calls[0][0].add;
  const game = GameComponent.mock.calls[0][0].game;
  const gameAddPlayerSpy = jest.spyOn(game, 'addPlayer');

  // track how many times Main has rendered by counting mock Game calls
  const priorGameComponentCalls = GameComponent.mock.calls.length;
  console.log("GameComponent calls", GameComponent.mock.calls.length);

  const aiFormData = {
    ai: true,
    color: '#c3c3c3',
    playerName: 'foo'
  }

  const humanFormData = {
    ai: false,
    color: '#c3c3c3',
    playerName: 'foo'
  }

  act(() => {
    mainAddPlayer(aiFormData);
  });

  expect(gameAddPlayerSpy).toHaveBeenCalledTimes(1);
  expect(gameAddPlayerSpy).toHaveBeenCalledWith(expect.any(AiPlayer));
  expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 1);

  gameAddPlayerSpy.mockClear();

  act(() => {
    mainAddPlayer(humanFormData);
  });

  expect(gameAddPlayerSpy).toHaveBeenCalledTimes(1);
  expect(gameAddPlayerSpy).not.toHaveBeenCalledWith(expect.any(AiPlayer));
  expect(gameAddPlayerSpy).toHaveBeenCalledWith(expect.any(Player));
  expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 2);
});

test('Main component handles removePlayer() calls and re-renders', () => {

  render(<Main />);

  // grab the aiCallback() function that Main provided
  const mainRemovePlayer = PlayerManager.mock.calls[0][0].remove;
  const game = GameComponent.mock.calls[0][0].game;
  const gameRemovePlayerSpy = jest.spyOn(game, 'removePlayer');

  // track how many times Main has rendered by counting mock Game calls
  const priorGameComponentCalls = GameComponent.mock.calls.length;
  console.log("GameComponent calls", GameComponent.mock.calls.length);

  act(() => {
    mainRemovePlayer('1234');
  });

  expect(gameRemovePlayerSpy).toHaveBeenCalledTimes(1);
  expect(gameRemovePlayerSpy).toHaveBeenCalledWith('1234');
  expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 1);
});

test('Main component handles startGame() calls and re-renders', async () => {

  render(<Main />);

  // grab the aiCallback() function that Main provided
  const mainAddPlayer = PlayerManager.mock.calls[0][0].add;
  const mainStartGame = GameComponent.mock.calls[0][0].startGame;
  const game = GameComponent.mock.calls[0][0].game;
  const gameStartGameSpy = jest.spyOn(game, 'startGame');

  // track how many times Main has rendered by counting mock Game calls
  const priorGameComponentCalls = GameComponent.mock.calls.length;
  console.log("GameComponent calls", GameComponent.mock.calls.length);

  act(() => {
    mainAddPlayer({
      ai: false,
      color: '#c3c3c3',
      playerName: 'foo'
    });
  });

  act(() => {
    mainAddPlayer({
      ai: false,
      color: '#c3c3c3',
      playerName: 'bar'
    });
  });

  act(() => {
    mainStartGame();
  });

  await waitFor(() => {
    expect(gameStartGameSpy).toHaveBeenCalledTimes(1);
    expect(GameComponent.mock.calls.length).toBe(priorGameComponentCalls + 3);
  })
});

test('Main component adds board highlights and displays winner name', () => {

  const { container } = render(<Main />);

  const game = GameComponent.mock.calls[0][0].game;
  game.currPlayer = { name: 'foobar' };
  game.gameState = 2;
  game.winningSet = [
    [0,1],
    [0,2]
  ]
  // console.log('game', game);

  // call aiCallback() to trigger a re-rendering once state is changed
  const aiCallback = GameComponent.mock.calls[0][0].game.aiCallback
  act(() => {
    aiCallback();
  });

  expect(game.board[0][1].highlight).toBe(true);
  expect(game.board[0][2].highlight).toBe(true);
  expect(game.board[0][3].highlight).toBeUndefined;

  let alertDiv = container.querySelector(".Main-alert");
  expect(alertDiv).toHaveTextContent('foobar has won the game!');

});

test('Main component displays tie alert', () => {

  const { container } = render(<Main />);

  const game = GameComponent.mock.calls[0][0].game;
  game.currPlayer = { name: 'foobar' };
  game.gameState = 3;

  // call aiCallback() to trigger a re-rendering once state is changed
  const aiCallback = GameComponent.mock.calls[0][0].game.aiCallback
  act(() => {
    aiCallback();
  });

  let alertDiv = container.querySelector(".Main-alert");
  expect(alertDiv).toHaveTextContent('Game is tied!');

});

