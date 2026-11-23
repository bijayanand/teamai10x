import React from 'react';
import { Mail, Calendar, CheckCircle, Link2, Users, AlertTriangle, TrendingUp } from 'lucide-react';

const kpis = [
  {
    id: 'kpi-leads',
    label: 'Total Leads',
    value: '247',
    delta: '+18 this week',
    trend: 'up',
    icon: <Mail size={20} />,
    iconBg: 'bg-info-subtle',
    iconColor: 'text-info',
    span: 'lg:col-span-2',
    hero: true,
    subStats: [
      { label: 'New', value: '7', color: 'text-success' },
      { label: 'In Progress', value: '23', color: 'text-warning' },
      { label: 'Converted', value: '18', color: 'text-info' },
    ],
  },
  {
    id: 'kpi-scheduled',
    label: 'Scheduled Posts',
    value: '12',
    delta: 'Next: Today 6:00 PM',
    trend: 'neutral',
    icon: <Calendar size={20} />,
    iconBg: 'bg-warning-subtle',
    iconColor: 'text-warning',
    span: '',
    hero: false,
  },
  {
    id: 'kpi-published',
    label: 'Published Today',
    value: '3',
    delta: '+2 vs yesterday',
    trend: 'up',
    icon: <CheckCircle size={20} />,
    iconBg: 'bg-success-subtle',
    iconColor: 'text-success',
    span: '',
    hero: false,
  },
  {
    id: 'kpi-accounts',
    label: 'Connected Accounts',
    value: '3/3',
    delta: 'All platforms active',
    trend: 'up',
    icon: <Link2 size={20} />,
    iconBg: 'bg-success-subtle',
    iconColor: 'text-success',
    span: '',
    hero: false,
  },
  {
    id: 'kpi-visitors',
    label: 'Website Visitors',
    value: '1,842',
    delta: '+12.4% vs last week',
    trend: 'up',
    icon: <Users size={20} />,
    iconBg: 'bg-info-subtle',
    iconColor: 'text-info',
    span: '',
    hero: false,
  },
  {
    id: 'kpi-failed',
    label: 'Failed Posts',
    value: '2',
    delta: 'LinkedIn token expired',
    trend: 'alert',
    icon: <AlertTriangle size={20} />,
    iconBg: 'bg-danger-subtle',
    iconColor: 'text-danger',
    span: '',
    hero: false,
    alert: true,
  },
];

export default function DashboardKPIGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {kpis?.map((kpi) => (
        <div
          key={kpi?.id}
          className={`
            relative p-5 rounded-2xl bg-admin-surface border transition-all duration-200 hover:shadow-card-hover
            ${kpi?.alert ? 'border-danger/30 bg-danger/5' : 'border-admin hover:border-accent/20'}
            ${kpi?.span}
          `}
        >
          {kpi?.alert && (
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-danger animate-pulse" />
          )}

          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${kpi?.iconBg} flex items-center justify-center ${kpi?.iconColor}`}>
              {kpi?.icon}
            </div>
            {kpi?.trend === 'up' && <TrendingUp size={14} className="text-success" />}
            {kpi?.trend === 'alert' && <AlertTriangle size={14} className="text-danger" />}
          </div>

          <p className="text-xs font-600 text-admin-muted uppercase tracking-wider mb-1">{kpi?.label}</p>
          <p className="text-3xl font-800 text-admin-text tabular mb-1">{kpi?.value}</p>
          <p className={`text-xs font-500 ${kpi?.trend === 'alert' ? 'text-danger' : kpi?.trend === 'up' ? 'text-success' : 'text-admin-muted'}`}>
            {kpi?.delta}
          </p>

          {kpi?.hero && kpi?.subStats && (
            <div className="mt-4 pt-4 border-t border-admin grid grid-cols-3 gap-2">
              {kpi?.subStats?.map((s) => (
                <div key={`sub-${kpi?.id}-${s?.label}`} className="text-center">
                  <p className={`text-lg font-700 tabular ${s?.color}`}>{s?.value}</p>
                  <p className="text-2xs text-admin-muted">{s?.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}