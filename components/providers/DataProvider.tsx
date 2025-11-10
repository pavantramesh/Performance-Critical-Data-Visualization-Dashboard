'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DataPoint } from '../../lib/types';
import { generateNextPoint } from '../../lib/dataGenerator';

interface DataContextType {
  data: DataPoint[];
  startStream: () => void;
  stopStream: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ initialData, children }: { initialData: DataPoint[]; children: React.ReactNode }) {
  const [data, setData] = useState(initialData);
  const runningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_POINTS = 20000;

  const push = (p: DataPoint) => {
    setData(prev => {
      const next = prev.length >= MAX_POINTS ? prev.slice(-MAX_POINTS + 1) : prev;
      return [...next, p];
    });
  };

  const startStream = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    let lastTs = data[data.length - 1]?.timestamp || Date.now();
    const loop = () => {
      if (!runningRef.current) return;
      const p = generateNextPoint(lastTs);
      lastTs = p.timestamp;
      push(p);
      timerRef.current = setTimeout(loop, 100);
    };
    loop();
  };

  const stopStream = () => {
    runningRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => stopStream, []);

  return (
    <DataContext.Provider value={{ data, startStream, stopStream }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
};
