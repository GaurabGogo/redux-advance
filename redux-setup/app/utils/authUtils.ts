import { RootState } from "@reduxjs/toolkit/query";

// utils/authUtils.ts
export const getToken = (state: RootState): string | null => state.auth.token;

// Save token to localStorage
export const saveToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

// Get token from localStorage
export const loadToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
};

// Handle token expiration logic
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Date.now() >= expiry * 1000;
};
