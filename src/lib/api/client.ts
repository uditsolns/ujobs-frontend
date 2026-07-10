/**
 * API Client
 * Axios instance configured for Ujobs India API
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/config/api';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] Response:`, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as any;

    // Determine if the request is idempotent (GET or search/list POSTs)
    const isIdempotent = config?.method?.toUpperCase() === 'GET' || 
                        (config?.method?.toUpperCase() === 'POST' && 
                         (config?.url?.includes('/search') || config?.url?.includes('/list')));

    // Retry logic for idempotent requests on network/timeout errors
    // Limit to 2 retries
    if (
      config &&
      isIdempotent &&
      !config._retry &&
      (!error.response || error.response.status >= 500)
    ) {
      config._retry = (config._retry || 0) + 1;
      
      if (config._retry <= 2) {
        const backoff = config._retry * 1000; // 1s, 2s
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[API] Retrying ${config.method?.toUpperCase()} ${config.url} (${config._retry}/2) after ${backoff}ms...`);
        }
        await new Promise(resolve => setTimeout(resolve, backoff));
        return apiClient(config);
      }
    }

    // Only log errors in development to avoid console noise in production
    if (process.env.NODE_ENV === 'development' || true) { // Always log critical errors for now to help debugging
      // Handle errors
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        // If data is a string and looks like HTML (often 503/404 from server), log a summary
        if (typeof data === 'string' && (data.includes('<!DOCTYPE') || data.includes('<html'))) {
          console.error(`[API] Response error: ${status} (HTML Response received instead of JSON)`);
        } else {
          console.error('[API] Response error:', status, data);
        }
      } else if (error.request) {
        // Request made but no response
        console.error('[API] No response received - possible timeout or network issue');
      } else {
        // Other errors
        console.error('[API] Error:', error.message);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
