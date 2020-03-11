import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useAnimationState from './useAnimationState';

jest.useFakeTimers();

let testAnimationState = null;

const Probe = () => {
  testAnimationState = useAnimationState();
  return null;
}

describe('useAnimationState', () => {
  beforeEach(() => {
    render(<Probe />);
  });

  it('has a passive initial state', () => {
    const { state } = testAnimationState;

    expect(state).toStrictEqual({
      active: false,
      showSwords: false,
      showDice: false,
      showDamage: false,
    });
  });

  it('immediately sets itself to active', () => {
    testAnimationState.start();
    expect(testAnimationState.state).toStrictEqual({
      active: true,
      showSwords: false,
      showDice: false,
      showDamage: false,
    });
  });

  it('follows the correct sequence of flag switches', () => {
    testAnimationState.start();
    act(() => jest.advanceTimersByTime(101));
    expect(testAnimationState.state).toStrictEqual({
      active: true,
      showSwords: true,
      showDice: false,
      showDamage: false,
    });
    act(() => jest.advanceTimersByTime(200));
    expect(testAnimationState.state).toStrictEqual({
      active: true,
      showSwords: true,
      showDice: true,
      showDamage: false,
    });
    act(() => jest.advanceTimersByTime(500));
    expect(testAnimationState.state).toStrictEqual({
      active: true,
      showSwords: true,
      showDice: true,
      showDamage: true,
    });
    act(() => jest.advanceTimersByTime(2000));
    expect(testAnimationState.state).toStrictEqual({
      active: false,
      showSwords: false,
      showDice: false,
      showDamage: false,
    });
  });
  
  it('can be reset', () => {
    testAnimationState.start();
    act(() => jest.advanceTimersByTime(301));
    testAnimationState.stop();

    expect(testAnimationState.state).toStrictEqual({
      active: false,
      showSwords: false,
      showDice: false,
      showDamage: false,
    });

    act(() => jest.advanceTimersByTime(1000));
    
    expect(testAnimationState.state).toStrictEqual({
      active: false,
      showSwords: false,
      showDice: false,
      showDamage: false,
    });
  });

});
