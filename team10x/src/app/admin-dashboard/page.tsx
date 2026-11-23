import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import DashboardKPIGrid from './components/DashboardKPIGrid';
import DashboardChartsRow from './components/DashboardChartsRow';
import RecentLeadsTable from './components/RecentLeadsTable';
import PlatformStatusCards from './components/PlatformStatusCards';
import DashboardQuickActions from './components/DashboardQuickActions';

export default function AdminDashboardPage() {
  return (
    <AdminLayout currentPath="/admin-dashboard">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-700 text-admin-text">Dashboard</h1>
            <p className="text-sm text-admin-muted mt-0.5">Thu, 10 Sep 2026 · Last updated 2 minutes ago</p>
          </div>
          <DashboardQuickActions />
        </div>

        {/* KPI Bento Grid */}
        <DashboardKPIGrid />

        {/* Platform status */}
        <PlatformStatusCards />

        {/* Charts */}
        <DashboardChartsRow />

        {/* Recent Leads */}
        <RecentLeadsTable />
      </div>
    </AdminLayout>
  );
}