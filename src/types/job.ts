/**
 * Job Type Definitions
 */

export interface Job {
  id: number;
  job_title: string;
  job_description: string;
  requirement?: string;
  expectation?: string;
  salary: string;
  experience: string;
  employment_type: string;
  location_name: string;
  posted_at: string;
  hirer_phone?: string;
  shift_timing?: string;
  working_hrs?: string;
  gender_preference?: string;
  religion_pref?: string | null;
  age_pref?: string | null;
  status: string;
  
  // Relations
  work_type?: {
    id: number;
    name: string;
    image: string | null;
  };
  
  user?: {
    id: number;
    name: string;
    profile_photo: string | null;
    company_name?: string;
    company_logo?: string | null;
  };

  // Legacy/Internal fallbacks
  name?: string;
  description?: string;
  work_type_id?: number;
  location_id?: number;
  user_id?: number;
  pay?: string;
  created_at?: string;
  updated_at?: string;
  company_name?: string;
  company_logo?: string;
  category?: string;
  location?: Location;
}

export interface JobListResponse {
  status: 'success';
  data: Job[];
  current_page: number;
  last_page: number;
  total: number;
}

export interface JobSearchParams {
  query?: string;
  work_type_id?: number;
  location_id?: number;
  page?: number;
}

export interface WorkType {
  id: number;
  name: string;
  image?: string | null;
  description?: string;
  icon?: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: number;
  name: string;
  city?: string;
  location_name?: string;
  state?: string;
  pincode?: string;
  latitude?: string;
  longitude?: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  mobile_no: string;
  company_name?: string;
  company_logo?: string;
  user_type: 'Hirer' | 'Worker' | 'Admin';
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: number;
  title: string;
  image: string;
  worker_image?: string | null;
  employer_image?: string | null;
  link?: string;
  type: 'Home' | 'Jobs' | 'General';
  status: 'Active' | 'Inactive';
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface EmployerLead {
  name: string;
  mobile_no: string;
  company_name?: string;
  requirement?: string;
}

export interface EmployerLeadResponse {
  status: 'success';
  message: string;
  lead_id: number;
}
