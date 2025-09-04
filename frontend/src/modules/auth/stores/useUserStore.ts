import { create } from "zustand";
import type { UserT } from "../types/user";


interface UserStore {
  user: UserT | null;
  setUser: (user: UserT) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
