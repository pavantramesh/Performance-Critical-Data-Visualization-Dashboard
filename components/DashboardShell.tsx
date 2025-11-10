'use client';
import React from 'react';
import { useData } from './providers/DataProvider';
import { useDataWindow } from '../hooks/useDataStream';
import LineChart from './charts/LineChart';
import DataTable from './ui/DataTable';
import PerformanceMonitor from './ui/PerformanceMonitor';

export default function DashboardShell() {
  const { startStream, stopStream } = useData();
  const windowData = useDataWindow(60000);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button onClick={startStream}>Start</button>
            <button onClick={stopStream}>Stop</button>
          </div>
          <LineChart data={windowData} width={900} height={300} />
        </div>
        <PerformanceMonitor />
      </div>
      <div style={{ marginTop: 16 }}>
        <DataTable data={windowData.slice().reverse()} />
      </div>
    </div>
  );
}
