'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon 4', facebook: 2, instagram: 3, linkedin: 1 },
  { day: 'Tue 5', facebook: 1, instagram: 2, linkedin: 0 },
  { day: 'Wed 6', facebook: 3, instagram: 2, linkedin: 2 },
  { day: 'Thu 7', facebook: 0, instagram: 1, linkedin: 1 },
  { day: 'Fri 8', facebook: 2, instagram: 3, linkedin: 2 },
  { day: 'Sat 9', facebook: 1, instagram: 2, linkedin: 0 },
  { day: 'Sun 10', facebook: 2, instagram: 1, linkedin: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-admin-surface border border-admin rounded-xl p-3 shadow-card-admin text-xs">
      <p className="font-600 text-admin-text mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={`tt-${p.dataKey}`} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-admin-muted capitalize">{p.dataKey}:</span>
          <span className="font-600 text-admin-text">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function PublishingActivityChart() {
  return (
    <div className="bg-admin-surface border border-admin rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-600 text-admin-text text-sm">Publishing Activity</h3>
          <p className="text-xs text-admin-muted mt-0.5">Posts published per platform — last 7 days</p>
        </div>
        <span className="text-2xs font-500 text-admin-muted px-2 py-1 rounded-lg bg-admin-surface-2 border border-admin">Sep 4–10</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={10} barGap={3}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--admin-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--admin-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: 'var(--admin-muted)', paddingTop: 8 }}
          />
          <Bar dataKey="facebook" fill="var(--facebook)" radius={[3, 3, 0, 0]} name="Facebook" />
          <Bar dataKey="instagram" fill="var(--instagram)" radius={[3, 3, 0, 0]} name="Instagram" />
          <Bar dataKey="linkedin" fill="var(--linkedin)" radius={[3, 3, 0, 0]} name="LinkedIn" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}