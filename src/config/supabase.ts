import { createClient } from '@supabase/supabase-js'
import { Supabase } from 'types/supabase'

export const client = createClient<Supabase.Database>(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
)
