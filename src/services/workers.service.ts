/**
 * Worker/Candidate Service
 * API calls for worker/candidate data
 */

import api from '@/lib/api/client';
import type { Worker, WorkerSearchParams, WorkerListResponse } from '@/types/worker';

class WorkerService {
  /**
   * Get all workers/candidates
   */
  async getWorkers(params?: WorkerSearchParams): Promise<Worker[]> {
    try {
      const response = await api.get<Worker[]>('/workers', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching workers:', error);
      return [];
    }
  }

  /**
   * Get worker by ID
   */
  async getWorkerById(id: number): Promise<Worker | null> {
    try {
      const response = await api.get<Worker>(`/workers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching worker ${id}:`, error);
      return null;
    }
  }

  /**
   * Search workers
   */
  async searchWorkers(params: WorkerSearchParams): Promise<Worker[]> {
    try {
      const response = await api.post<Worker[]>('/search/list/worker', params);
      return response.data;
    } catch (error) {
      console.error('Error searching workers:', error);
      return [];
    }
  }

  /**
   * Get workers by category
   */
  getWorkersByCategory = async (categoryId: number): Promise<Worker[]> => {
    try {
      const workers = await this.getWorkers();
      return workers.filter((worker) => {
        if (Array.isArray(worker.work_types)) {
          return worker.work_types.some((wt: any) => wt.id === categoryId);
        }
        if (typeof worker.work_types === 'string') {
          const ids = worker.work_types.split(',').map(Number);
          return ids.includes(categoryId);
        }
        return false;
      });
    } catch (error) {
      console.error('Error fetching workers by category:', error);
      return [];
    }
  }

  /**
   * Get workers by city
   */
  getWorkersByCity = async (city: string): Promise<Worker[]> => {
    try {
      const workers = await this.getWorkers();
      return workers.filter((worker) => 
        worker.city?.toLowerCase() === city.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching workers by city:', error);
      return [];
    }
  }

  /**
   * Get workers by category and city
   */
  getWorkersByCategoryAndCity = async (categoryId: number, city: string): Promise<Worker[]> => {
    try {
      const workers = await this.getWorkersByCategory(categoryId);
      return workers.filter((worker) => 
        worker.city?.toLowerCase() === city.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching workers by category and city:', error);
      return [];
    }
  }

  /**
   * Get nearby workers (requires auth)
   */
  async getNearbyWorkers(latitude: number, longitude: number, radius: number = 10): Promise<Worker[]> {
    try {
      const response = await api.post<Worker[]>('/search/nearby', {
        latitude,
        longitude,
        radius,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby workers:', error);
      return [];
    }
  }

  /**
   * Get worker's profile completion percentage
   */
  getProfileCompletion(worker: Worker): number {
    return worker.profile_completion || 0;
  }

  /**
   * Check if worker is verified
   */
  isVerified(worker: Worker): boolean {
    return worker.verified === true;
  }

  /**
   * Get worker's rating
   */
  getRating(worker: Worker): { average: number; total: number } {
    if (worker.rating) {
      return worker.rating;
    }
    // Default random rating as per backend logic
    return {
      average: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)),
      total: Math.floor(Math.random() * (15 - 2 + 1)) + 2,
    };
  }

  /**
   * Get worker's work types
   */
  getWorkTypes(worker: Worker): string[] {
    if (Array.isArray(worker.work_types)) {
      return worker.work_types.map((wt: any) => 
        typeof wt === 'object' ? wt.name : wt
      );
    }
    if (typeof worker.work_types === 'string') {
      return worker.work_types.split(',');
    }
    return [];
  }

  /**
   * Get worker's languages
   */
  getLanguages(worker: Worker): string[] {
    if (Array.isArray(worker.languages_known)) {
      return worker.languages_known;
    }
    if (typeof worker.languages_known === 'string') {
      try {
        return JSON.parse(worker.languages_known);
      } catch {
        return worker.languages_known.split(',');
      }
    }
    return [];
  }

  /**
   * Get worker's skills
   */
  getSkills(worker: Worker): string[] {
    if (worker.skills && Array.isArray(worker.skills)) {
      return worker.skills.map((skill) => skill.name);
    }
    return [];
  }

  /**
   * Get worker's profile photo URL
   */
  getProfilePhotoUrl(worker: Worker, baseURL: string): string {
    if (worker.profile_photo) {
      if (worker.profile_photo.startsWith('http')) {
        return worker.profile_photo;
      }
      return `${baseURL}/${worker.profile_photo}`;
    }
    return '/images/avatar-placeholder.png';
  }

  /**
   * Get worker's age or age range
   */
  getAge(worker: Worker): string {
    if (worker.age) {
      return `${worker.age} years`;
    }
    if (worker.date_of_birth) {
      const age = new Date().getFullYear() - new Date(worker.date_of_birth).getFullYear();
      return `${age} years`;
    }
    return 'N/A';
  }

  /**
   * Get worker's experience text
   */
  getExperience(worker: Worker): string {
    if (worker.total_experience) {
      return worker.total_experience;
    }
    if (worker.work_experience) {
      return worker.work_experience;
    }
    return 'Fresher';
  }

  /**
   * Get worker's expected salary
   */
  getExpectedSalary(worker: Worker): string {
    if (worker.sal_expectation) {
      return worker.sal_expectation;
    }
    return 'Negotiable';
  }
}

export default new WorkerService();
