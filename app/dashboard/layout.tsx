import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section style={{ padding: 16 }}>{children}</section>;
}
