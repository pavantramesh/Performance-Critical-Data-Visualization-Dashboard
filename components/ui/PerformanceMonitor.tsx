'use client';
import React from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
  const { fps, memoryMB } = usePerformanceMonitor();

  return (
    <div style={{ padding: 8, background: '#fff', borderRadius: 8, border: '1px solid #ddd', minWidth: 150 }}>
      <h4 style={{ margin: '4px 0' }}>Performance</h4>
      <div>FPS: {fps}</div>
      <div>Memory: {memoryMB ?? '-'} MB</div>
    </div>
  );
}
