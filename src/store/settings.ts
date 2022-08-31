import create from "zustand";

export type Styles = "default" | "donk";

interface SettingsState {
  animate: boolean;
  style: Styles;
  setStyle: (style: Styles) => void;
  toggleAnimate: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  animate: true,
  style: "default",
  setStyle: (style) => set({ style }),
  toggleAnimate: () => set((state) => ({ animate: !state.animate })),
}));
