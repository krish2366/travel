import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  

  login: (token) => {
    set({
      accessToken: token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => set({ user }),
}));
