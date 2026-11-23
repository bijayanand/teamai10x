'use client';
import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export default function AdminLayout({ children, currentPath = '' }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin-login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  function handleLogout() {
    logout();
    router.replace('/admin-login');
  }

  if (!authChecked) {
    return (
      <div className="flex h-screen bg-admin-bg items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-sm text-admin-muted">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-admin-bg overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        currentPath={currentPath}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300"
        style={{ marginLeft: 0 }}
      >
        <AdminTopbar
          onMenuClick={() => setMobileSidebarOpen(true)}
          onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}