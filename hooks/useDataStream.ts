import { useData } from '../components/providers/DataProvider';
import { useMemo } from 'react';

export function useDataWindow(windowMs = 60000) {
  const { data } = useData();
  const now = Date.now();
  return useMemo(() => {
    const cutoff = now - windowMs;
    return data.filter(d => d.timestamp >= cutoff);
  }, [data, windowMs]);
}
