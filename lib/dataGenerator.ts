import { DataPoint } from './types';

export function generateInitialDataset(points = 10000, start = Date.now() - 60000): DataPoint[] {
  const data: DataPoint[] = [];
  let t = start;
  for (let i = 0; i < points; i++, t += 10) {
    data.push({ timestamp: t, value: Math.sin(i / 50) * 50 + Math.random() * 5 });
  }
  return data;
}

export function generateNextPoint(last: number): DataPoint {
  return { timestamp: last + 100, value: Math.sin(last / 1000) * 50 + Math.random() * 5 };
}
