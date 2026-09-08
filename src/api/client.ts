import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT to every request
apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

// Handle expired / invalid JWT
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(
        'accessToken',
      );

      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);