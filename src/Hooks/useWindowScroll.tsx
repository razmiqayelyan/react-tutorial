import { useState, useEffect } from 'react';

type ScrollPosition = {
  x: number;
  y: number;
};


export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Добавляем обработчик события
      window.addEventListener(type, listener, options);

      // Удаляем обработчик при размонтировании
      return () => {
        window.removeEventListener(type, listener, options);
      };
    }
  }, [type, listener, options]); // Зависимости: тип события, обработчик и опции
}

export function useWindowScroll(): [ScrollPosition, (position: Partial<ScrollPosition>) => void] {
  const [scroll, setScroll] = useState<ScrollPosition>({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  });

  const handleScroll = () => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  const scrollTo = (position: Partial<ScrollPosition>) => {
    window.scrollTo({
      top: position.y ?? window.scrollY,
      left: position.x ?? window.scrollX,
      behavior: 'smooth',
    });
  };

  useWindowEvent('scroll', handleScroll);

  return [scroll, scrollTo];
}