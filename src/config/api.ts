/**
 * API Configuration
 * Centralized API endpoint configuration
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ujobsindia.com/aayusha-backend/public/api/v1',
  timeout: 30000,
  
  endpoints: {
    // Public endpoints (consolidated under web prefix)
    workTypes: '/web/work-types',
    locations: '/web/locations',

    // Web-specific endpoints (public website APIs)
    web: {
      // Jobs
      jobs: '/web/jobs',
      jobSearch: '/web/jobs/search',
      jobDetail: (id: string | number) => `/web/jobs/${id}`,
      jobStats: '/web/jobs/stats',
      featuredJobs: '/web/jobs/featured',
      similarJobs: (id: string | number) => `/web/jobs/${id}/similar`,
      
      // Candidates (NEW)
      candidates: '/web/candidates',
      candidateSearch: '/web/candidates/search',
      candidateDetail: (id: string | number) => `/web/candidates/${id}`,
      candidateStats: '/web/candidates/stats',
      featuredCandidates: '/web/candidates/featured',
      similarCandidates: (id: string | number) => `/web/candidates/${id}/similar`,
      
      // Other
      banners: '/web/banners',
      employerLead: '/web/employer-lead',
    },
    
    // General endpoints (may require auth)
    jobs: {
      list: '/job-all-pagination',
      detail: (id: string | number) => `/jobs/${id}`,
      search: '/search/job/list',
      statusCount: '/job-status-count',
    },
    
    marketing: {
      banners: '/banner',
      sliders: '/slider',
    },
    
    support: '/support',
  },
} as const;

export type APIConfig = typeof API_CONFIG;
