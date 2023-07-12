import { PostgrestError, createClient } from '@supabase/supabase-js'
import { Database } from 'types/supabase'

const client = createClient<Database>(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
)

const uploadDog = async (dogDescription: Database['public']['Tables']['DogsInfo']['Insert']) => {
  const { data, error } = await client.from('DogsInfo').insert(dogDescription)

  if (error) throw error

  return { data, error }
}

const getDogs = async () => {
  const { data, error } = (await client.from('DogsInfo').select('*')) as {
    data: Database['public']['Tables']['DogsInfo']['Row'][]
    error: PostgrestError | null
  }

  if (error) throw error

  return { data, error }
}

// TODO: Add register, login and logout functions

export const supabase = {
  uploadDog,
  getDogs,
}
