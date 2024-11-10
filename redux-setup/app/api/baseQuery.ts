// api/baseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import { getToken } from '../utils/authUtils';

// Custom base query function to handle authentication and errors
export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.example.com/',
  prepareHeaders: (headers, { getState }) => {
    const token = getToken(getState() as RootState);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  // Custom error handling
  async fetchFn(url: string, options: RequestInit) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response;
    } catch (error) {
      if (error.message === 'Unauthorized') {
        // Handle token expiration, logout user
        const dispatch = store.dispatch;
        dispatch(logout());
      }
      throw error;
    }
  },
});
