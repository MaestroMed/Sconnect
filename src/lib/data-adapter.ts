/**
 * Data Adapter - Hybrid Supabase/JSON data layer
 * Uses Supabase in production (when configured), falls back to JSON in development
 */

import * as supabaseService from './supabase/data-service'
import * as jsonService from './data-service'
import type { SiteConfig as JsonSiteConfig } from './data-service'

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && url.includes('supabase'))
}

// Transform Supabase site_config to frontend format
function transformSiteConfig(row: Awaited<ReturnType<typeof supabaseService.getSiteConfig>>): JsonSiteConfig | null {
  if (!row) return null
  return {
    siteName: row.site_name,
    siteTagline: row.site_tagline,
    phone: row.phone,
    phoneEmergency: row.phone_emergency,
    email: row.email,
    address: {
      street: row.address_street,
      postalCode: row.address_postal_code,
      city: row.address_city,
    },
    hours: {
      weekdays: row.hours_weekdays,
      saturday: row.hours_saturday,
      emergency: row.hours_emergency,
    },
    social: {
      facebook: row.social_facebook || '',
      linkedin: row.social_linkedin || '',
      instagram: row.social_instagram || '',
    },
    seo: {
      title: row.seo_title,
      description: row.seo_description,
      keywords: row.seo_keywords,
    },
    stats: {
      interventionsPerYear: row.stats_interventions,
      yearsExperience: row.stats_years,
      satisfactionRate: row.stats_satisfaction,
    },
    zones: row.zones || [],
    logoUrl: row.logo_url || '',
    logoDarkUrl: row.logo_dark_url || '',
  }
}

// Transform frontend format to Supabase format for updates
function transformSiteConfigForUpdate(updates: Partial<JsonSiteConfig>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  
  if (updates.siteName !== undefined) result.site_name = updates.siteName
  if (updates.siteTagline !== undefined) result.site_tagline = updates.siteTagline
  if (updates.phone !== undefined) result.phone = updates.phone
  if (updates.phoneEmergency !== undefined) result.phone_emergency = updates.phoneEmergency
  if (updates.email !== undefined) result.email = updates.email
  if (updates.zones !== undefined) result.zones = updates.zones
  
  if (updates.address) {
    if (updates.address.street !== undefined) result.address_street = updates.address.street
    if (updates.address.postalCode !== undefined) result.address_postal_code = updates.address.postalCode
    if (updates.address.city !== undefined) result.address_city = updates.address.city
  }
  
  if (updates.hours) {
    if (updates.hours.weekdays !== undefined) result.hours_weekdays = updates.hours.weekdays
    if (updates.hours.saturday !== undefined) result.hours_saturday = updates.hours.saturday
    if (updates.hours.emergency !== undefined) result.hours_emergency = updates.hours.emergency
  }
  
  if (updates.social) {
    if (updates.social.facebook !== undefined) result.social_facebook = updates.social.facebook
    if (updates.social.linkedin !== undefined) result.social_linkedin = updates.social.linkedin
    if (updates.social.instagram !== undefined) result.social_instagram = updates.social.instagram
  }
  
  if (updates.seo) {
    if (updates.seo.title !== undefined) result.seo_title = updates.seo.title
    if (updates.seo.description !== undefined) result.seo_description = updates.seo.description
    if (updates.seo.keywords !== undefined) result.seo_keywords = updates.seo.keywords
  }
  
  if (updates.stats) {
    if (updates.stats.interventionsPerYear !== undefined) result.stats_interventions = updates.stats.interventionsPerYear
    if (updates.stats.yearsExperience !== undefined) result.stats_years = updates.stats.yearsExperience
    if (updates.stats.satisfactionRate !== undefined) result.stats_satisfaction = updates.stats.satisfactionRate
  }
  
  if (updates.logoUrl !== undefined) result.logo_url = updates.logoUrl
  if (updates.logoDarkUrl !== undefined) result.logo_dark_url = updates.logoDarkUrl
  
  return result
}

// =============================================
// SITE CONFIG
// =============================================
export async function getSiteConfig() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getSiteConfig()
    const transformed = transformSiteConfig(data)
    if (transformed) return transformed
  }
  return jsonService.getSiteConfig()
}

export async function updateSiteConfig(updates: Parameters<typeof jsonService.updateSiteConfig>[0]) {
  if (isSupabaseConfigured()) {
    const supabaseUpdates = transformSiteConfigForUpdate(updates)
    const data = await supabaseService.updateSiteConfig(supabaseUpdates as never)
    const transformed = transformSiteConfig(data)
    if (transformed) return transformed
  }
  return jsonService.updateSiteConfig(updates)
}

