import create from "zustand";

interface SettingsState {
  animate: boolean;
  toggleAnimate: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  animate: true,
  toggleAnimate: () => set((state) => ({ animate: !state.animate })),
}));
