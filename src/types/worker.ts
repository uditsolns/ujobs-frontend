/**
 * Worker/Candidate Type Definitions
 * Based on actual backend API structure
 */

export interface Skill {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface WorkType {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: number;
  worker_id: number;
  company_name: string;
  designation: string;
  from_date: string;
  to_date: string | null;
  work_types?: WorkType[];
  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: number;
  worker_id?: number;
  user_id?: number;
  hirer_rating?: number;
  worker_rating?: number;
  hirer_feedback?: string;
  worker_feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface Worker {
  id: number;
  w_id: string;
  name: string;
  email: string;
  phone: string;
  mobile_no?: string;
  email_verified_at?: string | null;
  
  // Profile Information
  profile_photo?: string;
  address?: string;
  city?: string;
  country?: string;
  pincode?: string;
  gender?: string;
  age?: number;
  religion?: string;
  date_of_birth?: string;
  
  // Work Information
  work_types?: WorkType[] | number[] | string;
  total_experience?: string;
  work_experience?: string;
  work_hours?: string;
  sal_expectation?: string;
  reporting_location?: string;
  
  // Education & Skills
  education?: string;
  education_certificate?: string[];
  languages_known?: string[] | string;
  skills?: Skill[];
  
  // Documents
  adhaar_front?: string;
  adhaar_back?: string;
  pan_copy?: string;
  character_certification?: string;
  police_certification?: string;
  driving_license?: string;
  
  // Profile Status
  profile_completion?: number;
  verified?: boolean;
  status?: string;
  test_status?: number;
  
  // Additional Info
  other_options?: any;
  workflow_questions?: any;
  demo_experience?: string;
  device_token?: string;
  device_type?: string;
  
  // Relationships
  experiences?: Experience[];
  transactions?: any[];
  worker_view?: any;
  ratings?: Rating[];
  
  // Calculated Fields
  rating?: {
    average: number;
    total: number;
  };
  
  // Location Data
  latitude?: number;
  longitude?: number;
  last_seen?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface WorkerSearchParams {
  work_type_id?: number;
  location_id?: number;
  city?: string;
  query?: string;
  experience?: string;
  min_salary?: number;
  max_salary?: number;
  gender?: string;
  age_min?: number;
  age_max?: number;
  verified_only?: boolean;
  page?: number;
  limit?: number;
}

export interface WorkerListResponse {
  status: string;
  data: Worker[];
  current_page?: number;
  last_page?: number;
  total?: number;
}
