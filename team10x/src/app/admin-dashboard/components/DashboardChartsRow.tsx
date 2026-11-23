'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const PublishingActivityChart = dynamic(
  () => import('./PublishingActivityChart'),
  { ssr: false, loading: () => <div className="animate-pulse bg-admin-surface-2 rounded-2xl h-64" /> }
);

const LeadFunnelChart = dynamic(
  () => import('./LeadFunnelChart'),
  { ssr: false, loading: () => <div className="animate-pulse bg-admin-surface-2 rounded-2xl h-64" /> }
);

export default function DashboardChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <PublishingActivityChart />
      </div>
      <div className="lg:col-span-1">
        <LeadFunnelChart />
      </div>
    </div>
  );
}