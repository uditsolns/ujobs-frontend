/**
 * Candidate/Worker Type Definitions
 * 
 * Types for the candidates/workers displayed on the website
 */

export interface Candidate {
  id: number;
  name: string;
  profile_photo: string | null;
  
  // Masked contact information
  phone: string | null;
  email: string | null;
  
  // Location
  city: string;
  pincode: string; // Partially masked
  
  // Professional information
  work_types: WorkType[];
  total_experience: number | string;
  education: string | null;
  languages_known: string[] | null;
  skills: Skill[];
  sal_expectation: string | null;
  
  // Demographics
  gender: 'Male' | 'Female' | 'Other' | null;
  age: number | null;
  
  // Verification
  profile_completion: number;
  verification_status: 'verified' | 'pending' | 'rejected';
  is_verified: boolean;
  
  // Rating and Reviews
  average_rating?: string | number;
  total_ratings?: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Contact unlock info
  contact_locked: boolean;
  unlock_message: string;
}

export interface CandidateListResponse {
  status: 'success';
  data: Candidate[];
  current_page: number;
  last_page: number;
  total: number;
}

export interface CandidateSearchParams {
  query?: string;
  work_type_id?: number;
  work_type?: string; // Work type name for searching
  city?: string;
  min_experience?: number;
  experience?: string; // Experience range like "0-1", "1-3", "3-5", "5+"
  gender?: 'Male' | 'Female' | 'Other';
  language?: string;
  min_profile_completion?: number; // Minimum profile completion percentage
  page?: number;
  per_page?: number;
}

export interface WorkType {
  id: number;
  name: string;
  image: string | null; // Work type category image
  description?: string;
  icon?: string;
  status?: number | 'Active' | 'Inactive';
  created_at?: string;
  updated_at?: string;
  average_salary?: string | null; // Average salary for this work type
  job?: any; // Job related information
  priority?: string | null; // Priority/ordering of work type
}

export interface Skill {
  id: number;
  name?: string;
  skill_name?: string;
}

export interface CandidateStats {
  total_verified: number;
  by_category?: number;
  by_city?: number;
}

export interface CandidateStatsParams {
  work_type_id?: number;
  city?: string;
}

// For display in UI
export interface CandidateCardProps {
  candidate: Candidate;
  locale: string;
  onContactClick?: (candidate: Candidate) => void;
}

// For filters component
export interface CandidateFilters {
  workType?: number;
  city?: string;
  minExperience?: number;
  gender?: 'Male' | 'Female' | 'Other';
  language?: string;
}

// Experience details (if worker has experience records)
export interface WorkerExperience {
  id: number;
  worker_id: number;
  company_name: string;
  designation: string;
  duration: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Full candidate profile (for detail page)
export interface CandidateProfile extends Candidate {
  // Additional details available on profile page
  address?: string; // May be partially masked
  experiences?: WorkerExperience[];
  religion?: string;
  work_hours?: string;
  reporting_location?: string;
}
