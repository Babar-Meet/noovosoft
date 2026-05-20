import { configureStore, createSlice } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// Persist theme to localStorage so it survives full-page reloads triggered by
// legacy <a href> navigation in the "original clone" HTML pages.
// ---------------------------------------------------------------------------
const THEME_KEY = 'noovosoft_theme';

const loadPersistedTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'midnight' || saved === 'legacy') return saved;
  } catch {
    // SSR / private-mode – ignore
  }
  return 'midnight'; // default
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: loadPersistedTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'midnight' ? 'legacy' : 'midnight';
      try { localStorage.setItem(THEME_KEY, state.mode); } catch { /* noop */ }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      try { localStorage.setItem(THEME_KEY, state.mode); } catch { /* noop */ }
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer
  }
});
