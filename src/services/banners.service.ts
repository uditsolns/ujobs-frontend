/**
 * Banners Service
 * Service layer for banner operations
 */

import apiClient from '@/lib/api/client';
import { API_CONFIG } from '@/config/api';
import type { Banner } from '@/types';

export const BannersService = {
  /**
   * Get all banners
   */
  async getBanners(): Promise<Banner[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.banners);
      
      // Handle { status: 'success', data: { ... } } (Current backend behavior)
      if (response.data && response.data.status === 'success' && !Array.isArray(response.data.data) && typeof response.data.data === 'object') {
        const data = response.data.data;
        // Convert object to a single banner item in an array to maintain interface compatibility
        return [{
          id: 1,
          title: 'Welcome to Ujobs India',
          image: data.worker_banner || data.employer_banner || '',
          worker_image: data.worker_banner,
          employer_image: data.employer_banner,
          type: 'Home',
          status: 'Active',
          priority: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Banner];
      }

      // Handle { status: 'success', data: [...] } (Legacy/Standard behavior)
      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  },

  /**
   * Get banner data directly (useful for the specific object format)
   */
  async getBannerData(): Promise<{ worker_banner: string | null; employer_banner: string | null }> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.web.banners);
      if (response.data && response.data.status === 'success' && response.data.data) {
        return response.data.data;
      }
      return { worker_banner: null, employer_banner: null };
    } catch (error) {
      console.error('Error fetching banner data:', error);
      return { worker_banner: null, employer_banner: null };
    }
  },

  /**
   * Get active banners
   */
  async getActiveBanners(): Promise<Banner[]> {
    return await BannersService.getBanners();
  },
};

export default BannersService;
