import { useState, useEffect } from 'react';


export function useWindowEvent<K extends keyof WindowEventMap>(
    type: K,
    listener: (event: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener(type, listener, options);
  
        return () => {
          window.removeEventListener(type, listener, options);
        };
      }
    }, [type, listener, options]);
  }


type ViewportSize = {
  width: number;
  height: number;
};

export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const updateSize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useWindowEvent('resize', updateSize);

  return size;
}