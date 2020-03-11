import { useReducer, useRef, useEffect } from 'react';

function makeInitialState() {
  return {
    active: false,
    showSwords: false,
    showDice: false,
    showDamage: false
  }
}

const ACTION_TYPES = { 
  ADVANCE: "ADVANCE",
  RESET: "RESET"
}

function reduce(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADVANCE: 
    return {
      active: !state.showDamage,
      showSwords: !state.showDamage && state.active,
      showDice: !state.showDamage && state.showSwords,
      showDamage: !state.showDamage && state.showDice,
    }
    case ACTION_TYPES.RESET:
      return makeInitialState();
    default:
      throw `unknown action type: ${action.type}`
  }
}

export default () => {
  const timeouts = useRef([]);
  const [ state, dispatch ] = useReducer(reduce, makeInitialState());

  function clearTimeouts() {
    timeouts.current.forEach(to => clearTimeout(to));
    timeouts.current = [];
  }

  useEffect(() => () => clearTimeouts(), []);

  function stop() {
    clearTimeouts();
    dispatch({type: ACTION_TYPES.RESET});
  }

  function start() {
    stop();
    dispatch({type: ACTION_TYPES.ADVANCE});
    timeouts.current = [
      setTimeout(() => dispatch({type: ACTION_TYPES.ADVANCE}), 100),
      setTimeout(() => dispatch({type: ACTION_TYPES.ADVANCE}), 300),
      setTimeout(() => dispatch({type: ACTION_TYPES.ADVANCE}), 800),
      setTimeout(() => dispatch({type: ACTION_TYPES.ADVANCE}), 2500)
    ];
  }

  return { state, start, stop };
}