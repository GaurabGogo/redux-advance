// store/rootReducer.ts
import { combineReducers } from "redux";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./api/services/authApi";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