// =============================================
// HOMEPAGE
// =============================================
export async function getHomepage() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getHomepage()
    if (data) {
      // Homepage data is already in correct format (snake_case matches JSON)
      return {
        id: data.id,
        hero_title: data.hero_title,
        hero_subtitle: data.hero_subtitle,
        hero_cta_primary: data.hero_cta_primary,
        hero_cta_secondary: data.hero_cta_secondary,
        hero_image_url: data.hero_image_url,
        hero_video_url: data.hero_video_url,
        about_title: data.about_title,
        about_description: data.about_description,
        about_features: data.about_features,
        services_title: data.services_title,
        services_subtitle: data.services_subtitle,
        stats_title: data.stats_title,
        testimonials_title: data.testimonials_title,
        testimonials_subtitle: data.testimonials_subtitle,
        cta_title: data.cta_title,
        cta_subtitle: data.cta_subtitle,
        cta_button: data.cta_button,
        brands_title: data.brands_title,
        brands_subtitle: data.brands_subtitle,
      }
    }
  }
  return jsonService.getHomepage()
}

export async function updateHomepage(updates: Parameters<typeof jsonService.updateHomepage>[0]) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.updateHomepage(updates as never)
    if (data) return data
  }
  return jsonService.updateHomepage(updates)
}

// =============================================
// MEDIA
// =============================================
export async function getMedia() {
  // Media is JSON-only for now
  return jsonService.getMedia()
}

export async function updateMedia(updates: Parameters<typeof jsonService.updateMedia>[0]) {
  return jsonService.updateMedia(updates)
}

// =============================================
// SERVICES
// =============================================
export async function getServices() {
  if (isSupabaseConfigured()) {
    const categories = await supabaseService.getServiceCategories()
    const services = await supabaseService.getServices()
    if (categories.length > 0) {
      return {
        categories: categories.map(cat => ({
          ...cat,
          services: services.filter(s => s.category_id === cat.id)
        }))
      }
    }
  }
  return jsonService.getServices()
}

export async function updateServices(updates: Parameters<typeof jsonService.updateServices>[0]) {
  // For now, services are JSON-only for simplicity
  // Supabase requires more complex handling
  return jsonService.updateServices(updates)
}

// =============================================
// REALIZATIONS
// =============================================
export async function getRealizations() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getRealizations()
    if (data.length > 0) {
      // Transform to match JSON format
      return {
        realizations: data.map(r => ({
          id: r.id,
          title: r.title,
          type: r.type,
          location: r.location,
          category: r.category,
          serviceType: r.service_type,
          description: r.description,
          image: r.image_url || '',
          featured: r.featured,
        }))
      }
    }
  }
  return jsonService.getRealizations()
}

export async function addRealization(realization: Parameters<typeof jsonService.addRealization>[0]) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.createRealization(realization as any)
    if (data) return data
  }
  return jsonService.addRealization(realization)
}

export async function updateRealization(id: string, updates: any) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.updateRealization(id, updates)
    if (data) return data
  }
  return jsonService.updateRealization(id, updates)
}

export async function deleteRealization(id: string) {
  if (isSupabaseConfigured()) {
    const success = await supabaseService.deleteRealization(id)
    if (success) return true
  }
  return jsonService.deleteRealization(id)
}

// =============================================
// TESTIMONIALS
// =============================================
export async function getTestimonials() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getTestimonials()
    if (data.length > 0) {
      return {
        testimonials: data.map(t => ({
          id: t.id,
          name: t.name,
          rating: t.rating,
          text: t.text,
          service: t.service,
          category: t.category,
          location: t.location,
          date: t.date,
          verified: t.verified,
        })),
        stats: {
          totalReviews: data.length,
          averageRating: data.reduce((sum, t) => sum + t.rating, 0) / data.length,
          distribution: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 }
        }
      }
    }
  }
  return jsonService.getTestimonials()
}

export async function addTestimonial(testimonial: Parameters<typeof jsonService.addTestimonial>[0]) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.createTestimonial(testimonial as any)
    if (data) return data
  }
  return jsonService.addTestimonial(testimonial)
}

export async function updateTestimonial(id: string, updates: any) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.updateTestimonial(id, updates)
    if (data) return data
  }
  return jsonService.updateTestimonial(id, updates)
}

export async function deleteTestimonial(id: string) {
  if (isSupabaseConfigured()) {
    const success = await supabaseService.deleteTestimonial(id)
    if (success) return true
  }
  return jsonService.deleteTestimonial(id)
}

// =============================================
// BRANDS
// =============================================
export async function getBrands() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getBrands()
    if (data.length > 0) {
      return {
        brands: data.map(b => ({
          id: b.id,
          name: b.name,
          category: b.category,
          description: b.description,
          logo: b.logo_url || '',
          website: b.website || '',
        }))
      }
    }
  }
  return jsonService.getBrands()
}

export async function addBrand(brand: Parameters<typeof jsonService.addBrand>[0]) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.createBrand(brand as any)
    if (data) return data
  }
  return jsonService.addBrand(brand)
}

export async function updateBrand(id: string, updates: any) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.updateBrand(id, updates)
    if (data) return data
  }
  return jsonService.updateBrand(id, updates)
}

export async function deleteBrand(id: string) {
  if (isSupabaseConfigured()) {
    const success = await supabaseService.deleteBrand(id)
    if (success) return true
  }
  return jsonService.deleteBrand(id)
}

// =============================================
// ADMIN AUTH (JSON only - uses local file for dev)
// =============================================
export { getAdminUser } from './data-service'

