import { create } from "zustand";

export const useStore = create(set => ({
  currentLook: {},

  setProduct: (type, product) =>
    set(state => ({
      currentLook: { ...state.currentLook, [type]: product }
    }))
}));
