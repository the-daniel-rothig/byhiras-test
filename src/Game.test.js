import React from 'react';
import { render } from '@testing-library/react';
import './setupTests';

import useAnimationState from './useAnimationState';
import useGameState from './useGameState';

import Game from './Game';

jest.mock('./useAnimationState', () => {
  let state = {};
  const startMock = jest.fn();
  const fn = jest.fn(() => ({
    state,
    start: startMock
  }))
  fn.set = newState => state = newState;
  fn.startMock = startMock;

  return fn;
});

jest.mock('./useGameState', () => {
  let state = {};
  const attackMock = jest.fn();
  const fn = jest.fn(() => ({
    state,
    attack: attackMock
  }))
  fn.set = newState => state = newState;
  fn.attackMock = attackMock;

  return fn;
})


describe('Game', () => {
  const defaultAnimationState = {
    active: false,
    showSwords: false,
    showDice: false,
    showDamage: false
  };

  const defaultGameState = {
    oldHeroHp: 100,
    heroHp: 100,
    oldMonsterHp: 51,
    monsterHp: 50,
    heroDice: [1,2],
    monsterDice: [1,1]
  }

  beforeEach(() => {
    useAnimationState.set(defaultAnimationState);
    useGameState.set(defaultGameState);
  })

  it('renders the initial state', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('launches attack when the attack button is pressed', () => {
    const { getByText } = render(<Game />);
    getByText("Attack!").click();
    expect(useAnimationState.startMock).toHaveBeenCalled();
    expect(useGameState.attackMock).toHaveBeenCalled();
  });

  it('renders correctly on animation start', () => {
    useAnimationState.set({
      ...defaultAnimationState, 
      active: true
    });
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  })

  it('renders correctly when the swords show', () => {
    useAnimationState.set({
      ...defaultAnimationState, 
      active: true,
      showSwords: true,
    });
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when the dice show', () => {
    useAnimationState.set({
      ...defaultAnimationState, 
      active: true,
      showSwords: true,
      showDice: true
    });
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when the damage shows', () => {
    useAnimationState.set({
      ...defaultAnimationState, 
      active: true,
      showSwords: true,
      showDice: true,
      showDamage: true
    });
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('renders a Game Over correctly', () => {
    useGameState.set({
      ...defaultGameState,
      heroHp: 0
    });
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('renders a You Won correctly', () => {
    useGameState.set({
      ...defaultGameState,
      monsterHp: 0
    });
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });


})