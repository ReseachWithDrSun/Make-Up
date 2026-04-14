import { create } from "zustand";

export const useStore = create(set => ({
  look: {
    lipstick: null,
    eyeshadow: null,
    blush: null,
    foundation: null
  },

  setProduct: (type, product) =>
    set(state => ({
      look: {
        ...state.look,
        [type]: product
      }
    }))
}));
