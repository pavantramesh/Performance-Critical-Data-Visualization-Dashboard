'use client';
import React, { useMemo, useRef, useState } from 'react';
import { DataPoint } from '../../lib/types';

export default function DataTable({ data }: { data: DataPoint[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const rowH = 28, visible = 15;
  const totalH = data.length * rowH;
  const start = Math.floor(scroll / rowH);
  const end = Math.min(data.length, start + visible);
  const subset = useMemo(() => data.slice(start, end), [start, end, data]);

  return (
    <div
      ref={ref}
      onScroll={() => setScroll(ref.current?.scrollTop || 0)}
      style={{ height: visible * rowH, overflowY: 'auto', border: '1px solid #ddd', background: 'white' }}
    >
      <div style={{ height: totalH, position: 'relative' }}>
        {subset.map((d, i) => (
          <div key={i} style={{ position: 'absolute', top: (start + i) * rowH, left: 0, right: 0, height: rowH, display: 'flex', padding: '0 8px', borderBottom: '1px solid #eee' }}>
            <div style={{ width: 180 }}>{new Date(d.timestamp).toLocaleTimeString()}</div>
            <div>{d.value.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
