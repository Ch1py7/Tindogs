import { PostgrestError } from '@supabase/supabase-js'
import { Supabase, signUserProps } from 'types/supabase'
import { client } from 'config/supabase'

export module SupabaseService {
  export const uploadDog = async (dogDescription: Supabase.InsertDogs) => {
    const { error } = await client.from('dogs').insert(dogDescription)
  
    if (error) throw error
  }
  
  export const getDogs = async () => {
    const { data, error } = (await client.from('dogs').select('*')) as {
      data: Supabase.RowDogs[]
      error: PostgrestError | null
    }
  
    if (error) throw error
  
    return { data, error }
  }
  
  export const getPicUrl = async () => {
    const { data, error } = await client.from('dogs').select('image')

    if (error) throw error
    return data
  }
  
  export const uploadFile = async (picName: string, avatarFile: File) => {
    const { data, error } = await client.storage.from('avatars').upload(`/${picName}`, avatarFile, {
      cacheControl: '3600',
      upsert: true,
    })

    if (error) throw error
    return data
  }
  
  export const getFiles = async (pic: string) => {
    const { data } = client.storage.from('avatars').getPublicUrl(pic)

    return data
  }
  
  export const createUser = async (userInfo: Supabase.Users['Insert']) => {
    const { data, error } = await client.from('users').insert(userInfo)

    if (error) throw error

    return { data, error }
  }
  
  export const signUpUser = async ({ email, password }: signUserProps) => {
    const { data, error } = await client.auth.signUp({
      email: email,
      password: password,
    })

    // if (error) throw error

    return { data, error }
  }
  
  export const signInUser = async ({ email, password }: signUserProps) => {
    const { data, error } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    })

    // if (error) throw error
    return { data, error }
  }
  
  export const getSession = async () => {
    const { data, error } = await client.auth.getSession()

    if (error) throw error
    return data
  }
  
  export const logOut = async () => {
    const { error } = await client.auth.signOut()

    if (error) throw error
  }

}
