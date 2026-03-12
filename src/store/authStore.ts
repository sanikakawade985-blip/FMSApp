import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  uid: number | null;
  role: string | null;
  name: string | null;
  phone: string | null;
  countryCode: string | null;
  token: string | null;

  setAuth: (
    uid: number,
    role: string,
    name: string,
    phone: string,
    token: string
  ) => void;

  setProfile: (
    name: string,
    phone: string,
    countryCode: string
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
      countryCode: null,
      token: null,

      setAuth: (uid, role, name, phone, token) =>
        set({
          uid,
          role,
          name,
          phone,
          token,
        }),

      setProfile: (name, phone, countryCode) =>
        set({
          name,
          phone,
          countryCode,
        }),

      clearAuth: () =>
        set({
          uid: null,
          role: null,
          name: null,
          phone: null,
          countryCode: null,
          token: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);