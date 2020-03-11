import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useGameState, { INITIAL_HP } from './useGameState';

let testGameState = null;

const Probe = () => {
  testGameState = useGameState();
  return null;
}

global.Math = Object.create(global.Math);
Math.random = jest.fn(() => 0.5);

describe("useGameState", () => {
  beforeEach(() => {


    render(<Probe />)
  });

  it('initialises with a sensible state', () => {
    expect(testGameState.state).toStrictEqual({
      oldHeroHp: INITIAL_HP,
      heroHp: INITIAL_HP,
      oldMonsterHp: INITIAL_HP,
      monsterHp: INITIAL_HP,
      heroDice: [],
      monsterDice: [],
    });
  })

  it('throws dice when the attack action is called', () => {
    act(() => testGameState.attack());
    expect(testGameState.state.heroDice)
      .toStrictEqual([3, 3]);
    expect(testGameState.state.monsterDice)
      .toStrictEqual([3, 3]);
  })

  it('reduces the Monster HP if the Hero trumps', () => {
    Math.random.mockReturnValueOnce(0.99);
    act(() => testGameState.attack());
    expect(testGameState.state.heroDice)
      .toStrictEqual([6, 3]);
    
    expect(testGameState.state.heroHp).toBe(INITIAL_HP);
    expect(testGameState.state.monsterHp).toBe(INITIAL_HP - 3);
  })

  it('reduces the Hero HP if the Monster trumps', () => {
    Math.random
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.99);

    act(() => testGameState.attack());
    expect(testGameState.state.monsterDice)
      .toStrictEqual([6, 3]);
    
    expect(testGameState.state.heroHp).toBe(INITIAL_HP - 3);
    expect(testGameState.state.monsterHp).toBe(INITIAL_HP);      
  })

  it('doesn\'t reduce the HP below 0', () => {
    for (var i = 0; i < 10000; i++) {
      Math.random.mockReturnValueOnce(0.99);
      // eslint-disable-next-line
      act(() => testGameState.attack());
    }

    expect(testGameState.state.monsterHp).toBe(0);
  })
})