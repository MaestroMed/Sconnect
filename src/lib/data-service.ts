import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/lib/data');

// Generic read/write functions
function readJsonFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Site Config
export interface SiteConfig {
  siteName: string;
  siteTagline: string;
  phone: string;
  phoneEmergency: string;
  email: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    emergency: string;
  };
  social: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  stats: {
    interventionsPerYear: number;
    yearsExperience: number;
    satisfactionRate: number;
  };
  zones: string[];
  logoUrl?: string;
  logoDarkUrl?: string;
}

export function getSiteConfig(): SiteConfig {
  return readJsonFile<SiteConfig>('site-config.json');
}

export function updateSiteConfig(config: Partial<SiteConfig>): SiteConfig {
  const currentConfig = getSiteConfig();
  const newConfig = { ...currentConfig, ...config };
  writeJsonFile('site-config.json', newConfig);
  return newConfig;
}

// Services
export interface ServicePrestation {
  title: string;
  items: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  fullDescription: string;
  prestations: ServicePrestation[];
  faqs: ServiceFaq[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  shortDescription: string;
  services: Service[];
}

export interface ServicesData {
  categories: ServiceCategory[];
}

export function getServices(): ServicesData {
  return readJsonFile<ServicesData>('services.json');
}

export function updateServices(data: ServicesData): ServicesData {
  writeJsonFile('services.json', data);
  return data;
}

export function getServiceBySlug(categorySlug: string, serviceSlug: string): Service | null {
  const data = getServices();
  const category = data.categories.find(c => c.slug === categorySlug);
  if (!category) return null;
  return category.services.find(s => s.slug === serviceSlug) || null;
}

export function getCategoryBySlug(slug: string): ServiceCategory | null {
  const data = getServices();
  return data.categories.find(c => c.slug === slug) || null;
}

// Realizations
export interface Realization {
  id: string;
  title: string;
  type: string;
  location: string;
  category: string;
  serviceType: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface RealizationsData {
  realizations: Realization[];
}

export function getRealizations(): RealizationsData {
  return readJsonFile<RealizationsData>('realizations.json');
}

export function updateRealizations(data: RealizationsData): RealizationsData {
  writeJsonFile('realizations.json', data);
  return data;
}

export function addRealization(realization: Omit<Realization, 'id'>): Realization {
  const data = getRealizations();
  const newRealization = {
    ...realization,
    id: Date.now().toString()
  };
  data.realizations.push(newRealization);
  writeJsonFile('realizations.json', data);
  return newRealization;
}

export function updateRealization(id: string, updates: Partial<Realization>): Realization | null {
  const data = getRealizations();
  const index = data.realizations.findIndex(r => r.id === id);
  if (index === -1) return null;
  data.realizations[index] = { ...data.realizations[index], ...updates };
  writeJsonFile('realizations.json', data);
  return data.realizations[index];
}

export function deleteRealization(id: string): boolean {
  const data = getRealizations();
  const initialLength = data.realizations.length;
  data.realizations = data.realizations.filter(r => r.id !== id);
  if (data.realizations.length === initialLength) return false;
  writeJsonFile('realizations.json', data);
  return true;
}

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  category: string;
  location: string;
  date: string;
  verified: boolean;
}

export interface TestimonialsStats {
  totalReviews: number;
  averageRating: number;
  distribution: Record<string, number>;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
  stats: TestimonialsStats;
}

export function getTestimonials(): TestimonialsData {
  return readJsonFile<TestimonialsData>('testimonials.json');
}

export function updateTestimonials(data: TestimonialsData): TestimonialsData {
  writeJsonFile('testimonials.json', data);
  return data;
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Testimonial {
  const data = getTestimonials();
  const newTestimonial = {
    ...testimonial,
    id: Date.now().toString()
  };
  data.testimonials.push(newTestimonial);
  // Update stats
  data.stats.totalReviews = data.testimonials.length;
  const totalRating = data.testimonials.reduce((sum, t) => sum + t.rating, 0);
  data.stats.averageRating = Math.round((totalRating / data.testimonials.length) * 10) / 10;
  writeJsonFile('testimonials.json', data);
  return newTestimonial;
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const data = getTestimonials();
  const index = data.testimonials.findIndex(t => t.id === id);
  if (index === -1) return null;
  data.testimonials[index] = { ...data.testimonials[index], ...updates };
  writeJsonFile('testimonials.json', data);
  return data.testimonials[index];
}

export function deleteTestimonial(id: string): boolean {
  const data = getTestimonials();
  const initialLength = data.testimonials.length;
  data.testimonials = data.testimonials.filter(t => t.id !== id);
  if (data.testimonials.length === initialLength) return false;
  // Update stats
  data.stats.totalReviews = data.testimonials.length;
  if (data.testimonials.length > 0) {
    const totalRating = data.testimonials.reduce((sum, t) => sum + t.rating, 0);
    data.stats.averageRating = Math.round((totalRating / data.testimonials.length) * 10) / 10;
  }
  writeJsonFile('testimonials.json', data);
  return true;
}

// Brands
export interface Brand {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  website: string;
}

export interface BrandsData {
  brands: Brand[];
}

export function getBrands(): BrandsData {
  return readJsonFile<BrandsData>('brands.json');
}

export function updateBrands(data: BrandsData): BrandsData {
  writeJsonFile('brands.json', data);
  return data;
}

export function addBrand(brand: Omit<Brand, 'id'>): Brand {
  const data = getBrands();
  const newBrand = {
    ...brand,
    id: Date.now().toString()
  };
  data.brands.push(newBrand);
  writeJsonFile('brands.json', data);
  return newBrand;
}

export function updateBrand(id: string, updates: Partial<Brand>): Brand | null {
  const data = getBrands();
  const index = data.brands.findIndex(b => b.id === id);
  if (index === -1) return null;
  data.brands[index] = { ...data.brands[index], ...updates };
  writeJsonFile('brands.json', data);
  return data.brands[index];
}

export function deleteBrand(id: string): boolean {
  const data = getBrands();
  const initialLength = data.brands.length;
  data.brands = data.brands.filter(b => b.id !== id);
  if (data.brands.length === initialLength) return false;
  writeJsonFile('brands.json', data);
  return true;
}

// Homepage
export interface HomepageData {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_image_url: string | null;
  hero_video_url: string | null;
  about_title: string;
  about_description: string;
  about_features: Array<{ icon: string; title: string; description: string }>;
  services_title: string;
  services_subtitle: string;
  stats_title: string;
  testimonials_title: string;
  testimonials_subtitle: string;
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;
  brands_title: string;
  brands_subtitle: string;
}

export function getHomepage(): HomepageData {
  return readJsonFile<HomepageData>('homepage.json');
}

export function updateHomepage(updates: Partial<HomepageData>): HomepageData {
  const currentData = getHomepage();
  const newData = { ...currentData, ...updates };
  writeJsonFile('homepage.json', newData);
  return newData;
}

// Media
export interface MediaData {
  logo: string;
  logo_white: string;
  favicon: string;
  hero_image: string;
  og_image: string;
  partners: Array<{ id: string; name: string; logo: string }>;
}

export function getMedia(): MediaData {
  return readJsonFile<MediaData>('media.json');
}

export function updateMedia(updates: Partial<MediaData>): MediaData {
  const currentData = getMedia();
  const newData = { ...currentData, ...updates };
  writeJsonFile('media.json', newData);
  return newData;
}

// Admin Users
export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
}

interface AdminUsersData {
  users: AdminUser[];
}

export function getAdminUser(email: string): AdminUser | null {
  const data = readJsonFile<AdminUsersData>('admin-users.json');
  return data.users.find(u => u.email === email) || null;
}

export function getAdminUserById(id: string): AdminUser | null {
  const data = readJsonFile<AdminUsersData>('admin-users.json');
  return data.users.find(u => u.id === id) || null;
}




