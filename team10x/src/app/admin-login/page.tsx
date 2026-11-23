'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Zap, Lock, Mail, AlertCircle } from 'lucide-react';

import { login, isAuthenticated } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin-dashboard');
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        router.replace('/admin-dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-admin-surface border border-admin rounded-2xl p-8 shadow-2xl">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
              <Zap size={28} className="text-accent" />
            </div>
            <h1 className="text-2xl font-800 text-admin-text">Team10x Admin</h1>
            <p className="text-sm text-admin-muted mt-1">Sign in to your admin panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-600 text-admin-muted uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@team10x.in"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-admin-bg border border-admin rounded-xl text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 transition-colors duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-600 text-admin-muted uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-admin-bg border border-admin rounded-xl text-admin-text text-sm placeholder:text-admin-muted focus:outline-none focus:border-accent/50 transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors duration-150"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-danger/10 border border-danger/20">
                <AlertCircle size={14} className="text-danger flex-shrink-0" />
                <p className="text-xs text-danger">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-primary font-700 text-sm rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Admin Panel'
              )}
            </button>
          </form>

          {/* Back to website */}
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-admin-muted hover:text-accent transition-colors duration-150">
              ← Back to Team10x.in website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
