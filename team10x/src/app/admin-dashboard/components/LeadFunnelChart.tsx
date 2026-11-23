'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'New', value: 7, color: '#10B981' },
  { name: 'Contacted', value: 23, color: '#3B82F6' },
  { name: 'In Progress', value: 15, color: '#F59E0B' },
  { name: 'Converted', value: 18, color: '#8B5CF6' },
  { name: 'Closed', value: 184, color: '#374151' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-admin-surface border border-admin rounded-xl p-3 shadow-card-admin text-xs">
      <p className="font-600 text-admin-text">{payload[0].name}</p>
      <p className="text-admin-muted">{payload[0].value} leads</p>
    </div>
  );
};

export default function LeadFunnelChart() {
  return (
    <div className="bg-admin-surface border border-admin rounded-2xl p-5 h-full">
      <div className="mb-4">
        <h3 className="font-600 text-admin-text text-sm">Lead Pipeline</h3>
        <p className="text-xs text-admin-muted mt-0.5">Status distribution — all time</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-lead-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
        {data.map((d) => (
          <div key={`legend-lead-${d.name}`} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-admin-muted">{d.name}</span>
            </div>
            <span className="text-xs font-600 text-admin-text tabular">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}