import { create } from 'zustand';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'PEDAGOGICAL_COORDINATOR' | 'TEACHER' | 'REVIEWER' | 'CONTENT_CREATOR';
  permissions: string[];
}

interface AdminAuthState {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAdminAuth: (admin: AdminUser, token: string) => void;
  logoutAdmin: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  admin: null,
  token: null,
  isAuthenticated: false,
  setAdminAuth: (admin, token) => set({ admin, token, isAuthenticated: true }),
  logoutAdmin: () => set({ admin: null, token: null, isAuthenticated: false }),
}));
