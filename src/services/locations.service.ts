/**
 * Locations Service
 * Service layer for location operations
 */

import apiClient from '@/lib/api/client';
import { API_CONFIG } from '@/config/api';
import type { Location } from '@/types';

export const LocationsService = {
  /**
   * Get all locations
   */
  async getLocations(): Promise<Location[]> {
    try {
      const response = await apiClient.get(API_CONFIG.endpoints.locations);
      let locations = [];
      
      // Handle nested data property or direct array
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        locations = response.data.data;
      } else if (Array.isArray(response.data)) {
        locations = response.data;
      }
      
      if (locations.length > 0) {
        return locations.map((loc: any) => ({
          ...loc,
          name: loc.name || loc.location_name || 'Unknown Location'
        }));
      }
      
      return LocationsService.getDefaultLocations();
    } catch (error) {
      // Silently handle error and return default locations
      if (process.env.NODE_ENV === 'development') {
        console.warn('Locations API unavailable, using defaults:', error);
      }
      return LocationsService.getDefaultLocations();
    }
  },

  /**
   * Get default/fallback locations
   */
  getDefaultLocations(): Location[] {
    return [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Delhi' },
      { id: 3, name: 'Bangalore' },
      { id: 4, name: 'Hyderabad' },
      { id: 5, name: 'Chennai' },
      { id: 6, name: 'Kolkata' },
      { id: 7, name: 'Pune' },
      { id: 8, name: 'Ahmedabad' }
    ] as Location[];
  },

  /**
   * Get location by ID
   */
  async getLocationById(id: number): Promise<Location | undefined> {
    const locations = await LocationsService.getLocations();
    return locations.find((loc) => loc.id === id);
  },

  /**
   * Search locations by name
   */
  async searchLocations(query: string): Promise<Location[]> {
    const locations = await LocationsService.getLocations();
    return locations.filter((loc) =>
      loc.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};

export default LocationsService;
