'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { DataPoint } from '../../lib/types';

export default function LineChart({ data, width = 800, height = 250 }: { data: DataPoint[]; width?: number; height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  const { xs, ys } = useMemo(() => {
    const n = data.length;
    const xs = new Float64Array(n);
    const ys = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      xs[i] = data[i].timestamp;
      ys[i] = data[i].value;
    }
    return { xs, ys };
  }, [data]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const w = (canvas.width = width * devicePixelRatio);
    const h = (canvas.height = height * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const margin = 8;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const len = ys.length;
      if (!len) return requestAnimationFrame(draw);

      const xMin = xs[0], xMax = xs[len - 1];
      const yMin = Math.min(...ys), yMax = Math.max(...ys);
      const plotW = width - margin * 2, plotH = height - margin * 2;

      ctx.beginPath();
      for (let i = 0; i < len; i++) {
        const x = margin + ((xs[i] - xMin) / (xMax - xMin)) * plotW;
        const y = margin + (1 - (ys[i] - yMin) / (yMax - yMin)) * plotH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#0070f3';
      ctx.lineWidth = 1;
      ctx.stroke();

      requestAnimationFrame(draw);
    };
    draw();
  }, [xs, ys, width, height]);

  return <canvas ref={ref} style={{ borderRadius: 8, background: '#fff' }} />;
}
