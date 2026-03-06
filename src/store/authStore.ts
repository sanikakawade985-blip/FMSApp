import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  uid: number | null;
  role: string | null;
  name: string | null;
  phone: string | null;
  token: string | null;
  setAuth: (
    uid: number,
    role: string,
    name: string,
    phone: string,
    token: string
  ) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      uid: null,
      role: null,
      name: null,
      phone: null,
      token: null,

      setAuth: (uid, role, name, phone, token) =>
        set({ uid, role, name, phone, token }),

      clearAuth: () =>
        set({ uid: null, role: null, name: null, phone: null, token: null }),
    }),
    {
      name: 'auth-storage', // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);