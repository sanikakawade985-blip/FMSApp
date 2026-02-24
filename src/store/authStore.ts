import { create } from 'zustand';

type AuthState = {
  uid: string | null;
  role: string | null;
  name: string | null;
  phone: string | null;
  token: string | null;
  setAuth: (
    uid: string,
    role: string,
    name: string,
    phone: string,
    token: string
  ) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  uid: null,
  role: null,
  name: null,
  phone: null,
  token: null,

  setAuth: (uid, role, name, phone, token) =>
    set({ uid, role, name, phone, token }),

  clearAuth: () =>
    set({ uid: null, role: null, name: null, phone: null, token: null }),
}));