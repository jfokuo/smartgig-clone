
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ldugkzryxvqsvtxxrywo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdWdrenJ5eHZxc3Z0eHhyeXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzAyNjQsImV4cCI6MjA1ODc0NjI2NH0.AaQFTpV9TPF88kXQWeq6ht28Z48EEcT2ZlcLslOpVG4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});
