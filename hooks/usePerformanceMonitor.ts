import { useEffect, useRef, useState } from 'react';

export function usePerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const [memoryMB, setMemoryMB] = useState<number | null>(null);
  const frames = useRef(0);
  const last = useRef(performance.now());

  useEffect(() => {
    let raf: number;
    const loop = (t: number) => {
      frames.current++;
      const delta = t - last.current;
      if (delta >= 1000) {
        setFps(Math.round((frames.current * 1000) / delta));
        frames.current = 0;
        last.current = t;
        if ((performance as any).memory) {
          const mem = (performance as any).memory;
          setMemoryMB(Math.round(mem.usedJSHeapSize / 1024 / 1024));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { fps, memoryMB };
}
