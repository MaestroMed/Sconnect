/**
 * Data Adapter - Hybrid Supabase/JSON data layer
 * Uses Supabase in production (when configured), falls back to JSON in development
 */

import * as supabaseService from './supabase/data-service'
import * as jsonService from './data-service'

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && url.includes('supabase'))
}

// =============================================
// SITE CONFIG
// =============================================
export async function getSiteConfig() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getSiteConfig()
    if (data) return data
  }
  return jsonService.getSiteConfig()
}

export async function updateSiteConfig(updates: Parameters<typeof jsonService.updateSiteConfig>[0]) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.updateSiteConfig(updates)
    if (data) return data
  }
  return jsonService.updateSiteConfig(updates)
}

// =============================================
// HOMEPAGE
// =============================================
export async function getHomepage() {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.getHomepage()
    if (data) return data
  }
  return jsonService.getHomepage()
}

export async function updateHomepage(updates: Parameters<typeof jsonService.updateHomepage>[0]) {
  if (isSupabaseConfigured()) {
    const data = await supabaseService.updateHomepage(updates)
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
    if (data.length > 0) return data
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
    if (data.length > 0) return data
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
    if (data.length > 0) return data
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

