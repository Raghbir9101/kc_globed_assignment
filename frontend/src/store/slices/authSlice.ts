import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: {
    id?: number;
    email?: string;
    username?: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    refreshLogin: (state, action: PayloadAction<{ user: AuthState['user'] }>) => {
      state.user = action.payload.user;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  loginSuccess,
  registerSuccess,
  refreshLogin,
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;
