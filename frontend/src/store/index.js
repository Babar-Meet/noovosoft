import { configureStore, createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'midnight', // 'midnight' (new design) or 'legacy' (the original dark blue/purple theme)
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'midnight' ? 'legacy' : 'midnight';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer
  }
});
