import create from "zustand";

export type Styles = "default" | "donk" | "nymn";

interface SettingsState {
  animate: boolean;
  showNames: boolean;
  style: Styles;
  setStyle: (style: Styles) => void;
  toggleAnimate: () => void;
  toggleShowNames: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  animate: true,
  showNames: false,
  style: "default",
  setStyle: (style) => set({ style }),
  toggleAnimate: () => set((state) => ({ animate: !state.animate })),
  toggleShowNames: () => set((state) => ({ showNames: !state.showNames })),
}));
