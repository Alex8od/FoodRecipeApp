import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriterecipes: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;

      // prüfen, ob schon drin (Vergleich über idFood)
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => item.idFood === recipe.idFood
      );

      if (existingIndex !== -1) {
        // existiert → entfernen
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // existiert nicht → hinzufügen
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
