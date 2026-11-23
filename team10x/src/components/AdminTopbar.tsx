'use client';
import React, { useState } from 'react';
import { Menu, Bell, Search, ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';


interface Props {
  onMenuClick: () => void;
  onCollapseToggle: () => void;
  sidebarCollapsed: boolean;
  onLogout?: () => void;
}

const notifications = [
  { id: 'notif-1', text: '7 new enquiries received', time: '2m ago', type: 'lead' },
  { id: 'notif-2', text: 'Instagram post scheduled for 6:00 PM', time: '15m ago', type: 'social' },
  { id: 'notif-3', text: 'LinkedIn post failed — token expired', time: '1h ago', type: 'error' },
  { id: 'notif-4', text: 'New portfolio project added', time: '3h ago', type: 'info' },
];

export default function AdminTopbar({ onMenuClick, onCollapseToggle, sidebarCollapsed, onLogout }: Props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex items-center gap-3 px-4 lg:px-6 py-3 bg-admin-surface border-b border-admin flex-shrink-0">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text transition-all duration-150"
      >
        <Menu size={20} />
      </button>

      {/* Collapse toggle (desktop) */}
      <button
        onClick={onCollapseToggle}
        className="hidden lg:flex p-2 rounded-lg text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text transition-all duration-150"
      >
        {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-admin-surface-2 border border-admin text-admin-muted text-sm">
        <Search size={16} />
        <span>Search...</span>
        <kbd className="ml-auto text-2xs bg-admin-bg px-1.5 py-0.5 rounded border border-admin">⌘K</kbd>
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          className="relative p-2 rounded-lg text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text transition-all duration-150"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-admin-surface border border-admin rounded-xl shadow-card-admin z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-admin flex items-center justify-between">
              <span className="text-sm font-600 text-admin-text">Notifications</span>
              <span className="text-2xs text-warning font-500">4 new</span>
            </div>
            {notifications.map((n) => (
              <div key={n.id} className="px-4 py-3 border-b border-admin last:border-0 hover:bg-admin-surface-2 cursor-pointer transition-colors duration-150">
                <p className="text-sm text-admin-text leading-snug">{n.text}</p>
                <p className="text-2xs text-admin-muted mt-0.5">{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-admin-surface-2 transition-all duration-150"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-700">
            SA
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-600 text-admin-text leading-tight">Super Admin</p>
            <p className="text-2xs text-admin-muted leading-tight">admin@team10x.in</p>
          </div>
          <ChevronDown size={14} className="text-admin-muted hidden md:block" />
        </button>

        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-admin-surface border border-admin rounded-xl shadow-card-admin z-50 animate-fade-in">
            <div className="p-2">
              <button className="w-full text-left px-3 py-2 text-sm text-admin-text hover:bg-admin-surface-2 rounded-lg transition-colors duration-150">Profile Settings</button>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger-subtle rounded-lg transition-colors duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}