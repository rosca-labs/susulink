import { create } from "zustand";

interface CircleState {
  activeCircle: any | null;
  setActiveCircle: (circle: any | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useCircleStore = create<CircleState>((set) => ({
  activeCircle: null,
  setActiveCircle: (circle) => set({ activeCircle: circle }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));