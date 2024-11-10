// features/auth/authThunks.ts
import { setCredentials, logout } from "./authSlice";
import { authApi } from "../../api/services/authApi";
import { AppDispatch } from "../../store";

// Async thunk to refresh the authentication token
export const refreshAuthToken = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await dispatch(authApi.endpoints.refreshToken.initiate());
    dispatch(setCredentials({ token: data.token, user: data.user }));
  } catch (error) {
    dispatch(logout());
  }
};

// Thunk to handle logout action (clear the token and user data)
export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(authApi.endpoints.logout.initiate());
  dispatch(logout());
};
