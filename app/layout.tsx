import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Performance Dashboard',
  description: 'High-performance real-time data visualization dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
