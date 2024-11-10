// api/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

// Types for API responses and requests
interface LoginResponse {
  token: string;
  user: { id: string; name: string };
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RefreshResponse {
  token: string;
  user: { id: string; name: string };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.query<RefreshResponse, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenQuery, useLogoutMutation } = authApi;
