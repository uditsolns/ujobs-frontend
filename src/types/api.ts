/**
 * API Response Type Definitions
 */

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  status: 'success';
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page?: number;
  from?: number;
  to?: number;
}

export interface ApiError {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}
