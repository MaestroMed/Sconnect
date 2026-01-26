-- =============================================
-- STORAGE BUCKET POLICIES
-- Run this AFTER creating the bucket 'sconnectfrance' manually
-- =============================================

-- Allow public read access to all files in the bucket
CREATE POLICY "Public read access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'sconnectfrance');

-- Allow authenticated uploads (service role)
CREATE POLICY "Allow uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'sconnectfrance');

-- Allow updates (service role)
CREATE POLICY "Allow updates" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'sconnectfrance');

-- Allow deletes (service role)
CREATE POLICY "Allow deletes" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'sconnectfrance');

SELECT 'Storage policies created for bucket sconnectfrance!' as status;





