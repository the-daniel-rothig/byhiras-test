Demo for Byhiras assessment.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## A note about the structure and test approach

All essential game logic is contained in the `useGameState` stateful hook. In addition, the sequence of elements that are shown during an "Attack" cycle is controlled via the `useAnimationState` stateful hook. The unit tests of these hooks ensure that the core logic is met.

Separately, the `Game` component consumes the state of these hooks to display UI elements. Snapshot testing is used to prevent regressions. While I would ordinarily prefer a more expressive form of assertion in UI tests, the scope of the probem and the remit of the exercise encouraged me to to use this simpler approach. In a real life scenario this would be trading development convenience in the present over test maintainability which requires more careful consideration.

## Start

```shell
npm install
npm start
```

and open [http://localhost:3000].

## Test

```shell
npm test
```