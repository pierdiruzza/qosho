import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://daqyjsqadjfagoursksp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhcXlqc3FhZGpmYWdvdXJza3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNTg5OTQsImV4cCI6MjA0NzkzNDk5NH0.l3BlqwRXx2mlPy_IW3sywuPTEJ-BC3ilQIKzQ1Ylibw";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});