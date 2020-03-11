import { useReducer } from 'react';

const ACTION_TYPES = {
  ATTACK: "ATTACK"
};

function reduce(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ATTACK:
      const heroDice = [ throwDie(), throwDie() ];
      const monsterDice = [ throwDie(), throwDie() ];

      const score = sum(heroDice) - sum(monsterDice);
      return {
        oldHeroHp: state.heroHp,
        heroHp: Math.max(state.heroHp + Math.min(score, 0), 0),
        oldMonsterHp: state.monsterHp,
        monsterHp: Math.max(state.monsterHp - Math.max(0, score), 0),
        heroDice,
        monsterDice
      }
      
    default:
      throw `unknown action type ${action.type}.`;
  }
}

function sum(array) {
  return array.reduce((a,b) => a+b, 0);
}

function throwDie() {
  return Math.ceil(6 * Math.random());
}

export const INITIAL_HP = 100;

function makeInitialState() {
  return {
    oldHeroHp: INITIAL_HP,
    heroHp: INITIAL_HP,
    oldMonsterHp: INITIAL_HP,
    monsterHp: INITIAL_HP,
    heroDice: [],
    monsterDice: [],
  }
}

export default () => {
  const [state, dispatch] = useReducer(reduce, makeInitialState());
  
  return {
    attack: () => dispatch({type: ACTION_TYPES.ATTACK}),
    state
  };
}