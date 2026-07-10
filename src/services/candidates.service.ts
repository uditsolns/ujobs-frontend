/**
 * Candidates Service
 * Service layer for candidate-related API operations
 * Uses the public web endpoints for verified candidates
 */

import apiClient from '@/lib/api/client';
import axios from 'axios';
import { API_CONFIG } from '@/config/api';
import type {
  Candidate,
  CandidateListResponse,
  CandidateSearchParams,
  CandidateStats,
  CandidateStatsParams,
  CandidateProfile,
} from '@/types/candidate';

export const CandidatesService = {
  /**
   * Get paginated list of verified candidates
   */
  async getCandidates(page: number = 1, perPage: number = 20, signal?: AbortSignal): Promise<CandidateListResponse> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.candidates, {
        params: { page, per_page: perPage },
        signal
      });
      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return { status: 'cancelled' } as any;
      }
      console.error('[CandidatesService] Error fetching candidates:', error);
      // Return error result
      return {
        status: 'error',
        message: 'Failed to load candidates',
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
      } as any;
    }
  },

  /**
   * Get candidate details by ID
   */
  async getCandidateById(id: string | number): Promise<CandidateProfile | null> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.candidateDetail(id));
      if (response.data.status === 'success') {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error(`[CandidatesService] Error fetching candidate ${id}:`, error);
      return null;
    }
  },

  /**
   * Search candidates with filters
   */
  async searchCandidates(params: CandidateSearchParams, signal?: AbortSignal): Promise<CandidateListResponse> {
    try {
      const response = await apiClient.post(API_CONFIG.endpoints.web.candidateSearch, params, { signal });
      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return { status: 'cancelled' } as any;
      }
      console.error('[CandidatesService] Error searching candidates:', error.message || error);
      
      const isNoResponse = error.request && !error.response;
      
      return {
        status: 'error',
        message: isNoResponse ? 'Server not responding. Please check your connection.' : 'Failed to search candidates',
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
      } as any;
    }
  },

  /**
   * Get candidates for a specific category and city (for SEO pages)
   */
  async getCandidatesByCategoryAndCity(
    workTypeId: number,
    city: string,
    page: number = 1,
    signal?: AbortSignal
  ): Promise<Candidate[]> {
    try {
      const response = await apiClient.post(API_CONFIG.endpoints.web.candidateSearch, {
        work_type_id: workTypeId,
        city: city,
        page: page,
        per_page: 20,
      }, { signal });
      return response.data.data || [];
    } catch (error: any) {
      if (axios.isCancel(error)) return [] as any;
      console.error('[CandidatesService] Error fetching candidates by category and city:', error);
      return [];
    }
  },

  /**
   * Get candidates for a specific category
   */
  async getCandidatesByCategory(workTypeId: number, page: number = 1): Promise<Candidate[]> {
    try {
      const response = await apiClient.post(API_CONFIG.endpoints.web.candidateSearch, {
        work_type_id: workTypeId,
        page: page,
        per_page: 20,
      });
      return response.data.data || [];
    } catch (error) {
      console.error('[CandidatesService] Error fetching candidates by category:', error);
      return [];
    }
  },

  /**
   * Get candidates for a specific city
   */
  async getCandidatesByCity(city: string, page: number = 1): Promise<Candidate[]> {
    try {
      const response = await apiClient.post(API_CONFIG.endpoints.web.candidateSearch, {
        city: city,
        page: page,
        per_page: 20,
      });
      return response.data.data || [];
    } catch (error) {
      console.error('[CandidatesService] Error fetching candidates by city:', error);
      return [];
    }
  },

  /**
   * Get candidate statistics
   * Useful for homepage and SEO pages
   */
  async getCandidateStats(params?: CandidateStatsParams): Promise<CandidateStats | null> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.candidateStats, {
        params,
      });
      if (response.data.status === 'success') {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('[CandidatesService] Error fetching candidate stats:', error);
      return null;
    }
  },

  /**
   * Get featured candidates for homepage
   */
  async getFeaturedCandidates(limit: number = 10): Promise<Candidate[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.featuredCandidates, {
        params: { limit },
      });
      if (response.data.status === 'success') {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('[CandidatesService] Error fetching featured candidates:', error);
      return [];
    }
  },

  /**
   * Get similar candidates by candidate ID
   * Uses dedicated similar candidates endpoint
   */
  async getSimilarCandidates(candidateId: string | number, limit: number = 10): Promise<Candidate[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.similarCandidates(candidateId), {
        params: { per_page: limit }
      });

      if (response.data?.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('[CandidatesService] Error fetching similar candidates:', error);
      return [];
    }
  },
};

export default CandidatesService;
