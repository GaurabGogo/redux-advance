// features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../../api/services/userApi";

interface UserState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // This action sets the user credentials (token and user data)
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: { id: string; name: string; email: string };
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // This action clears the user credentials (logout)
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;
        }
      )
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;
        }
      );
  },
});

export const { setCredentials, logout } = userSlice.actions; // Export the action
export default userSlice.reducer; // Export the reducer
