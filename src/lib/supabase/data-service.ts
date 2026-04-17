import { createServiceClient } from './server'
import type {
  SiteConfig,
  Homepage,
  ServiceCategory,
  Service,
  Realization,
  Testimonial,
  Brand,
  AdminUser,
  Submission,
  SubmissionStatus,
  SubmissionType,
  NewsletterSubscriber,
  Post,
  PasswordResetToken,
} from './types'

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

// =============================================
// SUBMISSIONS (form inbox)
// =============================================
export interface SubmissionListFilters {
  type?: SubmissionType | 'all'
  status?: SubmissionStatus | 'all'
  search?: string
  limit?: number
  offset?: number
}

export async function listSubmissions(filters: SubmissionListFilters = {}): Promise<{ rows: Submission[]; count: number }> {
  const supabase = createServiceClient()
  let query = supabase
    .from('submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters.type && filters.type !== 'all') query = query.eq('type', filters.type)
  if (filters.status && filters.status !== 'all') query = query.eq('status', filters.status)
  if (filters.search) {
    const s = `%${filters.search}%`
    query = query.or(`contact_name.ilike.${s},contact_email.ilike.${s},contact_phone.ilike.${s}`)
  }
  if (typeof filters.limit === 'number') {
    const offset = filters.offset ?? 0
    query = query.range(offset, offset + filters.limit - 1)
  }

  const { data, count, error } = await query
  if (error) {
    console.error('Error listing submissions:', error)
    return { rows: [], count: 0 }
  }
  return { rows: (data || []) as Submission[], count: count ?? 0 }
}

export async function countSubmissionsByStatus(status: SubmissionStatus): Promise<number> {
  const supabase = createServiceClient()
  const { count, error } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', status)
  if (error) {
    console.error('Error counting submissions:', error)
    return 0
  }
  return count ?? 0
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('submissions').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching submission:', error)
    return null
  }
  return data as Submission
}

export async function createSubmission(input: Omit<Submission, 'id' | 'status' | 'notes' | 'created_at' | 'updated_at'> & {
  status?: SubmissionStatus
  notes?: string | null
}): Promise<Submission | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('submissions')
    .insert(input as never)
    .select()
    .single()
  if (error) {
    console.error('Error creating submission:', error)
    return null
  }
  return data as Submission
}

export async function updateSubmission(
  id: string,
  updates: Partial<Pick<Submission, 'status' | 'notes'>>
): Promise<Submission | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('submissions')
    .update(updates as never)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    console.error('Error updating submission:', error)
    return null
  }
  return data as Submission
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('submissions').delete().eq('id', id)
  if (error) {
    console.error('Error deleting submission:', error)
    return false
  }
  return true
}

// =============================================
// NEWSLETTER SUBSCRIBERS
// =============================================
export async function subscribeNewsletter(email: string, source?: string): Promise<NewsletterSubscriber | null> {
  const supabase = createServiceClient()
  const normalized = email.trim().toLowerCase()

  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('email', normalized)
    .maybeSingle()

  if (existing) {
    if ((existing as NewsletterSubscriber).status !== 'active') {
      const { data: reactivated, error } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'active', source: source ?? null } as never)
        .eq('email', normalized)
        .select()
        .single()
      if (error) {
        console.error('Error reactivating subscriber:', error)
        return null
      }
      return reactivated as NewsletterSubscriber
    }
    return existing as NewsletterSubscriber
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: normalized, source: source ?? null } as never)
    .select()
    .single()
  if (error) {
    console.error('Error subscribing newsletter:', error)
    return null
  }
  return data as NewsletterSubscriber
}

export async function unsubscribeNewsletterByToken(token: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ status: 'unsubscribed' } as never)
    .eq('unsubscribe_token', token)
  if (error) {
    console.error('Error unsubscribing newsletter:', error)
    return false
  }
  return true
}

export async function listNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error listing newsletter subscribers:', error)
    return []
  }
  return (data || []) as NewsletterSubscriber[]
}

// =============================================
// POSTS (blog)
// =============================================
export async function listPosts(opts: { publishedOnly?: boolean } = {}): Promise<Post[]> {
  const supabase = createServiceClient()
  let query = supabase.from('posts').select('*').order('published_at', { ascending: false, nullsFirst: false })
  if (opts.publishedOnly) query = query.eq('published', true)
  const { data, error } = await query
  if (error) {
    console.error('Error listing posts:', error)
    return []
  }
  return (data || []) as Post[]
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single()
  if (error) {
    console.error('Error fetching post:', error)
    return null
  }
  return data as Post
}

export async function upsertPost(post: Partial<Post> & { slug: string; title: string; body_mdx: string }): Promise<Post | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('posts')
    .upsert(post as never, { onConflict: 'slug' })
    .select()
    .single()
  if (error) {
    console.error('Error upserting post:', error)
    return null
  }
  return data as Post
}

export async function deletePost(slug: string): Promise<boolean> {
  const supabase = createServiceClient()
  const { error } = await supabase.from('posts').delete().eq('slug', slug)
  if (error) {
    console.error('Error deleting post:', error)
    return false
  }
  return true
}

// =============================================
// PASSWORD RESET TOKENS
// =============================================
export async function createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<PasswordResetToken | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .insert({ token, user_id: userId, expires_at: expiresAt.toISOString() } as never)
    .select()
    .single()
  if (error) {
    console.error('Error creating reset token:', error)
    return null
  }
  return data as PasswordResetToken
}

export async function consumePasswordResetToken(token: string): Promise<PasswordResetToken | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select('*')
    .eq('token', token)
    .single()
  if (error || !data) return null
  const row = data as PasswordResetToken
  if (row.used_at) return null
  if (new Date(row.expires_at).getTime() < Date.now()) return null
  await supabase
    .from('password_reset_tokens')
    .update({ used_at: new Date().toISOString() } as never)
    .eq('token', token)
  return row
}
