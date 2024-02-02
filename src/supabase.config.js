import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://qgdfgcbsrpfyugknxorv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZGZnY2JzcnBmeXVna254b3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3Njg0NjMsImV4cCI6MjAyMjM0NDQ2M30.8MVWxYF-RjlMS1DDz_cjYNyOqTsOKZFzh9_xhZdzx-Y')

export default supabase;