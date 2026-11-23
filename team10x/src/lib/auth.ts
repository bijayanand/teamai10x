// Simple domain-agnostic auth using localStorage
// Credentials are checked client-side; works on any domain

export const ADMIN_CREDENTIALS = {
  email: 'admin@team10x.in',
  password: 'Team10x@2026',
};

const AUTH_KEY = 'team10x_admin_auth';

export interface AdminSession {
  email: string;
  name: string;
  role: string;
  loginTime: number;
}

export function login(email: string, password: string): boolean {
  if (
    email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const session: AdminSession = {
      email,
      name: 'Super Admin',
      role: 'super_admin',
      loginTime: Date.now(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    // Session expires after 24 hours
    if (Date.now() - session.loginTime > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
