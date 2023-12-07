Goal: Refactoring the OOP version of our connect four game to use React

Initial Approach:
- translate view state (e.g the html board state) into React components
- maintain game state (the JS board state) inside JS objects (e.g. game instance)
- treat the interaction between the view and the js objects (models) as though it were an API
- react / view shouldn't know what's happening in the game state and vice versa
