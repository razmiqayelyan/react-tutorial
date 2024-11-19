import { useViewportSize } from "./Hooks/useViewportSize.tsx";

export function Demo() {
    const { width, height } = useViewportSize();
  
    return (
      <div>
        Width: {width}, Height: {height}
      </div>
    );
  }