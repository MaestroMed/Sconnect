-- =============================================
-- FIX STORAGE POLICIES FOR sconnectfrance BUCKET
-- =============================================

-- First, drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow deletes" ON storage.objects;

-- Create policies with unique names for this bucket
-- Allow anyone to read files (public bucket)
CREATE POLICY "sconnectfrance_public_read" 
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'sconnectfrance');

-- Allow service role to upload files
CREATE POLICY "sconnectfrance_service_insert" 
ON storage.objects FOR INSERT 
TO service_role
WITH CHECK (bucket_id = 'sconnectfrance');

-- Allow service role to update files  
CREATE POLICY "sconnectfrance_service_update" 
ON storage.objects FOR UPDATE 
TO service_role
USING (bucket_id = 'sconnectfrance');

-- Allow service role to delete files
CREATE POLICY "sconnectfrance_service_delete" 
ON storage.objects FOR DELETE 
TO service_role
USING (bucket_id = 'sconnectfrance');

-- Also allow authenticated users (for future use)
CREATE POLICY "sconnectfrance_auth_insert" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'sconnectfrance');

SELECT 'Storage policies updated for sconnectfrance bucket!' as status;

