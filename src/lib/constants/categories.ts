/**
 * Job Categories for SEO
 * Priority job categories for programmatic SEO
 */

export interface JobCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  priority: number;
  searchVolume?: number;
}

export const JOB_CATEGORIES: JobCategory[] = [
  // Healthcare
  { id: 1, name: 'Home Nurse', slug: 'home-nurse', priority: 1 },
  { id: 2, name: 'Patient Caretaker', slug: 'patient-caretaker', priority: 1 },
  { id: 3, name: 'Female Caretaker', slug: 'female-caretaker', priority: 1 },
  { id: 4, name: 'Male Nurse', slug: 'male-nurse', priority: 1 },
  { id: 27, name: 'Caretaker', slug: 'caretaker', priority: 1 },
  { id: 45, name: 'Medical Attendant', slug: 'medical-attendant', priority: 1 },
  
  // Domestic Help
  { id: 17, name: 'Cook', slug: 'cook', priority: 1 },
  { id: 24, name: 'Housekeeping', slug: 'housekeeping', priority: 1 },
  { id: 28, name: 'Maid', slug: 'maid', priority: 1 },
  { id: 29, name: 'Housemaid', slug: 'housemaid', priority: 1 },
  { id: 30, name: 'Nanny', slug: 'nanny', priority: 1 },
  { id: 31, name: 'Japa Maid', slug: 'japa-maid', priority: 1 },
  
  // Drivers
  { id: 5, name: 'Driver', slug: 'driver', priority: 1 },
  { id: 6, name: 'Car Driver', slug: 'car-driver', priority: 1 },
  { id: 7, name: 'Delivery Boy', slug: 'delivery-boy', priority: 1 },
  { id: 26, name: 'Delivery Executive', slug: 'delivery-executive', priority: 1 },
  { id: 8, name: 'Bike Rider', slug: 'bike-rider', priority: 1 },

  
  // Sales & Telecalling
  { id: 9, name: 'Telecaller', slug: 'telecaller', priority: 1 },
  { id: 10, name: 'Sales Executive', slug: 'sales-executive', priority: 1 },
  { id: 11, name: 'Tele Sales', slug: 'tele-sales', priority: 1 },
  { id: 12, name: 'Field Sales', slug: 'field-sales', priority: 1 },
  
  // Office & Admin
  { id: 13, name: 'Office Assistant', slug: 'office-assistant', priority: 2 },
  { id: 14, name: 'Data Entry', slug: 'data-entry', priority: 2 },
  { id: 15, name: 'Receptionist', slug: 'receptionist', priority: 2 },
  { id: 16, name: 'Back Office', slug: 'back-office', priority: 2 },
  
  // Hospitality
  { id: 18, name: 'Waiter', slug: 'waiter', priority: 2 },
  { id: 19, name: 'Hotel Staff', slug: 'hotel-staff', priority: 2 },
  
  // Technical
  { id: 20, name: 'Electrician', slug: 'electrician', priority: 2 },
  { id: 21, name: 'Plumber', slug: 'plumber', priority: 2 },
  { id: 22, name: 'AC Technician', slug: 'ac-technician', priority: 2 },
  { id: 32, name: 'Home Appliance Technician', slug: 'home-appliance-technician', priority: 2 },
  { id: 33, name: 'CCTV Technician', slug: 'cctv-technician', priority: 2 },
  { id: 34, name: 'Computer Technician', slug: 'computer-technician', priority: 2 },
  { id: 35, name: 'Mobile Technician', slug: 'mobile-technician', priority: 2 },
  { id: 36, name: 'Bike Mechanic', slug: 'bike-mechanic', priority: 2 },
  { id: 37, name: 'Car Mechanic', slug: 'car-mechanic', priority: 2 },
  
  // Skilled Workers
  { id: 38, name: 'Carpenter', slug: 'carpenter', priority: 2 },
  { id: 39, name: 'Painter', slug: 'painter', priority: 2 },
  { id: 40, name: 'Tailor', slug: 'tailor', priority: 2 },
  { id: 41, name: 'Gardener', slug: 'gardener', priority: 2 },
  { id: 42, name: 'Beautician', slug: 'beautician', priority: 2 },
  { id: 43, name: 'Mason', slug: 'mason', priority: 2 },
  { id: 44, name: 'Welder', slug: 'welder', priority: 2 },
  
  // Others
  { id: 23, name: 'Security Guard', slug: 'security-guard', priority: 2 },
  { id: 25, name: 'Peon', slug: 'peon', priority: 2 },
];

export const getCategoryBySlug = (slug: string): JobCategory | undefined => {
  return JOB_CATEGORIES.find((cat) => cat.slug === slug);
};

export const getCategoryById = (id: number): JobCategory | undefined => {
  return JOB_CATEGORIES.find((cat) => cat.id === id);
};

export const getTopCategories = (limit: number = 12): JobCategory[] => {
  return JOB_CATEGORIES.filter((cat) => cat.priority === 1).slice(0, limit);
};

export const getAllCategorySlugs = (): string[] => {
  return JOB_CATEGORIES.map((cat) => cat.slug);
};
