import { AuthService } from '../services/authService';

// Store the original fetch function
const originalFetch = window.fetch;

// Create a wrapper that handles authentication errors
window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  // Add auth headers to all requests if token exists
  const headers = new Headers(init?.headers);
  const token = AuthService.getToken();

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Create new init with updated headers
  const newInit = {
    ...init,
    headers,
  };

  try {
    const response = await originalFetch(input, newInit);

    // Handle 401 Unauthorized responses
    if (response.status === 401) {
      console.warn('Received 401 Unauthorized - token may be expired');

      // Clear expired token
      AuthService.logout();

      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      // Return a rejected promise to prevent further processing
      return Promise.reject(new Error('Authentication expired. Please login again.'));
    }

    return response;
  } catch (error) {
    // Re-throw network errors
    throw error;
  }
};

// Export for potential future use
export const setupApiInterceptors = () => {
  // This function is called in main.tsx to ensure interceptors are set up
  console.log('API interceptors initialized');
};