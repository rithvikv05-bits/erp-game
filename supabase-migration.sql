-- Create the scores table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  time BIGINT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on time for faster sorting
CREATE INDEX IF NOT EXISTS idx_scores_time ON scores(time);

-- Create an index on name for faster user-specific queries
CREATE INDEX IF NOT EXISTS idx_scores_name ON scores(name);

-- Enable Row Level Security (RLS)
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read scores
CREATE POLICY "Allow public read access" ON scores
  FOR SELECT
  USING (true);

-- Create a policy to allow anyone to insert scores
CREATE POLICY "Allow public insert access" ON scores
  FOR INSERT
  WITH CHECK (true);
