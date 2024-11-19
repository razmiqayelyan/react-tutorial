import { useState } from 'react';

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
    LocalStorageReturnValue,
    {
      setItem: (value: LocalStorageSetValue) => void;
      removeItem: () => void;
    }
  ];

export const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  });

  const setItem = (newValue: LocalStorageSetValue) => {
    try {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  };

  return [value, { setItem, removeItem }];
};
