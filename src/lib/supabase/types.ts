export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Simplified database types - allow any for flexibility
export interface Database {
  public: {
    Tables: {
      site_config: {
        Row: SiteConfigRow
        Insert: Partial<SiteConfigRow>
        Update: Partial<SiteConfigRow>
      }
      homepage: {
        Row: HomepageRow
        Insert: Partial<HomepageRow>
        Update: Partial<HomepageRow>
      }
      service_categories: {
        Row: ServiceCategoryRow
        Insert: Partial<ServiceCategoryRow>
        Update: Partial<ServiceCategoryRow>
      }
      services: {
        Row: ServiceRow
        Insert: Partial<ServiceRow>
        Update: Partial<ServiceRow>
      }
      realizations: {
        Row: RealizationRow
        Insert: Partial<RealizationRow>
        Update: Partial<RealizationRow>
      }
      testimonials: {
        Row: TestimonialRow
        Insert: Partial<TestimonialRow>
        Update: Partial<TestimonialRow>
      }
      brands: {
        Row: BrandRow
        Insert: Partial<BrandRow>
        Update: Partial<BrandRow>
      }
      admin_users: {
        Row: AdminUserRow
        Insert: Partial<AdminUserRow>
        Update: Partial<AdminUserRow>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Row types
export interface SiteConfigRow {
  id: string
  site_name: string
  site_tagline: string
  phone: string
  phone_emergency: string
  email: string
  address_street: string
  address_postal_code: string
  address_city: string
  hours_weekdays: string
  hours_saturday: string
  hours_emergency: string
  social_facebook: string | null
  social_linkedin: string | null
  social_instagram: string | null
  seo_title: string
  seo_description: string
  seo_keywords: string
  stats_interventions: number
  stats_years: number
  stats_satisfaction: number
  zones: string[]
  logo_url: string | null
  logo_dark_url: string | null
  favicon_url: string | null
  created_at: string
  updated_at: string
}

export interface HomepageRow {
  id: string
  hero_title: string
  hero_subtitle: string
  hero_cta_primary: string
  hero_cta_secondary: string
  hero_image_url: string | null
  hero_video_url: string | null
  about_title: string
  about_description: string
  about_features: Json
  services_title: string
  services_subtitle: string
  stats_title: string
  testimonials_title: string
  testimonials_subtitle: string
  cta_title: string
  cta_subtitle: string
  cta_button: string
  brands_title: string
  brands_subtitle: string
  created_at: string
  updated_at: string
}

export interface ServiceCategoryRow {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  short_description: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface ServiceRow {
  id: string
  category_id: string
  name: string
  slug: string
  icon: string
  description: string
  full_description: string
  prestations: Json
  faqs: Json
  order_index: number
  created_at: string
  updated_at: string
}

export interface RealizationRow {
  id: string
  title: string
  type: string
  location: string
  category: string
  service_type: string
  description: string
  image_url: string | null
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface TestimonialRow {
  id: string
  name: string
  rating: number
  text: string
  service: string
  category: string
  location: string
  date: string
  verified: boolean
  created_at: string
  updated_at: string
}

export interface BrandRow {
  id: string
  name: string
  category: string
  description: string
  logo_url: string | null
  website: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface AdminUserRow {
  id: string
  email: string
  password_hash: string
  name: string
  role: string
  created_at: string
  updated_at: string
}

// Export convenient aliases
export type SiteConfig = SiteConfigRow
export type Homepage = HomepageRow
export type ServiceCategory = ServiceCategoryRow
export type Service = ServiceRow
export type Realization = RealizationRow
export type Testimonial = TestimonialRow
export type Brand = BrandRow
export type AdminUser = AdminUserRow
