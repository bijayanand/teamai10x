'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { LayoutDashboard, Globe, Briefcase, Package, FolderOpen, Star, FileText, Mail, PlusSquare, Calendar, History, Link2, Image, Search, Settings, Users, Shield, BarChart2, LogOut, KeyRound } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  group?: string;
}

const navItems: NavItem[] = [
  { group: 'Overview', label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin-dashboard' },
  { group: 'Website', label: 'Pages', icon: <Globe size={18} />, href: '/admin-website-content?tab=services' },
  { label: 'Services', icon: <Briefcase size={18} />, href: '/admin-website-content?tab=services' },
  { label: 'Packages', icon: <Package size={18} />, href: '/admin-website-content?tab=packages' },
  { label: 'Portfolio', icon: <FolderOpen size={18} />, href: '/admin-dashboard' },
  { label: 'Testimonials', icon: <Star size={18} />, href: '/admin-website-content?tab=testimonials' },
  { label: 'Blog', icon: <FileText size={18} />, href: '/admin-blog' },
  { group: 'Leads', label: 'Enquiries', icon: <Mail size={18} />, href: '/admin-dashboard', badge: 7 },
  { group: 'Social Media', label: 'Create Post', icon: <PlusSquare size={18} />, href: '/social-media-post-composer' },
  { label: 'Content Calendar', icon: <Calendar size={18} />, href: '/social-media-post-composer' },
  { label: 'Publishing History', icon: <History size={18} />, href: '/social-media-post-composer' },
  { label: 'Connected Accounts', icon: <Link2 size={18} />, href: '/social-media-post-composer' },
  { label: 'API Settings', icon: <KeyRound size={18} />, href: '/admin-social-settings' },
  { group: 'Assets', label: 'Media Library', icon: <Image size={18} />, href: '/admin-media-library' },
  { label: 'SEO Settings', icon: <Search size={18} />, href: '/admin-dashboard' },
  { group: 'System', label: 'Website Settings', icon: <Settings size={18} />, href: '/admin-dashboard' },
  { label: 'Users', icon: <Users size={18} />, href: '/admin-dashboard' },
  { label: 'Security', icon: <Shield size={18} />, href: '/admin-dashboard' },
  { label: 'Analytics', icon: <BarChart2 size={18} />, href: '/admin-dashboard' },
];

interface Props {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  currentPath: string;
  onLogout?: () => void;
}

export default function AdminSidebar({ collapsed, mobileOpen, onMobileClose, currentPath, onLogout }: Props) {
  let lastGroup = '';

  return (
    <aside
      className={`
        fixed lg:relative z-30 flex flex-col h-full bg-admin-surface border-r border-admin
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-60'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-admin ${collapsed ? 'justify-center' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="min-w-0">
            <span className="font-bold text-sm text-admin-text block leading-tight">Team10x.in</span>
            <span className="text-2xs text-admin-muted block leading-tight">Admin Panel</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navItems.map((item) => {
          const showGroup = item.group && item.group !== lastGroup;
          if (item.group) lastGroup = item.group;
          const basePath = item.href.split('?')[0];
          const isActive = currentPath === item.href ||
            currentPath === basePath ||
            (basePath !== '/admin-dashboard' && currentPath.startsWith(basePath) && basePath !== '/');

          return (
            <React.Fragment key={`nav-${item.label}`}>
              {showGroup && !collapsed && (
                <p className="text-2xs font-600 text-admin-muted uppercase tracking-widest px-3 pt-4 pb-1">
                  {item.group}
                </p>
              )}
              <Link
                href={item.href}
                onClick={onMobileClose}
                title={collapsed ? item.label : undefined}
                className={`
                  group relative flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 text-sm font-500
                  transition-all duration-150
                  ${isActive
                    ? 'bg-primary/20 text-accent border border-accent/20' :'text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <span className={`flex-shrink-0 ${isActive ? 'text-accent' : ''}`}>{item.icon}</span>
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="bg-danger text-white text-2xs font-700 px-1.5 py-0.5 rounded-full tabular">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-danger rounded-full" />
                )}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-admin">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
        >
          <Globe size={18} />
          {!collapsed && <span>View Website</span>}
        </Link>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-admin-muted hover:bg-danger-subtle hover:text-danger transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}