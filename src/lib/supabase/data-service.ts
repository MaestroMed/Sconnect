import { createServiceClient } from './server'
import type { SiteConfig, Homepage, ServiceCategory, Service, Realization, Testimonial, Brand, AdminUser } from './types'

// Helper to clean update data
function cleanUpdateData<T extends Record<string, unknown>>(data: T): Omit<T, 'id' | 'created_at' | 'updated_at'> {
  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = data as T & { id?: unknown; created_at?: unknown; updated_at?: unknown }
  return rest as Omit<T, 'id' | 'created_at' | 'updated_at'>
}

// =============================================
// SITE CONFIG
// =============================================
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .single()
  
  if (error) {
    console.error('Error fetching site config:', error)
    return null
  }
  return data as SiteConfig
}

export async function updateSiteConfig(updates: Partial<SiteConfig>): Promise<SiteConfig | null> {
  const supabase = createServiceClient()
  const config = await getSiteConfig()
  if (!config) return null

  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('site_config')
    .update(updateData as never)
    .eq('id', config.id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating site config:', error)
    return null
  }
  return data as SiteConfig
}

// =============================================
// HOMEPAGE
// =============================================
export async function getHomepage(): Promise<Homepage | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('homepage')
    .select('*')
    .single()
  
  if (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
  return data as Homepage
}

export async function updateHomepage(updates: Partial<Homepage>): Promise<Homepage | null> {
  const supabase = createServiceClient()
  const homepage = await getHomepage()
  if (!homepage) return null

  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('homepage')
    .update(updateData as never)
    .eq('id', homepage.id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating homepage:', error)
    return null
  }
  return data as Homepage
}

// =============================================
// SERVICE CATEGORIES
// =============================================
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching service categories:', error)
    return []
  }
  return (data || []) as ServiceCategory[]
}

export async function getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching service category:', error)
    return null
  }
  return data as ServiceCategory
}

export async function createServiceCategory(category: Omit<ServiceCategory, 'id' | 'created_at' | 'updated_at'>): Promise<ServiceCategory | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('service_categories')
    .insert(category as never)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating service category:', error)
    return null
  }
  return data as ServiceCategory
}

export async function updateServiceCategory(id: string, updates: Partial<ServiceCategory>): Promise<ServiceCategory | null> {
  const supabase = createServiceClient()
  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('service_categories')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating service category:', error)
    return null
  }
  return data as ServiceCategory
}

export async function deleteServiceCategory(id: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('service_categories')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting service category:', error)
    return false
  }
  return true
}

// =============================================
// SERVICES
// =============================================
export async function getServices(): Promise<Service[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching services:', error)
    return []
  }
  return (data || []) as Service[]
}

export async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('category_id', categoryId)
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching services by category:', error)
    return []
  }
  return (data || []) as Service[]
}

export async function getServiceBySlug(categorySlug: string, serviceSlug: string): Promise<Service | null> {
  const supabase = createServiceClient()
  
  const category = await getServiceCategoryBySlug(categorySlug)
  if (!category) return null

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('category_id', category.id)
    .eq('slug', serviceSlug)
    .single()
  
  if (error) {
    console.error('Error fetching service:', error)
    return null
  }
  return data as Service
}

export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('services')
    .insert(service as never)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating service:', error)
    return null
  }
  return data as Service
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  const supabase = createServiceClient()
  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('services')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating service:', error)
    return null
  }
  return data as Service
}

export async function deleteService(id: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting service:', error)
    return false
  }
  return true
}

// =============================================
// REALIZATIONS
// =============================================
export async function getRealizations(): Promise<Realization[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('realizations')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching realizations:', error)
    return []
  }
  return (data || []) as Realization[]
}

export async function getFeaturedRealizations(): Promise<Realization[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('realizations')
    .select('*')
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(6)
  
  if (error) {
    console.error('Error fetching featured realizations:', error)
    return []
  }
  return (data || []) as Realization[]
}

export async function createRealization(realization: Omit<Realization, 'id' | 'created_at' | 'updated_at'>): Promise<Realization | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('realizations')
    .insert(realization as never)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating realization:', error)
    return null
  }
  return data as Realization
}

export async function updateRealization(id: string, updates: Partial<Realization>): Promise<Realization | null> {
  const supabase = createServiceClient()
  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('realizations')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating realization:', error)
    return null
  }
  return data as Realization
}

export async function deleteRealization(id: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('realizations')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting realization:', error)
    return false
  }
  return true
}

// =============================================
// TESTIMONIALS
// =============================================
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return (data || []) as Testimonial[]
}

export async function getTestimonialsStats() {
  const testimonials = await getTestimonials()
  const totalReviews = testimonials.length
  const averageRating = totalReviews > 0 
    ? Math.round((testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews) * 10) / 10
    : 0

  const distribution: Record<string, number> = {}
  for (let i = 1; i <= 5; i++) {
    distribution[i.toString()] = testimonials.filter(t => t.rating === i).length
  }

  return { totalReviews, averageRating, distribution }
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial as never)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating testimonial:', error)
    return null
  }
  return data as Testimonial
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  const supabase = createServiceClient()
  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('testimonials')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating testimonial:', error)
    return null
  }
  return data as Testimonial
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting testimonial:', error)
    return false
  }
  return true
}

// =============================================
// BRANDS
// =============================================
export async function getBrands(): Promise<Brand[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }
  return (data || []) as Brand[]
}

export async function createBrand(brand: Omit<Brand, 'id' | 'created_at' | 'updated_at'>): Promise<Brand | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('brands')
    .insert(brand as never)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating brand:', error)
    return null
  }
  return data as Brand
}

export async function updateBrand(id: string, updates: Partial<Brand>): Promise<Brand | null> {
  const supabase = createServiceClient()
  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('brands')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating brand:', error)
    return null
  }
  return data as Brand
}

export async function deleteBrand(id: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('brands')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting brand:', error)
    return false
  }
  return true
}

// =============================================
// ADMIN USERS
// =============================================
export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error) {
    console.error('Error fetching admin user:', error)
    return null
  }
  return data as AdminUser
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching admin user:', error)
    return null
  }
  return data as AdminUser
}

export async function createAdminUser(user: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('admin_users')
    .insert(user as never)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating admin user:', error)
    return null
  }
  return data as AdminUser
}

export async function updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
  const supabase = createServiceClient()
  const updateData = cleanUpdateData(updates)

  const { data, error } = await supabase
    .from('admin_users')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating admin user:', error)
    return null
  }
  return data as AdminUser
}
