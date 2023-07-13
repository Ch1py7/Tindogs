import { PostgrestError, createClient } from '@supabase/supabase-js'
import { Supabase, signUserProps } from 'types/supabase'

export const client = createClient<Supabase.Database>(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
)

const uploadDog = async (dogDescription: Supabase.Insert) => {
  const { data, error } = await client.from('DogsInfo').insert<Supabase.Insert>(dogDescription)

  if (error) throw error

  return { data, error }
}

const getDogs = async () => {
  const { data, error } = (await client.from('DogsInfo').select('*')) as {
    data: Supabase.Row[]
    error: PostgrestError | null
  }

  if (error) throw error

  return { data, error }
}

const getPicUrl = async () => {
  const { data, error } = await client.from('DogsInfo').select('image')

  if (error) throw error
  return data
}

const uploadFile = async (picName: string, avatarFile: File) => {
  const { data, error } = await client.storage.from('avatars').upload(`/${picName}`, avatarFile, {
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

const signUpUser = async ({ email, password }: signUserProps) => {
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  })

  if (error) throw error
  return data.user?.id
}

const singInUser = async ({ email, password }: signUserProps) => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) throw error
  return data.user?.id
}

const getSession = async () => {
  const { data, error } = await client.auth.getSession()

  if (error) throw error
  return data
}

const logOut = async () => {
  const { error } = await client.auth.signOut()

  if (error) throw error
}

export const supabase = {
  uploadDog,
  getDogs,
  uploadFile,
  getFiles,
  getPicUrl,
  signUpUser,
  singInUser,
  getSession,
  logOut,
}
