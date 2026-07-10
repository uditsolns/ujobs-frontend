/**
 * API Service (Legacy)
 * Maintained for backward compatibility
 * Use individual service files for new code
 */

import JobsService from './jobs.service';
import CategoriesService from './categories.service';
import LocationsService from './locations.service';
import BannersService from './banners.service';
import LeadsService from './leads.service';

export const ApiService = {
  // Jobs
  getJobs: (page?: number) => JobsService.getJobs(page),
  getJobDetails: (id: string | number) => JobsService.getJobById(id),
  searchJobs: (params: any) => JobsService.searchJobs(params),
  
  // Categories
  getCategories: () => CategoriesService.getCategories(),
  
  // Locations
  getLocations: () => LocationsService.getLocations(),
  
  // Banners
  getBanners: () => BannersService.getBanners(),
  
  // Leads
  submitEmployerLead: (lead: any) => LeadsService.submitLead(lead),
};

export default ApiService;


