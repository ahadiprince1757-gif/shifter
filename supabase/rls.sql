-- Enable Row Level Security (RLS) on both tables
ALTER TABLE curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Allow public read access to curriculum" ON curriculum;
DROP POLICY IF EXISTS "Allow public read access to content" ON content;

-- Create policy to allow anyone (anonymous and authenticated users) to SELECT from curriculum
CREATE POLICY "Allow public read access to curriculum" 
ON curriculum 
FOR SELECT 
TO public 
USING (true);

-- Create policy to allow anyone (anonymous and authenticated users) to SELECT from content
CREATE POLICY "Allow public read access to content" 
ON content 
FOR SELECT 
TO public 
USING (true);
