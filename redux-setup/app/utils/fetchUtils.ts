// utils/fetchUtils.ts
export const fetchWithRetry = async <T>(url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<T> => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } catch (error) {
      attempt++;
      if (attempt === retries) throw error;
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Failed after retries');
};

// Example: Fetch with retry and handling authorization token
export const fetchWithAuth = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('auth_token');
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
};
