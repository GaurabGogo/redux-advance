// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/services/authApi";

// Types for auth state
interface AuthState {
  token: string | null;
  user: { id: string, name: string } | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string,
        user: { id: string, name: string },
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;
          state.status = "succeeded";
        }
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message ?? "An unknown error occurred";
      })
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
        }
      );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
