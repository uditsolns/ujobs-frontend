/**
 * Categories Service
 * Service layer for category (work types) operations
 */

import apiClient from '@/lib/api/client';
import { API_CONFIG } from '@/config/api';
import type { WorkType } from '@/types';

export const CategoriesService = {
  /**
   * Get all work types/categories
   */
  async getCategories(): Promise<WorkType[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.workTypes);
      let categories = [];
      
      // Based on PublicWebController.php, the response is { status: 'success', workTypes: [...] }
      if (response.data && response.data.workTypes && Array.isArray(response.data.workTypes)) {
        categories = response.data.workTypes;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        categories = response.data.data;
      } else if (Array.isArray(response.data)) {
        categories = response.data;
      }
      
      return categories.map((cat: any) => ({
        ...cat,
        name: cat.name || cat.work_type_name || 'Unknown Category',
        job_count: cat.job_count || cat.jobs_count || 0
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  /**
   * Get category by ID
   */
  async getCategoryById(id: number): Promise<WorkType | undefined> {
    const categories = await CategoriesService.getCategories();
    return categories.find((cat) => cat.id === id);
  },
};

export default CategoriesService;
