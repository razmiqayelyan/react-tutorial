import { useReducer } from 'react';

type Action<T> = { type: 'TOGGLE' } | { type: 'SET'; value: T };

export function useToggle<T = boolean>(values: T[] = [true as T, false as T]): [T, (value?: T) => void] {
  const reducer = (state: T, action: Action<T>): T => {
    switch (action.type) {
      case 'TOGGLE':
        const currentIndex = values.indexOf(state);
        const nextIndex = (currentIndex + 1) % values.length;
        return values[nextIndex];
      case 'SET':
        return action.value;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, values[0]);

  const toggle = (value?: T) => {
    if (value !== undefined) {
      dispatch({ type: 'SET', value });
    } else {
      dispatch({ type: 'TOGGLE' });
    }
  };

  return [state, toggle];
}