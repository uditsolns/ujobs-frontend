/**
 * Jobs Service
 * Service layer for job-related API operations
 */

import apiClient from '@/lib/api/client';
import axios from 'axios';
import { API_CONFIG } from '@/config/api';
import type {
  Job,
  JobListResponse,
  JobSearchParams,
  PaginatedResponse,
} from '@/types';

export const JobsService = {
  /**
   * Get paginated list of jobs
   */
  async getJobs(page: number = 1): Promise<JobListResponse> {
    const response = await apiClient.get(API_CONFIG.endpoints.web.jobs, {
      params: { page },
    });
    return response.data;
  },

  /**
   * Get job details by ID
   */
  async getJobById(id: string | number): Promise<Job | null> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.jobDetail(id));
      if (response.data?.status === 'success') {
        return response.data.data;
      }
      return response.data; // Fallback for unwrapped responses
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      return null;
    }
  },

  /**
   * Search jobs
   */
  async searchJobs(params: JobSearchParams, signal?: AbortSignal): Promise<JobListResponse | Job[]> {
    // Clean up params to prevent backend errors (remove empty/null values)
    const cleanParams: any = {};
    
    if (params.query?.trim()) cleanParams.query = params.query.trim();
    
    // Ensure IDs are valid numbers if provided
    if (params.work_type_id) {
      const id = Number(params.work_type_id);
      if (!isNaN(id) && id > 0) cleanParams.work_type_id = id;
    }
    
    if (params.location_id) {
      const id = Number(params.location_id);
      if (!isNaN(id) && id > 0) cleanParams.location_id = id;
    }
    
    // Handle location name string if provided
    if ((params as any).job_location?.trim()) {
      cleanParams.job_location = (params as any).job_location.trim();
    }
    
    if (params.page) cleanParams.page = Number(params.page);
    cleanParams.per_page = 12;

    try {
      const response = await apiClient.post(API_CONFIG.endpoints.web.jobSearch, cleanParams, { signal });
      return response.data;
    } catch (error: any) {
      // Don't log or return error if it was a cancellation
      if (axios.isCancel(error)) {
        return { status: 'cancelled' } as any;
      }

      console.error('[JobsService] searchJobs failed:', error.message || error);
      
      // Determine if it was a timeout/no-response error
      const isNoResponse = error.request && !error.response;
      
      // Return structured error instead of crashing
      return {
        status: 'error',
        message: isNoResponse ? 'Server not responding. Please check your connection.' : 'Failed to search jobs',
        data: [],
        total: 0,
        current_page: 1,
        last_page: 1,
        per_page: cleanParams.per_page || 12
      } as any;
    }
  },

  /**
   * Get jobs for a specific category and city (for SEO pages)
   */
  async getJobsByCategoryAndCity(
    categoryId: number,
    cityId: number,
    cityName?: string,
    page: number = 1,
    signal?: AbortSignal
  ): Promise<JobListResponse | Job[]> {
    const payload: any = {
      work_type_id: categoryId,
      page,
    };

    // Use ID if available and valid (>0)
    if (cityId > 0) {
      payload.location_id = cityId;
    }

    // Always include cityName as a string filter if provided for maximum reliability
    if (cityName) {
      payload.job_location = cityName;
    }

    try {
      const response = await apiClient.post(API_CONFIG.endpoints.web.jobSearch, payload, { signal });
      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return { status: 'cancelled' } as any;
      }
      
      console.error('[JobsService] getJobsByCategoryAndCity failed:', error);
      // Return empty results instead of crashing the page
      return {
        status: 'error',
        data: [],
        total: 0,
        current_page: 1,
        last_page: 1,
        per_page: 12
      } as any;
    }
  },

  /**
   * Get jobs for a specific category
   */
  async getJobsByCategory(categoryId: number, page: number = 1): Promise<JobListResponse | Job[]> {
    const response = await apiClient.post(API_CONFIG.endpoints.web.jobSearch, {
      work_type_id: categoryId,
    });
    return response.data;
  },

  /**
   * Get jobs for a specific city
   */
  async getJobsByCity(cityId: number, page: number = 1): Promise<JobListResponse | Job[]> {
    const response = await apiClient.post(API_CONFIG.endpoints.web.jobSearch, {
      location_id: cityId,
    });
    return response.data;
  },

  /**
   * Get job statistics
   */
  async getJobStats(): Promise<any> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.jobStats);
      return response.data?.data || {};
    } catch (error) {
      console.error('Error fetching job stats:', error);
      return {
        active_jobs: 0,
        total_candidates: 0,
        new_jobs_this_week: 0,
        top_categories: [],
        top_cities: []
      };
    }
  },

  /**
   * Get featured/premium jobs
   */
  async getFeaturedJobs(limit: number = 10): Promise<Job[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.featuredJobs, {
        params: { per_page: limit }
      });
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
      return [];
    }
  },

  /**
   * Get similar jobs based on job ID
   */
  async getSimilarJobs(jobId: string | number, limit: number = 10): Promise<Job[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.similarJobs(jobId), {
        params: { per_page: limit }
      });
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching similar jobs:', error);
      return [];
    }
  },

  /**
   * Get all jobs with pagination (for sitemap generation)
   * Supports offset-based pagination for large datasets
   */
  async getAllJobsPaginated(offset: number = 0, limit: number = 10000): Promise<Job[]> {
    try {
      // Calculate page number from offset
      const page = Math.floor(offset / limit) + 1;
      
      const response = await apiClient.get(API_CONFIG.endpoints.web.jobs, {
        params: { 
          page,
          per_page: limit,
        },
      });
      
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching paginated jobs:', error);
      return [];
    }
  },
};

export default JobsService;
