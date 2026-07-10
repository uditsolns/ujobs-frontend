/**
 * Priority Cities for SEO
 * Top cities for programmatic SEO page generation
 */

export interface City {
  id: number;
  name: string;
  slug: string;
  state: string;
  priority: number;
  population?: number;
}

export const PRIORITY_CITIES: City[] = [
  { id: 1, name: 'Delhi', slug: 'delhi', state: 'Delhi', priority: 1 },
  { id: 2, name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', priority: 1 },
  { id: 3, name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', priority: 1 },
  { id: 4, name: 'Pune', slug: 'pune', state: 'Maharashtra', priority: 1 },
  { id: 5, name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', priority: 1 },
  { id: 6, name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', priority: 1 },
  { id: 7, name: 'Noida', slug: 'noida', state: 'Uttar Pradesh', priority: 1 },
  { id: 8, name: 'Gurgaon', slug: 'gurgaon', state: 'Haryana', priority: 1 },
  
  // Tier 2 cities
  { id: 9, name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', priority: 2 },
  { id: 10, name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', priority: 2 },
  { id: 11, name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', priority: 2 },
  { id: 12, name: 'Surat', slug: 'surat', state: 'Gujarat', priority: 2 },
  { id: 13, name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', priority: 2 },
  { id: 14, name: 'Kanpur', slug: 'kanpur', state: 'Uttar Pradesh', priority: 2 },
  { id: 15, name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra', priority: 2 },
  { id: 16, name: 'Indore', slug: 'indore', state: 'Madhya Pradesh', priority: 2 },
  { id: 17, name: 'Thane', slug: 'thane', state: 'Maharashtra', priority: 2 },
  { id: 18, name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh', priority: 2 },
  { id: 19, name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh', priority: 2 },
  { id: 20, name: 'Patna', slug: 'patna', state: 'Bihar', priority: 2 },
  { id: 21, name: 'Bhilwara', slug: 'bhilwara', state: 'Rajasthan', priority: 2 },
  { id: 22, name: 'Ludhiana', slug: 'ludhiana', state: 'Punjab', priority: 2 },
  { id: 23, name: 'Agra', slug: 'agra', state: 'Uttar Pradesh', priority: 2 },
  { id: 24, name: 'Nashik', slug: 'nashik', state: 'Maharashtra', priority: 2 },
  { id: 25, name: 'Faridabad', slug: 'faridabad', state: 'Haryana', priority: 2 },
  { id: 26, name: 'Meerut', slug: 'meerut', state: 'Uttar Pradesh', priority: 2 },
  { id: 27, name: 'Rajkot', slug: 'rajkot', state: 'Gujarat', priority: 2 },
  { id: 28, name: 'Varanasi', slug: 'varanasi', state: 'Uttar Pradesh', priority: 2 },
  { id: 29, name: 'Srinagar', slug: 'srinagar', state: 'Jammu & Kashmir', priority: 2 },
  { id: 30, name: 'Aurangabad', slug: 'aurangabad', state: 'Maharashtra', priority: 2 },
  { id: 31, name: 'Ghaziabad', slug: 'ghaziabad', state: 'Uttar Pradesh', priority: 2 },
  { id: 32, name: 'Chandigarh', slug: 'chandigarh', state: 'Chandigarh', priority: 2 },
  { id: 33, name: 'Amritsar', slug: 'amritsar', state: 'Punjab', priority: 2 },
  { id: 34, name: 'Navi Mumbai', slug: 'navi-mumbai', state: 'Maharashtra', priority: 2 },
  { id: 35, name: 'Kochi', slug: 'kochi', state: 'Kerala', priority: 2 },
  { id: 36, name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu', priority: 2 },
  { id: 37, name: 'Guwahati', slug: 'guwahati', state: 'Assam', priority: 2 },
  { id: 38, name: 'Ranchi', slug: 'ranchi', state: 'Jharkhand', priority: 2 },
  { id: 39, name: 'Raipur', slug: 'raipur', state: 'Chhattisgarh', priority: 2 },
  { id: 40, name: 'Bhubaneswar', slug: 'bhubaneswar', state: 'Odisha', priority: 2 },
  { id: 41, name: 'Jamshedpur', slug: 'jamshedpur', state: 'Jharkhand', priority: 2 },
  { id: 42, name: 'Vadodara', slug: 'vadodara', state: 'Gujarat', priority: 2 },
  { id: 43, name: 'Madurai', slug: 'madurai', state: 'Tamil Nadu', priority: 2 },
  { id: 44, name: 'Jodhpur', slug: 'jodhpur', state: 'Rajasthan', priority: 2 },
  { id: 45, name: 'Gwalior', slug: 'gwalior', state: 'Madhya Pradesh', priority: 2 },
  { id: 46, name: 'Vijayawada', slug: 'vijayawada', state: 'Andhra Pradesh', priority: 2 },
  { id: 47, name: 'Hubli', slug: 'hubli', state: 'Karnataka', priority: 2 },
  { id: 48, name: 'Mysuru', slug: 'mysuru', state: 'Karnataka', priority: 2 },
  { id: 49, name: 'Salem', slug: 'salem', state: 'Tamil Nadu', priority: 2 },
  { id: 50, name: 'Tiruchirappalli', slug: 'tiruchirappalli', state: 'Tamil Nadu', priority: 2 },
  { id: 51, name: 'Bareilly', slug: 'bareilly', state: 'Uttar Pradesh', priority: 2 },
  { id: 52, name: 'Aligarh', slug: 'aligarh', state: 'Uttar Pradesh', priority: 2 },
  { id: 53, name: 'Moradabad', slug: 'moradabad', state: 'Uttar Pradesh', priority: 2 },
  { id: 54, name: 'Saharanpur', slug: 'saharanpur', state: 'Uttar Pradesh', priority: 2 },
  { id: 55, name: 'Gorakhpur', slug: 'gorakhpur', state: 'Uttar Pradesh', priority: 2 },
  { id: 56, name: 'Dehradun', slug: 'dehradun', state: 'Uttarakhand', priority: 2 },
  { id: 57, name: 'Shimla', slug: 'shimla', state: 'Himachal Pradesh', priority: 2 },
  { id: 58, name: 'Jalandhar', slug: 'jalandhar', state: 'Punjab', priority: 2 },
  { id: 59, name: 'Patiala', slug: 'patiala', state: 'Punjab', priority: 2 },
];

export const getCityBySlug = (slug: string): City | undefined => {
  return PRIORITY_CITIES.find((city) => city.slug === slug);
};

export const getCityById = (id: number): City | undefined => {
  return PRIORITY_CITIES.find((city) => city.id === id);
};

export const getTier1Cities = (): City[] => {
  return PRIORITY_CITIES.filter((city) => city.priority === 1);
};

export const getAllCitySlugs = (): string[] => {
  return PRIORITY_CITIES.map((city) => city.slug);
};
