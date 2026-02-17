import { create } from 'zustand';
import { Role } from '../types/role';

type AuthState = {
  uid: string | null;
  role: Role | null;
  setAuth: (uid: string, role: Role) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  uid: null,
  role: null,
  setAuth: (uid, role) => set({ uid, role }),
  clearAuth: () => set({ uid: null, role: null }),
}));
