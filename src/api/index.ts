import { PostgrestError, createClient } from '@supabase/supabase-js'
import { Database } from 'types/supabase'

export const client = createClient<Database>(
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

const getPicUrl = async () => {
  const { data, error } = (await client.from('DogsInfo').select('image')) as {
    data: Database['public']['Tables']['DogsInfo']['Row']['image'][]
    error: PostgrestError | null
  }

  if (error) throw error
  return data
}

const uploadFile = async (picName: string, avatarFile: File) => {
  const { data, error } = await client.storage
    .from('avatars')
    .upload(`/${picName}`, avatarFile, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) throw error
  return data
}

const getFiles = async (pic: string) => {
  const { data } = client.storage.from('avatars').getPublicUrl(pic)

  return data
}

// TODO: Add register, login and logout functions

export const supabase = {
  uploadDog,
  getDogs,
  uploadFile,
  getFiles,
  getPicUrl,
}
