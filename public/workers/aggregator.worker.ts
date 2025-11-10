self.onmessage = (e: MessageEvent) => {
  const { cmd, points, factor } = e.data;
  if (cmd === 'downsample') {
    const n = points.length;
    const bucket = Math.max(1, Math.floor(n / (factor || 10)));
    const out = [];
    for (let i = 0; i < n; i += bucket) {
      let sx = 0, sy = 0, c = 0;
      for (let j = i; j < Math.min(n, i + bucket); j++) {
        sx += points[j].timestamp;
        sy += points[j].value;
        c++;
      }
      out.push({ timestamp: sx / c, value: sy / c });
    }
    postMessage({ cmd: 'downsampled', points: out });
  }
};
