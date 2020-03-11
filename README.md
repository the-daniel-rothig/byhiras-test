Demo for Byhiras assessment.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## A note about the structure and test approach

Most of the logic lives in the following files:

- `useGameState.js` implements all essential game logic via a reducer pattern
- `useAnimationState.js` implements the sequence of elements that become visible during an "attack" sequence
- `Game.js` is the top-level component that will display components according to the game and attack animation states


The logic of the game is tested via unit tests on the hooks, and presentational concerns are regression-protected by snapshot tests on the `Game` component.

Most real-life situations call for more explicit assertions, as they are easier to read and maintain than snapshots, but for the purpose of this excercise, snapshots are "good enough".

## Start

```shell
npm install
npm start
```

and open [localhost:3000](http://localhost:3000).

## Test

```shell
npm test
```